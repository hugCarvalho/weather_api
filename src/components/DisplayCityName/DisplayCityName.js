import React from "react";
import "./DisplayCityName.scss";

export default function DisplayCityName({ validCity }) {
  return (
    <>
      <header className="container__city-name">
        <h2>{validCity || "Search for a city to begin"} </h2>
      </header>
    </>
  );
}
