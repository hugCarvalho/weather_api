import React, { useEffect, useState } from "react";
import "./SavedCitiesMenu.scss";

export default function SavedCitiesMenu({ savedCities, saveCity }) {
  //console.log("savedCities", savedCities);
  //console.log("saveCity", saveCity);
  const [defaultCity, setDefaultCity] = useState("");
  //console.log("savedCities", savedCities);

  const chooseDefaultCity = e => {
    if (!savedCities) {
      //console.log("NOT POSSBILE");
      return;
    }
    //console.log("CHOOSEDEFAULTCITY", e);
    setDefaultCity(e);
  };
  useEffect(() => {
    //console.log("EFFECT2", localStorage);
    setDefaultCity(JSON.parse(localStorage.getItem("defaultCity")));
  }, []);
  useEffect(() => {
    //console.log("DEFAULT SAVE:", defaultCity);
    localStorage.setItem("defaultCity", JSON.stringify(defaultCity));
  }, [defaultCity]);

  //console.log("SAVEDCITITESMENU");
  return (
    <>
      {console.log(savedCities.city1)}
      {/* {console.log("DEFAULT:", defaultCity)} */}
      {/* {console.log("RENDER")}{" "} */}
      <div className="options-title">
        <h3>Choose your active city:</h3>
      </div>
      <div className="container__saved-cities">
        {/* // prettier-ignore */}
        <div className="menu-left">
          <p></p>
          <p>Default</p>
          <p>City</p>
        </div>
        {/* City-1 */}
        <div className="cities city-1">
          <p>City 1</p>
          <p>
            <input
              type="radio"
              id="city-1"
              //name="cities"
              value={savedCities.city1}
              onChange={
                //only allows action if a city is saved already
                savedCities.city1
                  ? e => chooseDefaultCity(e.target.value)
                  : null
              }
              checked={savedCities.city1 === defaultCity}
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
          <p>City 2</p>
          <p>
            <input
              type="radio"
              id="city-2"
              //name="cities"
              value={savedCities.city2}
              onChange={
                savedCities.city2
                  ? e => chooseDefaultCity(e.target.value)
                  : null
              }
              checked={savedCities.city2 === defaultCity}
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
          <p>City 3</p>
          <p>
            <input
              type="radio"
              id="city-3"
              //name="cities"
              value={savedCities.city3}
              onChange={
                savedCities.city3
                  ? e => chooseDefaultCity(e.target.value)
                  : null
              }
              checked={savedCities.city3 === defaultCity}
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