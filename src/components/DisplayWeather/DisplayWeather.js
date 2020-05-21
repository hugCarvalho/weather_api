import React, { useState, useContext, useEffect } from "react";
import "./DisplayWeather.scss";
import { IsLoadingContext, IsNightContext } from "../../App";
import { RadioInput2 } from "../Utils/RadioInput/RadioInput";

export default function DisplayWeather({ finalData }) {
  const { isLoading } = useContext(IsLoadingContext);
  const { isNight, setIsNight } = useContext(IsNightContext);

  const [isCelsius, setIsCelsius] = useState(true);
  const [isKm, setIsKm] = useState(true);

  useEffect(() => {
    const toggleBackgroundDayNight = () => {
      const iconName = finalData.weather.list[0].weather[0].icon;
      iconName.endsWith("n") ? setIsNight(true) : setIsNight(false);
    };

    if (!isLoading) {
      toggleBackgroundDayNight();
    }
  }, [isLoading, finalData]);

  useEffect(() => {
    console.log("DATA TO DISPLAY:", finalData);
  }, [finalData]);

  const convertTemp = value =>
    isCelsius
      ? `${(value - 273.15).toFixed(1)}`
      : `${((value * 9) / 5 - 459.67).toFixed(0)}`;

  //converts from metres per second (m/s) to km/h or uses m/s value
  const convertWindSpeed = value =>
    isKm ? Math.round(value * 3.6) : Math.round(value * 2.237);

  const convertWindDirection = value => {
    //adapted from https://www.campbellsci.de/blog/convert-wind-directions
    //using this graph in http://snowfence.umn.edu/Components/winddirectionanddegrees.htm as a reference
    // prettier-ignore
    const cardinalPoints = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"]
    return cardinalPoints[Math.round(value / 22.5)];
  };

  const rotate = deg => {
    document.querySelector(
      ".fa-long-arrow-alt-down"
    ).style.transform = `rotate(${deg}deg)`;
  };

  return (
    <>
      {/* WEATHER ICON AND DESCRIPTION */}
      <div
        className="container__weather-card"
        style={isNight ? { background: "#202020" } : { background: "#7cafeb" }}
      >
        <div className="item item--1">
          {isLoading ? (
            <span className="not-available">n/a</span>
          ) : (
            <img
              src={`/media/weather_icons/${finalData.weather.list[0].weather[0].icon}.png`}
              alt="weather icon"
              id="weather-icon"
            />
          )}
        </div>

        {/* Temperature */}
        <div className="item item--2">
          <h4>Temperature</h4>
          <div className="wrapper__temp-units">
            <button>
              <RadioInput2
                id={"celsius"}
                label={" °C"}
                checked={isCelsius}
                action={() => setIsCelsius(true)}
              />
            </button>
            <button>
              <RadioInput2
                id={"fahrenheit"}
                label={" °F"}
                checked={!isCelsius}
                action={() => setIsCelsius(false)}
              />
            </button>
          </div>
        </div>

        {/* Actual temperature  */}
        <div className="item item--3">
          <h5>Actual</h5>
          <span>
            {isLoading
              ? "n/a"
              : convertTemp(finalData.weather.list[0].main.temp)}
          </span>
        </div>

        {/* Feels Like */}
        <div className="item item--4">
          <h5> Real Feel:</h5>
          {isLoading
            ? "n/a"
            : convertTemp(finalData.weather.list[0].main.feels_like)}{" "}
        </div>

        {/* Weather description */}
        <div id="weather-description" className="item item--7">
          {isLoading ? "n/a" : finalData.weather.list[0].weather[0].description}
        </div>

        {/* WIND UNIT SELECTION */}
        <div className="item item--8">
          <h4>Wind</h4>
          <div className="wrapper__wind-units">
            <button>
              <RadioInput2
                id={"kms"}
                label={" km/h"}
                checked={isKm}
                action={() => setIsKm(true)}
              />
            </button>
            <button>
              <RadioInput2
                id={"mps"}
                label={" mph"}
                checked={!isKm}
                action={() => setIsKm(false)}
              />
            </button>
          </div>
        </div>

        {/* WINDSPEED */}
        <div className="item item--9">
          <span>
            {isLoading
              ? "n/a"
              : convertWindSpeed(finalData.weather.list[0].wind.speed)}
          </span>

          <span>
            {isLoading
              ? "n/a"
              : convertWindDirection(finalData.weather.list[0].wind.deg)}
          </span>

          {
            <span
              style={isLoading ? { display: "none" } : { display: "block" }}
            >
              {<i className="fas fa-long-arrow-alt-down"></i>}
            </span>
          }
          {isLoading ? "n/a" : rotate(finalData.weather.list[0].wind.deg)}
        </div>

        {/* <p>{isLoading ? "loading..." : null}</p> */}
      </div>
    </>
  );
}
