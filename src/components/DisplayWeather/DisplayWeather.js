import React, { useState, useContext, useEffect } from "react";
import "./DisplayWeather.scss";
import { IsLoadingContext, CityContext } from "../../App";
import { RadioInput2 } from "../Utils/RadioInput/RadioInput";

//TODO: check condition onload with no cities saved for weather card rendering
export default function DisplayWeather({ filData2 }) {
  const { isLoading } = useContext(IsLoadingContext);
  const city = useContext(CityContext);
  const [isCelsius, setIsCelsius] = useState(true);
  const [isKm, setIsKm] = useState(true);

  useEffect(() => {
    //console.log("DISPLAY WEATHER FILTER DATA:", filData2, isLoading);
    //!isLoading && console.log("RES:", filData2.weather.list[0].main.temp);
  }, [filData2, isLoading]);

  const convertTemp = value =>
    isCelsius
      ? `${(value - 273.15).toFixed(1)} °C`
      : `${((value * 9) / 5 - 459.67).toFixed(2)} °F`;
  //converts from metres per second (m/s)  to km/h
  const convertWind = value =>
    isKm ? Math.round(value * 3.6) + "km/h" : Math.round(value * 2.237) + "mph";

  const convertWindDirection = value => {
    //adapted from https://www.campbellsci.de/blog/convert-wind-directions
    //using this graph in http://snowfence.umn.edu/Components/winddirectionanddegrees.htm as a reference
    // prettier-ignore
    const cardinalPoints = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"]
    return cardinalPoints[Math.round(value / 22.5)];
  };

  return (
    <>
      <p>{isLoading ? "loading..." : null}</p>

      <div className="container__weather-card">
        <div className="item item--1">
          <h3>Weather</h3>
          {city === "No location chosen yet..." ? (
            <img src="/media/weather_icons/n_a.png" alt="" />
          ) : (
            <img
              src={`/media/weather_icons/${
                isLoading ? "N/A" : filData2.weather.list[0].weather[0].icon
              }.png`}
              alt="Weather icon"
            />
          )}
        </div>
        {/* Temperature */}
        <div className="item item--2">
          <h5>Temp</h5>
          <div className="temp-type">
            {/* prettier-ignore */}
            <RadioInput2 id={"celsius"} label={"°C"} checked={isCelsius}
              action={() => setIsCelsius(true)}
            />
            {/* prettier-ignore */}
            <RadioInput2 id={"fahrenheit"} label={"°F"} checked={!isCelsius}
              action={() => setIsCelsius(false)}
            />
          </div>
        </div>

        {/* Actual temperature  */}
        <div className="item item--3">
          Actual{" "}
          <span>
            {isLoading
              ? "N/A"
              : convertTemp(filData2.weather.list[0].main.temp)}
          </span>
        </div>

        {/* Feels Like */}
        <div className="item item--4">
          4 Real Feel:
          {isLoading
            ? "N/A"
            : convertTemp(filData2.weather.list[0].main.feels_like)}{" "}
        </div>
        {/* <div className="item item--5">
          5 Min:
          {isLoading
            ? "N/A"
            : convertTemp(filData2.weather.list[0].main.tempMin)}
        </div> */}
        {/* <div className="item item--6">
          6 Max:
          {isLoading
            ? "N/A"
            : convertTemp(filData2.weather.list[0].main.tempMax)}
        </div> */}

        {/* Weather description */}
        <div className="item item--7">
          7{" "}
          {isLoading ? "N/A" : filData2.weather.list[0].weather[0].description}
        </div>

        {/* Wind  */}
        <div className="item item--8">
          8 Wind
          <div>
            <RadioInput2
              id={"kms"}
              label={"km/h"}
              checked={isKm}
              action={() => setIsKm(true)}
            />
            <RadioInput2
              id={"mph"}
              label={"mph"}
              checked={!isKm}
              action={() => setIsKm(false)}
            />
          </div>
        </div>
        <div className="item item--9">
          9{" "}
          {isLoading ? "N/A" : convertWind(filData2.weather.list[0].wind.speed)}
        </div>
        <div className="item item--10">
          {isLoading
            ? "N/A"
            : convertWindDirection(filData2.weather.list[0].wind.deg)}
        </div>
        <div className="wd">--></div>
      </div>
    </>
  );
}
