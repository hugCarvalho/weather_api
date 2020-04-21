import React, { useState, useEffect } from "react";
import "./App.scss";
import { keyAPI } from "./key";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import Header from "./components/Header/Header";
// import InputSearchCity from "./components/InputSearchCity/InputSearchCity";
import CityCard from "./components/CityCard/CityCard";
import SavedCitiesMenu from "./components/SavedCitiesMenu/SavedCitiesMenu";

function App() {
  //console.log("APP");
  //let city = "London";
  const key = keyAPI;
  // prettier-ignore
  const [savedCities, setSavedCities] = useState({city4: "Copenhagen", city2: "", city3: "Vila Franca de Xira"});
  const [city, setCity] = useState("");
  const [data, setData] = useState({});
  const [text, setText] = useState("");
  const [activeCity, setDefault] = useState("");

  const weatherStorage = {
    activeCity: activeCity,
    savedCities: savedCities,
  };
  //Check local storage
  useEffect(() => {
    if (localStorage.weatherStorage) {
      console.log("YES");
    } else {
      console.log("NO");
    }
    console.log(localStorage);
  }, []);

  const getWeather = async () => {
    console.log("GETWEATHER");
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${key}`;
    const response = await fetch(api);
    const data = await response.json();
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
  };

  // useEffect(() => {
  //fetching API from local storage settings comes here
  //   getWeather();
  // }, []);

  const submitUserInput = e => {
    console.log("USER INPUT");
    e.preventDefault();
    getWeather();
    //code 404 City not found - //change to run after successfuly fetching data. Maybe city doesn't exist
    setCity(text);
  };

  //Save Cities
  const saveCity = n => {
    if (savedCities[n]) {
      prompt("Are you sure you want to replace the current city?");
      console.log("YEP");
    }
    console.log("city :", city);
    console.log("text :", text);

    if (n === "city1") return setSavedCities({ ...savedCities, city1: city });
    if (n === "city2") return setSavedCities({ ...savedCities, city2: city });
    if (n === "city3") return setSavedCities({ ...savedCities, city3: city });
  };
  useEffect(() => {
    console.group("USEFFECT TEXT:");
    console.log("ARR CITIES", savedCities);
    console.log("ARR CITIES", savedCities.city1);

    console.groupEnd();
  });

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
