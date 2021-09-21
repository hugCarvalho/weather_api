import React, { useState, useEffect } from "react";
import "./Hours.scss";
import PropTypes from "prop-types";

export default function Hours({
  selectedTime,
  setSelectedTime,
  isLoading,
  activeDay,
  validCity,
  forecast3Days,
}) {
  const [activeHour, setActiveHour] = useState("12:00");

  useEffect(() => {
    if (!isLoading && validCity) {
      const filteredBySelectedHour = forecast3Days[activeDay].filter(hour => {
        return hour.dt_txt.slice(11, 16) === activeHour;
      });
      setSelectedTime(filteredBySelectedHour);
    }
  }, [setSelectedTime, forecast3Days, isLoading, validCity, activeHour, activeDay]);

  useEffect(() => {
    if (validCity && !isLoading && activeDay === "today") {
      setActiveHour(forecast3Days[activeDay][0]?.dt_txt.slice(11, 16));
    }
    if (validCity && !isLoading && activeDay !== "today") {
      setActiveHour("12:00");
    }
  }, [isLoading, validCity, activeDay, forecast3Days]);

  return (
    <>
      <div className="container__hours">
        {!isLoading &&
          validCity &&
          selectedTime.length > 0 &&
          forecast3Days[activeDay].map((day, i) => {
            const classes = [
              activeHour === day.dt_txt.slice(11, 16) ? "active-hour" : null,
              `item--${i + 1}`,
            ];
            return (
              <button
                className={classes.join(" ")}
                onClick={e => setActiveHour(e.target.textContent)}
                key={i}
              >
                {day.dt_txt.slice(11, 16)}
              </button>
            );
          })}
      </div>
    </>
  );
}

Hours.propTypes = {
  validCity: PropTypes.string,
  isLoading: PropTypes.bool,
  activeDay: PropTypes.string,
};
