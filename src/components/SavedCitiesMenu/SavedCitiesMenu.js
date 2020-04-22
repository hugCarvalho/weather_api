import React, { useEffect, useState } from "react";
import "./SavedCitiesMenu.scss";

export default function SavedCitiesMenu({ savedCities, saveCity }) {
  //console.log("savedCities", savedCities);
  //console.log("saveCity", saveCity);
  const [defaultCity, setDefaultCity] = useState("");

  useEffect(() => {
    console.log(defaultCity);
  }, [defaultCity]);
  //console.log("SAVEDCITITESMENU");
  return (
    <>
      {/* {console.log("RENDER")}{" "} */}
      <div className="options-title">
        <h3>Choose your active city:</h3>
      </div>
      <div className="container__saved-cities">
        {/* // prettier-ignore */}
        <div className="menu-left">
          <p>Options</p>
          <p>default</p>
          <p>Name</p>
        </div>
        {/* City-1 */}
        <div className="cities city-1">
          <p>City1</p>
          <p>
            <input
              type="radio"
              id="city-1"
              name="cities"
              value={savedCities.city1}
              onClick={e => setDefaultCity(e.target.value)}
              //checked={savedCities.city1 === defaultCity}
            />
            <label htmlFor="city-1"></label>
          </p>
          <p>{savedCities.city1 || "empty"}</p>
          <button type="button" onClick={() => saveCity("city1")}>
            Save
          </button>
        </div>
        {/* CITY-2 */}
        <div className="cities city-2">
          <p>City2</p>
          <p>
            <input
              type="radio"
              id="city-2"
              name="cities"
              value={savedCities.city2}
              onClick={e => setDefaultCity(e.target.value)}
            />
            <label htmlFor="city-2"></label>
          </p>
          <p>{savedCities.city2 || "empty"}</p>
          <p>
            <button type="button" onClick={() => saveCity("city2")}>
              Save
            </button>
          </p>
        </div>
        {/* CITY-3 */}
        <div className="cities city-3">
          <p>City3</p>
          <p>
            <input
              type="radio"
              id="city-3"
              name="cities"
              value={savedCities.city3}
              onClick={e => setDefaultCity(e.target.value)}
            />
            <label htmlFor="city-3"></label>
          </p>
          <p>{savedCities.city3 || "empty"}</p>
          <button type="button" onClick={() => saveCity("city3")}>
            Save
          </button>
        </div>
        <div id="what-is">
          <p>?</p>
          <p>?</p>
          <p>?</p>
          <p>?</p>
        </div>

        {/* // prettier-ignore */}
      </div>
    </>
  );
}
