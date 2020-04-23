import React, { useState, useEffect } from "react";
import "./App.scss";
import { keyAPI } from "./key";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import Header from "./components/Header/Header";
// import InputSearchCity from "./components/InputSearchCity/InputSearchCity";
import CityCard from "./components/CityCard/CityCard";
import SavedCitiesMenu from "./components/SavedCitiesMenu/SavedCitiesMenu";
import HourlyWeather from "./components/HourlyWeather/HourlyWeather";

function App() {
  //console.log("APP");
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
  //JOIN THEM?!
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
        //do notihng
      }
    } catch (err) {
      showErrorMsg("Error!File may be corrupted");
    }
    //console.log("EFFECT1:", localStorage);
  }, []);

  useEffect(() => {
    console.group(
      "text:",
      text,
      "city :",
      city,
      "savedC:",
      savedCities,
      "DATA:",
      data
    );
    // console.log("CITY1", savedCities.city1);
    console.groupEnd();
    localStorage.setItem("weatherApp", JSON.stringify(savedCities));
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

    console.log("DATAFROMFETCHING :", data, data.cod);
    if (data.cod != "200") {
      return showErrorMsg(data.message);
    } else {
      setData({
        data: data,
        city: data.city.name,
        // weatherDescription: data.weather[0].description,
        // weatherAltDescription: data.weather[0].main,
        // weatherIcon: data.weather[0].icon,
        tempMain: data.list[0].main.temp,
        // tempRealFeel: data.main.feels_like,
        // tempMin: data.main.temp_min,
        // tempMax: data.main.temp_max,
        // windSpeed: data.wind.speed,
        // windDirection: data.wind.deg,
      });
      setCity(text);
    }
  };

  //ENTER INPUT
  const submitUserInput = e => {
    //console.log("USER INPUT");
    e.preventDefault();

    getWeather(text).catch(err => {
      console.log("res:", err);
      showErrorMsg("Something went wrong...");
    });
  };

  //SAVE CITIES
  const saveCity = n => {
    console.log("n", n, savedCities[n]);
    // prettier-ignore
    if (!city)return showErrorMsg("SEARCH for a valid city first");
    if (n === "city1") return setSavedCities({ ...savedCities, city1: city });
    if (n === "city2") return setSavedCities({ ...savedCities, city2: city });
    if (n === "city3") return setSavedCities({ ...savedCities, city3: city });
    console.log("city :", city);
    console.log("text :", text);
  };

  return (
    <>
      {/* {console.log("RENDER", savedCities)} */}
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
          <br></br>
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
        <CityCard city={city} />
        <WeatherCard
          city={city}
          weatherIcon={data.weatherIcon}
          weatherDescription={data.weatherDescription}
          weatherAltDescription={data.weatherAltDescription}
          tempMain={data.tempMain}
          tempRealFeel={data.tempRealFeel}
          tempMin={data.tempMin}
          tempMax={data.tempMax}
          windDirection={data.windDirection}
          windSpeed={data.windSpeed}
        />
        {/* check text property, testing pruposes! */}
        <HourlyWeather data={data} city={city} />
      </div>
    </>
  );
}

export default App;
