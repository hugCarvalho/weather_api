import React from "react";
import "./DisplayCityName.scss";

export default function DisplayCityName({ validCity }) {
  return (
    <>
      <header>
        <h2>{validCity || "Search for a city to start"} </h2>
      </header>
    </>
  );
}
