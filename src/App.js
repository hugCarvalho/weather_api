import React, { useState, useEffect } from "react";
import "./App.scss";
import { keyAPI } from "./key";
import Header from "./components/Header/Header";
import InputSearchCity from "./components/InputSearchCity/InputSearchCity";
import DisplayErrorMsg from "./components/DisplayErrorMsg/DisplayErrorMsg";
import Days from "./components/Days/Days";
//import SavedCitiesMenu from "./components/SavedCitiesMenu/SavedCitiesMenu";

export const IsLoadingContext = React.createContext();
export const CityContext = React.createContext();

function App() {
  const key = keyAPI;
  // prettier-ignore
  // const [savedCities, setSavedCities] = useState({
  //   city1: "",
  //   city2: "",
  //   city3: ""
  // });

  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  //const [renderedWeatherData, setRenderedWeatherData] = useState({});
  //const [automaticRender, setAutomaticRender] = useState(false);

  //Join them?!
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    error: "",
    errorSavedCities: "",
    errorLocalStorage: "",
  });

  //FETCH DATA
  useEffect(() => {
    const getWeather = async text => {
      //console.log("GETWEATHER");
      // let api = `http://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${key}`;
      let api = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`; //CHANGE TO TEXT!!!!
      const response = await fetch(api);
      const data = await response.json();

      // console.log("DATAFROMFETCHING :", isLoading);
      if (data.cod === "200") {
        console.log("FETCHEDDATA:", data);
        setData({
          weather: data,
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      } else {
        return showErrorMsg(data.message);
      }
    };
    getWeather().catch(() => {
      showErrorMsg("Something went wrong...");
    });
  }, [isLoading, city, key]);

  useEffect(() => {
    // console.log("Effect 2 -> IS Loading:", isLoading, city);
    console.log("----------------------------");
  }, [isLoading, city]);

  //Check local storage
  // useEffect(() => {
  //   try {
  //     if (localStorage.weatherApp) {
  //       setSavedCities(JSON.parse(localStorage.getItem("weatherApp")));
  //     }
  //   } catch (err) {
  //     showErrorMsg("Error!File may be corrupted");
  //   }
  //   //console.log("EFFECT1:", localStorage);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("weatherApp", JSON.stringify(savedCities));
  //   console.log("SAVE THE CITY IN LS:", savedCities);
  // }, [savedCities]); //add at the end savedcity dependency

  //SHOW ERROR MESSAGE
  const showErrorMsg = error => {
    setErrorMsg({ error });
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 1500);
  };

  //SAVE CITIES
  // const saveCity = n => {
  //   // prettier-ignore
  //   if (!city)return showErrorMsg("SEARCH for a valid city first");
  //   if (n === "city1") return setSavedCities({ ...savedCities, city1: city });
  //   if (n === "city2") return setSavedCities({ ...savedCities, city2: city });
  //   if (n === "city3") return setSavedCities({ ...savedCities, city3: city });
  // };

  return (
    <>
      <Header />
      <div className="container-app">
        {/* INPUT*/}
        {/* SAVED CITIES */}
        {/* <SavedCitiesMenu
          savedCities={savedCities}
          saveCity={saveCity}
          fetchCity={fetchCity}
          //getWeather={getWeather}
        /> */}
        {/* END of chosen city + forecast */}
        <CityContext.Provider value={{ city, setCity }}>
          <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
            <InputSearchCity />
            <Days data={data} isLoading={isLoading} />
          </IsLoadingContext.Provider>
        </CityContext.Provider>
        <DisplayErrorMsg showError={showError} errorMsg={errorMsg} />
      </div>
    </>
  );
}
export default App;
