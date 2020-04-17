import React from "react";
import "./CityCard.scss";

export default function CityCard({ city }) {
  return (
    <>
      <div className="container__city-forecast">
        <h1>{city ? city : ""}(Berlin)</h1>
        <ul>
          <li className="current" contentEditable>
            Current
          </li>
          <li className="tomorrow">Tomorrow</li>
          <li className="after-current">Fut Date </li>
        </ul>
      </div>
    </>
  );
}
