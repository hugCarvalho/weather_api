import React, { useContext, useEffect } from "react";
import "./DisplayWeather.scss";
import { IsLoadingContext, CityContext } from "../../App";

//TODO: check condition onload with no cities saved for weather card rendering
export default function DisplayWeather({ filData2 }) {
  const { isLoading } = useContext(IsLoadingContext);
  const city = useContext(CityContext);
  useEffect(() => {
    console.log("DISPLAY WEATHER FILTER DATA:", filData2, isLoading);
    !isLoading && console.log("RES:", filData2.weather.list[0].main.temp);
  }, [filData2, isLoading]);

  const convertTemp = value => {
    //console.log("convert", temp, temp - celsius);
    //if celcius
    return `${(value - 273.15).toFixed(1)} °C`;
    //if fahr
    //return `${((value * 9) / 5 - 459.67).toFixed(2)} °F`;
  };

  //converts from metres per second (m/s)  to km/h
  const convertWind = value => Math.round(value * 3.6) + " Km/h";

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
        <div className="item item--2">2 Temp°</div>
        <div className="item item--3">
          Actual{" "}
          <span>
            {isLoading
              ? "N/A"
              : convertTemp(filData2.weather.list[0].main.temp)}
          </span>
        </div>
        <div className="item item--4">
          4 Real Feel:
          {isLoading
            ? "N/A"
            : convertTemp(filData2.weather.list[0].main.tempRealFeel)}{" "}
        </div>
        <div className="item item--5">
          5 Min:
          {isLoading
            ? "N/A"
            : convertTemp(filData2.weather.list[0].main.tempMin)}
        </div>
        <div className="item item--6">
          6 Max:
          {isLoading
            ? "N/A"
            : convertTemp(filData2.weather.list[0].main.tempMax)}
        </div>
        <div className="item item--7">
          7{" "}
          {isLoading ? "N/A" : filData2.weather.list[0].main.weatherDescription}
        </div>
        <div className="item item--8">8 Wind </div>
        <div className="item item--9">
          9 Speed:{" "}
          {isLoading ? "N/A" : convertWind(filData2.weather.list[0].wind.speed)}
        </div>
        <div className="item item--10">
          10 <div className="wd">--></div> Direction:{" "}
          {isLoading
            ? "N/A"
            : convertWindDirection(filData2.weather.list[0].wind.deg)}
        </div>
      </div>
    </>
  );
}
