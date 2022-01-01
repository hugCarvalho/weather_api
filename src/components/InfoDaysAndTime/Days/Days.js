import React from "react";
import "./Days.scss";
import Moment from "react-moment";
import PropTypes from "prop-types";
import {days} from "../../Notifications/optionsConfig"

export default function Days({ activeDay, setActiveDay, isLoading, validCity }) {

  return (
    <>
      <div
        className="container__days-forecast"
        style={!isLoading && validCity ? { display: "block" } : { display: "none" }}
      >
        <ul className="days">
          {days.map((day, i) => {
            return (
              <li key={i} onClick={() => setActiveDay(day)}>
                <button
                  className={activeDay === day ? "tab-is-active" : "tab-is-inactive"}>
                  <p>
                    {i === 0 ? "Today" : <Moment format="dddd" add={{ days: i }}></Moment>}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

Days.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  activeDay: PropTypes.string.isRequired,
  setActiveDay: PropTypes.func,
  validCity: PropTypes.string,
};
