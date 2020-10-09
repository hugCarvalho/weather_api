import React from "react";
import "./DisplayCityName.scss";
import { ClipLoader } from "react-spinners";
import PropTypes from "prop-types";

export default function DisplayCityName({ validCity, isLoading }) {
  return (
    <>
      <header className="container__city-name">
        <h2>
          {isLoading && validCity ? (
            <ClipLoader color="white" />
          ) : (
            validCity.toUpperCase() || "Search for a city"
          )}
        </h2>
      </header>
    </>
  );
}

DisplayCityName.propTypes = {
  validCity: PropTypes.string,
  isLoading: PropTypes.bool,
};
