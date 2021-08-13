import React, { useEffect, useState, useContext } from "react";
import "./SavedCitiesMenu.scss";
import RadioButtons from "../Utils/RadioButtons/RadioButtons";
import { ErrorContext, UserQueryContext } from "../../App";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import PropTypes from "prop-types";
import { CityCloud } from "./SavedCitiesStyled";

const accessibility = {
  width: "1px",
  height: "1px",
  position: "absolute",
  top: "auto",
  left: "-10000px",
  overflow: "hidden",
};

//TODO: refactor. Css at least replace buttons with styled components
export default function SavedCitiesMenu({ validCity }) {
  const { setUserQuery } = useContext(UserQueryContext);
  const { dispatch } = useContext(ErrorContext);

  const [defaultCity, setDefaultCity] = useState("");
  const [isMenuClosed, setIsMenuClosed] = useState(false);
  // prettier-ignore
  const [savedCities, setSavedCities] = useState({city1: "",city2: "",city3: ""});

  //LOCAL STORAGE: GET
  useEffect(() => {
    try {
      if (localStorage.weatherApp) {
        setSavedCities(JSON.parse(localStorage.getItem("weatherApp")));
        setIsMenuClosed(JSON.parse(localStorage.getItem("menuClosed")));
      }
    } catch (err) {
      dispatch({ type: "TRUE", value: "Error! File may be corrupted!" });
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      const fetchedDefaultCity = JSON.parse(localStorage.getItem("defaultCity"));

      setDefaultCity(fetchedDefaultCity);

      if (fetchedDefaultCity) {
        setUserQuery(fetchedDefaultCity); //automatically fetches on onload
      }
    } catch (err) {
      dispatch({ type: "TRUE", value: "Error! File may be corrupted!" });
    }
  }, [setUserQuery, dispatch]);

  //LOCAL STORAGE: SET
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
    isMenuClosed ? { height: "42px" } : { height: "auto" };

  const showHideOpenArrow = () => {
    return isMenuClosed
      ? {
          visibility: "visible",
        }
      : { visibility: "hidden" };
  };

  //SAVE CITY
  const saveCity = citySlot => {
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
      return dispatch({ type: "TRUE", value: "SEARCH for a valid city first" });
    }

    const cityNameExists = Object.values(savedCities).some(city => {
      return city.toLowerCase() === validCity.toLowerCase();
    });

    if (cityNameExists) {
      dispatch({ type: "TRUE", value: "City is already saved" });
    } else saveCity(citySlot);
  };

  // Check to prevent saving the same city again
  const checkSlotIsEmpty = e => {
    if (e.target.textContent === "empty") {
      return dispatch({ type: "TRUE", value: "SAVE a city first" });
    } else setUserQuery(e.target.textContent);
  };

  //CHOOSE DEFAULT CITY
  const chooseDefaultCity = city => {
    if (!city) {
      return dispatch({ type: "TRUE", value: "SAVE a city first" });
    }
    setDefaultCity(city);
  };

  return (
    <>
      <div className="container__saved-cities-menu" style={setContainerHeight()}>
        {/*FAST ACCESS CITIES BUTTONS */}
        <div className="items items--4">
          <CityCloud onClick={checkSlotIsEmpty}>{savedCities.city1 || "empty"}</CityCloud>
        </div>
        <div className="items items--5">
          <CityCloud onClick={checkSlotIsEmpty}>{savedCities.city2 || "empty"}</CityCloud>
        </div>
        <div className="items items--6">
          <CityCloud onClick={checkSlotIsEmpty}>{savedCities.city3 || "empty"}</CityCloud>
        </div>

        {/* CLOSE MENU */}
        <div className="items items--8 ">
          <button onClick={() => setIsMenuClosed(true)}>
            <i className="fas fa-angle-double-up"></i>
            <span style={accessibility}>open or close saved cities menu</span>
          </button>
        </div>

        {/* OPEN MENU */}
        <div className="items items--19" style={showHideOpenArrow()}>
          <button className="open-menu" onClick={() => setIsMenuClosed(false)}>
            <i className="fas fa-angle-double-down"></i>
          </button>
        </div>

        {/* RADIO INPUTS*/}
        <div className="items items--10 radio-btns">
          <RadioButtons
            value={savedCities.city1}
            value2={defaultCity}
            id="city-1"
            action={chooseDefaultCity}
          />
        </div>
        <div className="items items--11 radio-btns">
          <RadioButtons
            value={savedCities.city2}
            value2={defaultCity}
            id="city-2"
            action={chooseDefaultCity}
          />
        </div>
        <div className="items items--12 radio-btns">
          <RadioButtons
            value={savedCities.city3}
            id="city-3"
            value2={defaultCity}
            action={chooseDefaultCity}
          />
        </div>

        {/* TOOLTIP RADIO BUTTONS*/}
        <div className="items items--13">
          <Tippy delay={500} content="set a default city to load at startup">
            <button className="tooltips">?</button>
          </Tippy>
        </div>

        {/* SAVE CITY BUTTONS */}
        <div className="items items--20 ">
          <button className="save-btns" onClick={() => checkCityisElegible("city1")}>
            Save
          </button>
        </div>
        <div className="items items--21">
          <button className="save-btns" onClick={() => checkCityisElegible("city2")}>
            Save
          </button>
        </div>
        <div className="items items--22">
          <button className="save-btns" onClick={() => checkCityisElegible("city3")}>
            Save
          </button>
        </div>

        {/* TOOLTIP SAVE BUTTON */}
        <div className="items items--23">
          <Tippy delay={400} content="SEARCH for a city first. Then press `save`">
            <button className="tooltips">?</button>
          </Tippy>
        </div>
      </div>
    </>
  );
}

SavedCitiesMenu.propTypes = {
  validCity: PropTypes.string,
};
