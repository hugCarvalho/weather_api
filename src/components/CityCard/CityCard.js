import React from "react";
import "./CityCard.scss";

export default function CityCard({ city }) {
  return (
    <>
      {/* {console.log("CITYCARD", city)} */}
      <div className="container__city-forecast">
        {city ? (
          <h1>{city}</h1>
        ) : (
          <h4>Choose a default city or type in a city to get started </h4>
        )}
        <ul>
          <li className="current">Current</li>
          <li className="tomorrow">Tomorrow</li>
          <li className="after-current">Fut Date </li>
        </ul>
      </div>
    </>
  );
}
