import React, { useEffect, useState, useContext } from "react";
import "./SavedCitiesMenu.scss";
import RadioInput from "../Utils/RadioInput/RadioInput";
import { CityContext } from "../../App";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export default function SavedCitiesMenu({ validCity }) {
  const { city, setCity } = useContext(CityContext);
  const [defaultCity, setDefaultCity] = useState("");
  const [savedCities, setSavedCities] = useState({
    city1: "",
    city2: "",
    city3: "",
  });
  const [isMenuClosed, setIsMenuClosed] = useState(false);

  //TESTING PURPOSES
  useEffect(() => {
    console.log("2- city:", city, "validCity:", validCity);
  }, [city]);

  //LOCAL STORAGE GET
  useEffect(() => {
    try {
      if (localStorage.weatherApp) {
        setSavedCities(JSON.parse(localStorage.getItem("weatherApp")));
        setIsMenuClosed(JSON.parse(localStorage.getItem("menuClosed")));
      }
    } catch (err) {
      console.log("Error!File may be corrupted");
    }
  }, []);
  useEffect(() => {
    const fetchedDefaultCity = JSON.parse(localStorage.getItem("defaultCity"));
    setDefaultCity(fetchedDefaultCity);
    if (fetchedDefaultCity) {
      setCity(fetchedDefaultCity); //automatically fetches on onload
    }
  }, [setCity]); //don't use default city as a dependency

  //LOCAL STORAGE SET
  useEffect(() => {
    localStorage.setItem("weatherApp", JSON.stringify(savedCities));
  }, [savedCities]);
  useEffect(() => {
    localStorage.setItem("defaultCity", JSON.stringify(defaultCity));
  }, [defaultCity]);
  useEffect(() => {
    localStorage.setItem("menuClosed", JSON.stringify(isMenuClosed));
  }, [isMenuClosed]);

  //FUNCTIONS
  //SET CONTAINER HEIGHT
  const setContainerHeight = () =>
    isMenuClosed ? { height: "42px" } : { height: "90px" };
  const showHideOpenArrow = () => {
    return isMenuClosed
      ? {
          visibility: "visible",
        }
      : { visibility: "hidden" };
  };

  //TODO: show error for !validCity in App
  //SAVE CITY
  const saveCity = citySlot => {
    // prettier-ignore
    console.log("save city:", citySlot, validCity);
    // prettier-ignore
    if (citySlot === "city1") return setSavedCities({ ...savedCities, city1: validCity });
    // prettier-ignore
    if (citySlot === "city2") return setSavedCities({ ...savedCities, city2: validCity });
    // prettier-ignore
    if (citySlot === "city3") return setSavedCities({ ...savedCities, city3: validCity });
  };

  //VALIDATION
  const checkCityisElegible = citySlot => {
    if (!validCity) {
      console.log("SEARCH for a valid city first"); //TODO: ERROR MSG
      return;
    }
    const nameExists = Object.values(savedCities).some(city => {
      console.log(city);
      return city.toLowerCase() === validCity.toLowerCase();
    });
    return nameExists
      ? console.log("City is already saved")
      : saveCity(citySlot);
  };

  const checkSlotIsEmpty = e => {
    if (e.target.textContent === "empty") {
      console.log("SAVE A CITY FIRST"); //TODO: ERROR
      return;
    } else setCity(e.target.textContent);
  };

  //CHOOSE DEFAULT CITY
  const chooseDefaultCity = city => {
    //console.log("e.target.value", city);
    if (!city) {
      console.log("NOT POSSBILE"); //TODO: show error
      return;
    }
    setDefaultCity(city);
  };

  return (
    <>
      <div
        className="container__saved-cities-menu"
        style={setContainerHeight()}
      >
        {/*FAST ACCESS CITIES BUTTONS */}
        <div className="items items--4">
          <button onClick={checkSlotIsEmpty}>
            {savedCities.city1 || "empty"}
          </button>
        </div>

        <div className="items items--5">
          {" "}
          <button onClick={checkSlotIsEmpty}>
            {savedCities.city2 || "empty"}
          </button>
        </div>

        <div className="items items--6">
          {" "}
          <button onClick={checkSlotIsEmpty}>
            {savedCities.city3 || "empty"}
          </button>
        </div>

        {/* OPEN MENU */}
        <div className="items items--8 ">
          <button onClick={() => setIsMenuClosed(true)}>
            <i className="fas fa-angle-double-up"></i>
          </button>
        </div>

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
          <button onClick={() => checkCityisElegible("city1")}>Save</button>
        </div>
        <div className="items items--21 save-btns">
          <button onClick={() => checkCityisElegible("city2")}>Save</button>
        </div>
        <div className="items items--22 save-btns">
          <button onClick={() => checkCityisElegible("city3")}>Save</button>
        </div>

        {/* TOOLTIP RADIO BUTTON */}
        <div className="items items--23">
          <Tippy
            delay={400}
            content="SEARCH for a city first. Press `save` to save... "
          >
            <button className="tooltips">?</button>
          </Tippy>
        </div>
        {/* END CONTAINER */}
      </div>
    </>
  );
}
