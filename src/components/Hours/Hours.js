import React, { useState, useEffect } from "react";
import "./Hours.scss";
import DisplayWeather from "../DisplayWeather/DisplayWeather";

export default function Hours({ filteredDataByDay, isLoading, activeDay }) {
  const [filteredDataByHour, setFilteredDataByHour] = useState({});
  const [defaultHour, setDefaultHour] = useState("");

  useEffect(() => {
    console.log(
      " setFilteredDataByHour: sends the data to be displayed:",
      filteredDataByDay
    );
    setFilteredDataByHour(filteredDataByDay);
  }, [filteredDataByDay]); //remove

  useEffect(() => {
    console.log("filData2", filteredDataByHour);
  }, [filteredDataByHour]); //remove

  useEffect(() => {
    //console.log("UE: ActiveDay", activeDay);
  }, [activeDay]);

  const setActiveHour = e => {
    if (e === undefined) {
      setDefaultHour("12:00");
      return filterByHour("anotherDay");
    } else {
      setDefaultHour(e.target.textContent);
      return filterByHour(e);
    }
  };
  useEffect(() => {
    if (!isLoading) {
      if (activeDay.day0[1]) {
        setDefaultHour(filteredDataByDay.weather.list[0].dt_txt.slice(11, 16));
      }
      if (!activeDay.day0[1]) {
        setActiveHour();
      }
    }
  }, [isLoading, filteredDataByDay, activeDay]);

  const filterByHour = e => {
    const timeOnButton = e === "anotherDay" ? "12:00" : e.target.textContent;
    const activeHour = filteredDataByDay.weather.list.filter(item => {
      return item.dt_txt.slice(11, 16) === timeOnButton;
    });
    setFilteredDataByHour({
      weather: {
        list: activeHour,
      },
    });
  };

  return (
    <>
      <div className="container__hours">
        {!isLoading &&
          filteredDataByDay.weather.list.map((item, i) => {
            let classes = [
              defaultHour === item.dt_txt.slice(11, 16) ? "active-hour" : null,
              `item--${i + 1}`,
            ];
            return (
              <button
                className={classes.join(" ")}
                onClick={e => setActiveHour(e)}
                key={i}
              >
                {item.dt_txt.slice(11, 16)}
              </button>
            );
          })}
      </div>
      <DisplayWeather filteredDataByHour={filteredDataByHour} />
    </>
  );
}
