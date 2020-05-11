import React, { useState, useEffect } from "react";
import "./Hours.scss";
import DisplayWeather from "../DisplayWeather/DisplayWeather";
// import { IsLoadingContext } from "../../App";

export default function Hours({ filteredDataByDay, isLoading, activeDay }) {
  const [filData2, setFilData2] = useState({});
  let [defaultHour, setDefaultHour] = useState("");
  //const [activeHour, setActiveHour] = useState("");

  useEffect(() => {
    //console.log("2.1- UE: setFilData2: sends the data to be displayed ");
    setFilData2(filteredDataByDay);
  }, [filteredDataByDay]);

  useEffect(() => {
    if (!isLoading) {
      // console.log(
      //   "1 - UE NOT LOADING: setDefaultHour with data from array:",
      //   defaultHour
      // );
      if (activeDay.day0[1]) {
        setDefaultHour(filteredDataByDay.weather.list[0].dt_txt.slice(11, 16));
      }
      if (!activeDay.day0[1]) {
        // console.log(
        //   "UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUE: setDefaultHour for 15:00, defaultHour"
        // );
        //setDefaultHour("12:00");
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
    setFilData2({
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
      <DisplayWeather filData2={filData2} />
    </>
  );
}
