import React, { useEffect, useState, useContext } from "react";
import "./SavedCitiesMenu.scss";
import RadioInput from "../Utils/RadioInput/RadioInput";
import { CityContext } from "../../App";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export default function SavedCitiesMenu({ validCity }) {
  const { setCity } = useContext(CityContext);
  const [defaultCity, setDefaultCity] = useState("");
  const [savedCities, setSavedCities] = useState({
    city1: "",
    city2: "",
    city3: "",
  });
  const [isMenuClosed, setIsMenuClosed] = useState(false);

  //console.log("savedCities", savedCities);

  //Check local storage
  useEffect(() => {
    console.log("isMenuClosed", isMenuClosed);
    try {
      if (localStorage.weatherApp) {
        setSavedCities(JSON.parse(localStorage.getItem("weatherApp")));
        setIsMenuClosed(JSON.parse(localStorage.getItem("menuClosed")));
      }
    } catch (err) {
      console.log("Error!File may be corrupted"); //showErrorMsg("Error!File may be corrupted");
    }
    //console.log("EFFECT1:", localStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem("menuClosed", isMenuClosed);
  }, [isMenuClosed]);

  useEffect(() => {
    localStorage.setItem("weatherApp", JSON.stringify(savedCities));
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

  const setContainerHeight = () =>
    isMenuClosed ? { height: "42px" } : { height: "90px" };
  const showHideOpenArrow = () => {
    return isMenuClosed
      ? {
          visibility: "visible",
        }
      : { visibility: "hidden" };
  };

  return (
    <>
      <div
        className="container__saved-cities-menu"
        style={setContainerHeight()}
      >
        {/*FAST ACCESS CITIES BUTTONS */}
        <div className="items items--4">
          <button onClick={e => setCity(e.target.textContent)}>
            {savedCities.city1 || "empty"}
          </button>
        </div>

        <div className="items items--5">
          {" "}
          <button onClick={e => setCity(e.target.textContent)}>
            {savedCities.city2 || "empty"}
          </button>
        </div>

        <div className="items items--6">
          {" "}
          <button onClick={e => setCity(e.target.textContent)}>
            {savedCities.city3 || "empty"}
          </button>
        </div>

        {/* TOOLTIP FAST ACCESS CITIES */}
        <div className="items items--7">
          <Tippy
            delay={400}
            content="Must be a valid city name.Use to quick access your saved citites."
          >
            <button className="tooltips">?</button>
          </Tippy>
        </div>

        {/* OPEN MENU */}
        <div className="items items--8 ">
          <button onClick={() => setIsMenuClosed(true)}>
            <i className="fas fa-angle-double-up"></i>
          </button>
        </div>
        {/* <div className="items items--9">Default</div> */}

        {/* RADIO INPUTS*/}
        <div className="items items--10 radio-btns">
          <RadioInput
            value={savedCities.city1}
            value2={defaultCity}
            id="city-1"
            runFn={chooseDefaultCity}
          />
        </div>
        <div className="items items--11 radio-btns">
          <RadioInput
            value={savedCities.city2}
            value2={defaultCity}
            id="city-2"
            runFn={chooseDefaultCity}
          />
        </div>
        <div className="items items--12 radio-btns">
          <RadioInput
            value={savedCities.city3}
            id="city-3"
            value2={defaultCity}
            runFn={chooseDefaultCity}
          />
        </div>

        {/* TOOLTIP RADIO BUTTONS*/}
        <div className="items items--13">
          <Tippy delay={500} content="set a default city to load at startup">
            <button className="tooltips">?</button>
          </Tippy>
        </div>

        {/* OPEN MENU */}
        <div className="items items--19" style={showHideOpenArrow()}>
          <button className="open-menu" onClick={() => setIsMenuClosed(false)}>
            <i className="fas fa-angle-double-down"></i>
          </button>
        </div>

        {/* SAVE CITY BUTTONS */}
        <div className="items items--20 save-btns">
          <button onClick={() => saveCity("city1")}>Save</button>
        </div>

        <div className="items items--21 save-btns">
          {" "}
          <button type="button" onClick={() => saveCity("city2")}>
            Save
          </button>
        </div>
        <div className="items items--22 save-btns">
          {" "}
          <button type="button" onClick={() => saveCity("city3")}>
            Save
          </button>
        </div>

        {/* TOOLTIP RADIO BUTTON */}
        <div className="items items--23">
          <Tippy
            delay={400}
            content="SEARCH for a city. Press `save` to save... "
          >
            <button className="tooltips">?</button>
          </Tippy>
        </div>
        {/* END CONTAINER */}
      </div>
    </>
  );
}
