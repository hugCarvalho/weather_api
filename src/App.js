import React, { useState, useEffect } from "react";
import "./App.scss";
import { keyAPI } from "./key";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import Header from "./components/Header/Header";
// import InputSearchCity from "./components/InputSearchCity/InputSearchCity";
import CityCard from "./components/CityCard/CityCard";
import SavedCitiesMenu from "./components/SavedCitiesMenu/SavedCitiesMenu";

//TODO catch error without breaking app

function App() {
  //console.log("APP");
  const key = keyAPI;
  // prettier-ignore
  const [savedCities, setSavedCities] = useState({
    city1: "Berlin",
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
    errorSavedCities: "First save a city, then choose default",
  });

  //Check local storage
  useEffect(() => {
    try {
      console.log(localStorage.weatherApp);
      if (localStorage.weatherApp) {
        console.log("YES");
        setSavedCities(JSON.parse(localStorage.getItem("weatherApp")));
      } else {
        console.log("NO");
        //do notihng
      }
    } catch (err) {
      console.log("ERROR FOUND");
    }
    console.log(localStorage);
  }, []);

  useEffect(() => {
    console.group("USEFFECT TEXT:");
    console.log("ARR CITIES", savedCities);
    console.log("ARR CITIES", savedCities.city1);
    console.groupEnd();
    localStorage.setItem("weatherApp", JSON.stringify(savedCities));
  }); //add at the end savedcity dependency

  const toggleErrorMsg = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 1500);
  };

  const getWeather = async () => {
    console.log("GETWEATHER");
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${key}`;

    const response = await fetch(api);
    const data = await response.json();
    if (data.cod !== "200") {
      console.log("msg:", data.message);
      setErrorMsg({ error: data.message });
      toggleErrorMsg();
    }
    console.log(data);
    setData({
      city: data.name,
      weatherDescription: data.weather[0].description,
      weatherAltDescription: data.weather[0].main,
      weatherIcon: data.weather[0].icon,
      tempMain: data.main.temp,
      tempRealFeel: data.main.feels_like,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
    });
    console.log(data);
  };

  // useEffect(() => {
  //fetching API from local storage settings comes here
  //   getWeather();
  // }, []);

  const submitUserInput = e => {
    console.log("USER INPUT");
    e.preventDefault();

    getWeather().catch(err => {
      console.log("res:", err);
    });

    //.catch(err => console.log(err));

    //code 404 City not found - //change to run after successfuly fetching data. Maybe city doesn't exist
    setCity(text);
  };

  //Save Cities
  const saveCity = n => {
    console.log(savedCities[n]);

    if (savedCities[n]) {
      //if there is a city saved already
      if (prompt("Replace") === null) {
        return;
      }
    }
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
        <SavedCitiesMenu savedCities={savedCities} saveCity={saveCity} />

        {/* END future input + search city component */}
        {/* Chosen city + forecast */}

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
      </div>
    </>
  );
}

export default App;
