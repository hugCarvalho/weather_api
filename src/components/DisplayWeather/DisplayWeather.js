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
      ? `${(value - 273.15).toFixed(1)}`
      : `${((value * 9) / 5 - 459.67).toFixed(2)}`;
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

      {/* WEATHER ICON AND DESCRIPTION */}
      <div className="container__weather-card">
        <div className="item item--1">
          {!city ? (
            <img src="/media/weather_icons/n_a.png" alt="Not available" />
          ) : (
            <img
              src={`/media/weather_icons/${
                isLoading ? "N/A" : filData2.weather.list[0].weather[0].icon
              }.png`}
              alt="weather icon"
            />
          )}
        </div>

        {/* Temperature */}
        <div className="item item--2">
          <h5>Temp</h5>
          <div className="wrapper__temp-units">
            <button>
              <RadioInput2
                id={"celsius"}
                label={"°C"}
                checked={isCelsius}
                action={() => setIsCelsius(true)}
              />
            </button>
            <button>
              <RadioInput2
                id={"fahrenheit"}
                label={"°F"}
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
              ? "N/A"
              : convertTemp(filData2.weather.list[0].main.temp)}
          </span>
        </div>

        {/* Feels Like */}
        <div className="item item--4">
          <h5> Real Feel:</h5>
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

        {/* WIND UNIT SELECTION */}
        <div className="item item--8">
          <h5>Wind</h5>
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
                id={"mph"}
                label={" mph"}
                checked={!isKm}
                action={() => setIsKm(false)}
              />
            </button>
          </div>
        </div>
        <div className="item item--9">
          9{" "}
          {isLoading ? "N/A" : convertWind(filData2.weather.list[0].wind.speed)}
        </div>

        {/* WIND DIRECTION */}
        <div className="item item--10">
          <span>
            {isLoading
              ? "N/A"
              : convertWindDirection(filData2.weather.list[0].wind.deg)}
          </span>{" "}
          {<i className="fas fa-long-arrow-alt-down"></i>}
          <br />
          {isLoading ? null : rotate(filData2.weather.list[0].wind.deg)}
        </div>
        {/* <div className="wd">?</div> */}
      </div>
    </>
  );
}

const rotate = deg => {
  //const degrees = `${deg}deg`;
  document.querySelector(".fas").style.transform = `rotate(${deg}deg)`;
  //maybe it starts hidden...
};
