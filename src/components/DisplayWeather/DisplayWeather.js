import React, { useState, useContext, useEffect } from "react";
import "./DisplayWeather.scss";
import { IsNightContext } from "../../App";
import PropTypes from "prop-types";
import { WeatherDescription } from "./components/WeatherDescription";
import { WeatherIcon } from "./components/WeatherIcon";
import { Temperature } from "./components/Temperature";
import { Wind } from "./components/Wind";

export default function DisplayWeather({ selectedTime, validCity, isLoading }) {
  const { isNight, setIsNight } = useContext(IsNightContext);

  //Debugging
  // useEffect(() => {
  //   console.log("selectedTime:", selectedTime);
  // }, [selectedTime]);

  //Toggle background color
  useEffect(() => {
    if (selectedTime.length > 0) {
      const toggleBackgroundDayNight = () => {
        const iconName = selectedTime[0].weather[0].icon;
        iconName.endsWith("n") ? setIsNight(true) : setIsNight(false);
      };
      toggleBackgroundDayNight();
    }
  }, [isLoading, selectedTime, setIsNight, validCity]);

  return (
    <>
      {/* added validCity condition to avoid showing at the begining without any default city set */}
      <div
        className="container__weather-card"
        style={isNight ? { background: "#202020" } : { background: "#7cafeb" }}
      >
        <WeatherIcon selectedTime={selectedTime} />
        <WeatherDescription
          validCity={validCity}
          isLoading={isLoading}
          data={selectedTime}
        />
        <Temperature selectedTime={selectedTime} />
        <Wind selectedTime={selectedTime} />
      </div>
    </>
  );
}

DisplayWeather.propTypes = {
  validCity: PropTypes.string,
  isLoading: PropTypes.bool,
};
