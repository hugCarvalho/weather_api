import React, { useState, useEffect } from "react";
import "./Hours.scss";
import DisplayWeather from "../DisplayWeather/DisplayWeather";

export default function Hours({ filteredDataByDay, isLoading, activeDay }) {
  const [filteredDataByHours, setFilteredDataByHours] = useState({});
  let [defaultHour, setDefaultHour] = useState("");

  useEffect(() => {
    //console.log("2.1- UE: setFilData2: sends the data to be displayed ");
    setFilteredDataByHours(filteredDataByDay);
  }, [filteredDataByDay]);

  useEffect(() => {
    console.log("filteredDataByDay", filteredDataByDay);
  }, [filteredDataByDay]);

  useEffect(() => {
    console.log("filteredDataByHours", filteredDataByHours);
  }, [filteredDataByHours]);

  useEffect(() => {
    if (!isLoading) {
      if (activeDay.day0[1]) {
        setDefaultHour(filteredDataByDay.weather.list[0].dt_txt.slice(11, 16));
      }
      if (!activeDay.day0[1]) {
        setActiveHour();
      }
    }
  }, [isLoading, filteredDataByDay]);

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

  const filterByHour = e => {
    //console.log("e:", e);
    const timeOnButton = e === "anotherDay" ? "12:00" : e.target.textContent;
    const activeHour = filteredDataByDay.weather.list.filter(item => {
      return item.dt_txt.slice(11, 16) === timeOnButton;
    });
    setFilteredDataByHours({
      weather: {
        list: activeHour,
      },
    });
    //console.log("FN: FilterByHour");
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
      <DisplayWeather finalData={filteredDataByHours} />
    </>
  );
}
