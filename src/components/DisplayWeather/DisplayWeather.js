import React, { useState, useContext, useEffect } from "react";
import "./DisplayWeather.scss";
import { IsNightContext } from "../../App";
import { RadioButtons2 } from "../Utils/RadioButtons/RadioButtons";
import PropTypes from "prop-types";
import { WeatherDescription } from "./components/WeatherDescription";

export default function DisplayWeather({ selectedTime, validCity, isLoading }) {
  const { isNight, setIsNight } = useContext(IsNightContext);

  const [isCelsius, setIsCelsius] = useState(true);
  const [isKm, setIsKm] = useState(true);

  //Debugging
  // useEffect(() => {
  //   console.log("selectedTime:", selectedTime);
  // }, [selectedTime]);

  //Toggle background color

  console.log("Display weather final data", selectedTime)
  useEffect(() => {
    if (selectedTime.length > 0 ) {
      // const toggleBackgroundDayNight = () => {
      //   const iconName = selectedTime[0].weather[0].icon;
      //   iconName.endsWith("n") ? setIsNight(true) : setIsNight(false);
      // };
      // toggleBackgroundDayNight();
    }
  }, [isLoading, selectedTime, setIsNight, validCity]);

  //Converts Kelvin to Celsius or Fahrenheit
  const convertTemp = (value) =>
    isCelsius
      ? `${(value - 273.15).toFixed(1)}`
      : `${((value * 9) / 5 - 459.67).toFixed(0)}`;

  //converts from metres per second (m/s) to km/h or to miles per hour
  const convertWindSpeed = (value) =>
    isKm ? Math.round(value * 3.6) : Math.round(value * 2.237);

  const convertWindDirection = (value) => {
    //adapted from https://www.campbellsci.de/blog/convert-wind-directions
    //using this graph in http://snowfence.umn.edu/Components/winddirectionanddegrees.htm as a reference
    // prettier-ignore
    const cardinalPoints = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"]
    return cardinalPoints[Math.round(value / 22.5)];
  };

  //Rotates wind arrow
  const rotate = (deg) => {
    document.querySelector(
      ".fa-long-arrow-alt-down"
    ).style.transform = `rotate(${deg}deg)`;
  };

  console.log("FD,", selectedTime.length > 0 ? selectedTime[0].weather[0].icon : "nope")
 
  return (
    <>
      {/* added validCity condition to avoid showing at the begining without any default city set */}
      {/* WEATHER ICON */}
      <div
        className="container__weather-card"
        style={isNight ? { background: "#202020" } : { background: "#7cafeb" }}
      >
        <div className="item item--1">
          {selectedTime.length > 0 ? (
            <img
               src={`/media/weather_icons/${selectedTime[0].weather[0].icon}.png`}
              alt="weather icon"
              id="weather-icon"
            />
          ) : (
            <span className="not-available">n/a</span>
          )}
        </div>

        {/* Weather description */}
        <WeatherDescription
          validCity={validCity}
          isLoading={isLoading}
          data={selectedTime}
        />

        {/* Temperature */}
        <div className="item item--2">
          <h4>Temperature</h4>
          <div className="wrapper__temp-units">
            <button>
              <RadioButtons2
                id={"celsius"}
                label={" °C"}
                checked={isCelsius}
                action={() => setIsCelsius(true)}
              />
            </button>
            <button>
              <RadioButtons2
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
            {selectedTime.length > 0 
              ? convertTemp(selectedTime[0].main.temp)
              : "n/a"}
          </span>
        </div>

        {/* Real feel */}
        <div className="item item--4">
          <h5> Real Feel:</h5>
          {selectedTime.length > 0 
            ? convertTemp(selectedTime[0].main.feels_like)
            : "n/a"}
        </div>

        {/* WIND UNIT SELECTION */}
        <div className="item item--8">
          <h4>Wind</h4>
          <div className="wrapper__wind-units">
            <button>
              <RadioButtons2
                id={"kms"}
                label={" km/h"}
                checked={isKm}
                action={() => setIsKm(true)}
              />
            </button>
            <button>
              <RadioButtons2
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
            {selectedTime.length > 0 
              ? convertWindSpeed(selectedTime[0].wind.speed)
              : null}
          </span>

          <span>
            {selectedTime.length > 0 
              ? convertWindDirection(selectedTime[0].wind.deg)
              : "n/a"}
          </span>

          {
            <span
              style={selectedTime.length > 0  ? { display: "block" } : { display: "none" }}
            >
              {<i className="fas fa-long-arrow-alt-down"></i>}
            </span>
          }
          {selectedTime.length > 0  ? rotate(selectedTime[0].wind.deg) : null}
        </div>
      </div>
    </>
  );
}

DisplayWeather.propTypes = {
  selectedTime: PropTypes.object,
  validCity: PropTypes.string,
  isLoading: PropTypes.bool,
};
