import React, { useState, useEffect } from "react";
import "./App.scss";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import { keyAPI } from "./key";
import CityCard from "./components/CityCard/CityCard";

function App() {
  console.log("APP");
  let city = "London";
  const key = keyAPI;
  const kelvin = 273;

  //const [city, setCity] = useState("")
  const [data, setData] = useState({});
  const [text, setText] = useState("");
  // const []

  const getWeather = async () => {
    console.log("GETWEATHER");
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    const response = await fetch(api);
    const data = await response.json();
    console.log(data);
    setData({
      city: data.name,
      weatherIcon: data.weather[0].icon,
      weatherDescription: data.weather[0].description,
      tempMain: data.main.temp,
      tempRealFeel: data.main.feels_like,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
    });
  };

  // useEffect(() => {
  //   //getWeather();

  // }, []);
  // const getText = e => {
  //   setText(e.target.value);
  // };
  useEffect(() => {
    console.log("USEFFECT TEXT:", text);
  });

  return (
    <>
      {console.log("RENDER")}
      <div className="container-app">
        {/* future input + search city component */}
        <div>
          <form onSubmit={() => setText(text)}>
            <input
              onChange={e => setText(e.target.value)}
              type="text"
              placeholder="type a city"
            />
            <button type="submit">Get Weather</button>
          </form>
          <div className="wrapper">
            <div className="default">
              <h4>Default</h4>
              <span> {text} Berlin </span>
            </div>
            <div className="alt1">
              <h4>Alternative 1:</h4> <span> Puerto Rico de los mares </span>
            </div>
            <div className="alt2">
              <h4>Alternative 2:</h4> <span> -Lisbon </span>
            </div>
          </div>
        </div>
        {/* END future input + search city component */}
        {/* Chosen city + forecast */}

        {/* END of chosen city + forecast */}
        <CityCard city={text} />
        <WeatherCard
          weatherIcon={data.weatherIcon}
          weatherDescription={data.weatherDescription}
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
