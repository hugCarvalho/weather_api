import React, { useState, useEffect } from "react";
import "./App.scss";
import { keyAPI } from "./key";
//import WeatherCard from "./components/WeatherCard/WeatherCard";
import Header from "./components/Header/Header";
// import InputSearchCity from "./components/InputSearchCity/InputSearchCity";
import CityCard from "./components/CityCard/CityCard";
import SavedCitiesMenu from "./components/SavedCitiesMenu/SavedCitiesMenu";
// import HourlyWeather from "./components/HourlyWeather/HourlyWeather";
//import WeatherCard from "./components/WeatherCard/WeatherCard";

export const WeatherDataContext = React.createContext();

function App() {
  const key = keyAPI;
  // prettier-ignore
  const [savedCities, setSavedCities] = useState({
    city1: "",
    city2: "",
    city3: ""
  });

  const [city, setCity] = useState("");
  const [text, setText] = useState("");
  const [data, setData] = useState({});
  //const [renderedWeatherData, setRenderedWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [automaticRender, setAutomaticRender] = useState(false);

  //Join them?!
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    error: "",
    errorSavedCities: "",
    errorLocalStorage: "",
  });

  //Check local storage
  useEffect(() => {
    try {
      if (localStorage.weatherApp) {
        setSavedCities(JSON.parse(localStorage.getItem("weatherApp")));
      } else {
        //console.log("NO");
        //do notihng?
      }
    } catch (err) {
      showErrorMsg("Error!File may be corrupted");
    }
    //console.log("EFFECT1:", localStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem("weatherApp", JSON.stringify(savedCities));
    // console.log("IS LOADING:", isLoading, data);
  }); //add at the end savedcity dependency

  //SHOW ERROR MESSAGE
  const showErrorMsg = error => {
    setErrorMsg({ error });
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 1500);
  };

  //FETCH DATA
  const getWeather = async text => {
    //console.log("GETWEATHER");
    // let api = `http://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${key}`;
    let api = `http://api.openweathermap.org/data/2.5/forecast?q=${text}&appid=${key}`;
    const response = await fetch(api);
    const data = await response.json();

    // console.log("DATAFROMFETCHING :", isLoading);
    if (data.cod !== "200") {
      return showErrorMsg(data.message);
    } else {
      console.log("FETCHEDDATA:", data);
      setData({
        weather: data,
      });
      setCity(text);
    }
    setIsLoading(false);
    setAutomaticRender(false);
  };

  //ENTER INPUT
  const submitUserInput = e => {
    //console.log("USER INPUT");
    e.preventDefault();
    setIsLoading(true);
    setAutomaticRender(true);
    getWeather(text).catch(err => {
      //console.log("res:", err);
      showErrorMsg("Something went wrong...");
    });
  };

  //SAVE CITIES
  const saveCity = n => {
    // prettier-ignore
    if (!city)return showErrorMsg("SEARCH for a valid city first");
    if (n === "city1") return setSavedCities({ ...savedCities, city1: city });
    if (n === "city2") return setSavedCities({ ...savedCities, city2: city });
    if (n === "city3") return setSavedCities({ ...savedCities, city3: city });
  };

  return (
    <>
      <Header />
      <div className="container-app">
        {/* INPUT*/}
        <div className="container__input-search-city">
          <form onSubmit={e => submitUserInput(e)}>
            <input
              onChange={e => setText(e.target.value)}
              type="text"
              placeholder="type a city"
            />
            <button type="submit">Go</button>
          </form>
          <br />
          <p
            className="error-message"
            style={showError ? { display: "block" } : { display: "none" }}
          >
            {errorMsg.error}
          </p>
        </div>
        {/* SAVED CITIES */}
        <SavedCitiesMenu
          savedCities={savedCities}
          saveCity={saveCity}
          getWeather={getWeather}
        />

        {/* END of chosen city + forecast */}
        {/* <WeatherDataContext.Provider value={{ data, setData }}> */}
        <CityCard
          data={data}
          city={city}
          isLoading={isLoading}
          automaticRender={automaticRender}
        />
        {/* <HourlyWeather data={data} city={city} /> */}
        {/* </WeatherDataContext.Provider> */}
      </div>
    </>
  );
}
export default App;
