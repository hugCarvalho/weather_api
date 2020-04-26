import React, { useState } from "react";
import "./CityCard.scss";

export default function CityCard({ city, data }) {
  const getWeatherForTomorrow = () => {
    const currentDay = Number(data.data.list[0].dt_txt.slice(8, 10));
    const tomorrow = currentDay + 1;
    const arrTomorrow = data.data.list.filter(item => {
      console.log("item", item.dt_txt.slice(8, 10));
      return +item.dt_txt.slice(8, 10) === tomorrow;
    });
    console.log(arrTomorrow, tomorrow, currentDay);
    return tomorrow;
  };

  return (
    <>
      {/* {console.log("CITYCARD", city)} */}
      <div className="container__city-forecast">
        {city ? (
          <h1>{city}</h1>
        ) : (
          <h4>Search for a city or set a default city to get started</h4>
        )}
        <ul>
          <li className="current">
            <button>Current</button>
          </li>
          <li onClick={() => getWeatherForTomorrow()} className="tomorrow">
            Tomorrow
          </li>
          <li className="after-current">After Tomorrow</li>
        </ul>
      </div>
    </>
  );
}
