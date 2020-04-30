import React, { useEffect, useState, useContext } from "react";
import "./SavedCitiesMenu.scss";
import Tooltips from "../Tooltips/Tooltips";
import { CityContext } from "../../App";

//TODO: try build fn to handle checked result because of REact warning OR change onHandle function
//TODO: V.1.1 - prevent saving the city twice
//TODO: convert city names in buttons for fast access

export default function SavedCitiesMenu({ validCity }) {
  const { city, setCity } = useContext(CityContext);
  const [defaultCity, setDefaultCity] = useState("");
  const [savedCities, setSavedCities] = useState({
    city1: "",
    city2: "",
    city3: "",
  });
  //console.log("savedCities", savedCities);

  //Check local storage
  useEffect(() => {
    try {
      if (localStorage.weatherApp) {
        setSavedCities(JSON.parse(localStorage.getItem("weatherApp")));
      }
    } catch (err) {
      //showErrorMsg("Error!File may be corrupted");
    }
    //console.log("EFFECT1:", localStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem("weatherApp", JSON.stringify(savedCities));
    console.log("SAVE THE CITY IN LS:", savedCities);
  }, [savedCities]); //add at the end savedcity dependency

  const saveCity = n => {
    // prettier-ignore
    if (!validCity) console.log("ERROR INVALID CITY") //showErrorMsg("SEARCH for a valid city first");
    // prettier-ignore
    if (n === "city1") return setSavedCities({ ...savedCities, city1: validCity });
    // prettier-ignore
    if (n === "city2") return setSavedCities({ ...savedCities, city2: validCity });
    // prettier-ignore
    if (n === "city3") return setSavedCities({ ...savedCities, city3: validCity });
  };

  const chooseDefaultCity = city => {
    console.log("e.target.value", city);
    if (!savedCities) {
      console.log(savedCities);
      console.log("NOT POSSBILE");
      return;
    }
    console.log("right...");
    setDefaultCity(city);
  };
  useEffect(() => {
    //console.log("EFFECT2", localStorage);
    const defaultCity = JSON.parse(localStorage.getItem("defaultCity"));
    setDefaultCity(defaultCity);
    if (defaultCity) {
      setCity(defaultCity); //!!!! ACTIVATE THIS LINE TO FETCH AT ONLOAD
    }
  }, []); //don't use default city as a dependency

  useEffect(() => {
    //console.log("DEFAULT SAVE:", defaultCity);
    localStorage.setItem("defaultCity", JSON.stringify(defaultCity));
  }, [defaultCity]);

  return (
    <>
      {/* {console.log("DEFAULT:", defaultCity)} */}
      {/* {console.log("RENDER")}{" "} */}
      <div className="options-title">
        <h3>Choose your active city:</h3>
      </div>
      <div className="container__saved-cities">
        {/* MEnu Left */}
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
              //only allows action if a city is saved already
              onChange={
                savedCities.city1
                  ? e => chooseDefaultCity(e.target.value)
                  : () => {} //React shows warning if null is chosen
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
                  : () => {}
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
                  : () => {}
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

        <Tooltips />
      </div>
    </>
  );
}
