import React from "react";
import "./WeatherCard.scss";

export default function CityCard(props) {
  const {
    weatherIcon,
    windSpeed,
    weatherDescription,
    tempMain,
    tempRealFeel,
    tempMin,
    tempMax,
    windDirection,
  } = props;
  //console.log(props);
  return (
    <>
      <div className="container__weather-card">
        <div className="item item--1">1 {weatherIcon}</div>
        <div className="item item--2">2 Temp°</div>
        <div className="item item--3">
          Actual <span>{tempMain}20°</span>
        </div>
        <div className="item item--4">4 Real Feel:{tempRealFeel} </div>
        <div className="item item--5">5 Min:{tempMin}</div>
        <div className="item item--6">6 Max:{tempMax}</div>
        <div className="item item--7">7 {weatherDescription}</div>
        <div className="item item--8">8 Wind </div>
        <div className="item item--9">9 Speed: {windSpeed}</div>
        <div className="item item--10">10 Direction: {windDirection}</div>
      </div>
    </>
  );
}
