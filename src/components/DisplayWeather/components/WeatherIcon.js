import React from "react"


const WeatherIcon = ({selectedTime}) => {
 return <div className="item item--1">
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
}

export {WeatherIcon}