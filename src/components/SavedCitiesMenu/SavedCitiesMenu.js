import React from "react";
import "./SavedCitiesMenu.scss";

export default function SavedCitiesMenu({ savedCities, saveCity }) {
  //console.log("savedCities", savedCities);
  //console.log("saveCity", saveCity);
  return (
    <>
      {" "}
      <div className="container__saved-cities">
        <div className="options-title">
          <h3>Choose your active city:</h3>
        </div>
        {/* // prettier-ignore */}
        <div className="wrapper">
          {/* CITY 1 */}
          <div className="city1">
            <label htmlFor="city1">
              <h2>{savedCities.city1 || "empty"}</h2>
              {/* // prettier-ignore */}
              <input type="radio" id="city1" name="cities" />
            </label>
          </div>

          {/* CITY2 */}
          <div className="city2">
            <label htmlFor="city2">
              <h2>{savedCities.city2 || "empty"}</h2>
              {/* // prettier-ignore */}
              <input type="radio" id="city2" name="cities" />
            </label>
          </div>

          {/* CITY 3 */}
          <div className="city3">
            <label htmlFor="city3" onClick={() => console.log("clicked!")}>
              <h2>{savedCities.city3 || "empty"}</h2>
              {/* // prettier-ignore */}
              <input type="radio" id="city3" name="cities" />
            </label>
          </div>
        </div>

        {/* SAVE BUTTONS */}
        <div className="buttons">
          <div className="city-1">
            <button type="button" onClick={() => saveCity("city1")}>
              Save city
            </button>
          </div>
          <div className="city-2">
            <button type="button" onClick={() => saveCity("city2")}>
              Save city
            </button>
          </div>
          <div className="city-3">
            <button type="button" onClick={() => saveCity("city3")}>
              Save city
            </button>
          </div>
        </div>
        {/* // prettier-ignore */}
      </div>
    </>
  );
}
