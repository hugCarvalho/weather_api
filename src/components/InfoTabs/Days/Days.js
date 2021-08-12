import React, { useState, useEffect } from "react";
import "./Days.scss";
import Moment from "react-moment";
import Hours from "../../Hours/Hours";
import PropTypes from "prop-types";

export default function Days({ isLoading, data, validCity, cityNotValid, forecast3Days}) {
  const [activeDay, setActiveDay] = useState("today");
  const days = ["today", "tomorrow", "afterTomorrow"]

  useEffect(() => {
    setActiveDay("today")
  }, [validCity]); //will reset the active tab after a request about a new city

  return (
    <>
      <div
        className="container__days-forecast "
        style={!isLoading && validCity ? { display: "block" } : { display: "none" }}
      >
        <ul className="days">
          {days.map((day, i) => {
            return (
              <li onClick={() => setActiveDay(day)}>
                <button className={activeDay === day ? "tab-is-active" : "tab-is-inactive"}>
                  <p>{i === 0 ? "Today" :  <Moment format="dddd" add={{ days: i}}></Moment> }</p>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <Hours
        isLoading={isLoading}
        activeDay={activeDay}
        validCity={validCity}
        forecast3Days={forecast3Days}
      />
    </>
  );
}

Days.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  cityNotValid: PropTypes.bool.isRequired,
  data: PropTypes.object,
  validCity: PropTypes.string,
};
