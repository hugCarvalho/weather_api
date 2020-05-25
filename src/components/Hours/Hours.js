import React, { useState, useEffect } from "react";
import "./Hours.scss";
import DisplayWeather from "../DisplayWeather/DisplayWeather";

export default function Hours({
  filteredDataByDay,
  isLoading,
  activeTab,
  validCity,
}) {
  const [filteredDataByHours, setFilteredDataByHours] = useState({});
  let [defaultHour, setDefaultHour] = useState("");

  //TESTING
  // useEffect(() => {
  //   console.log("filteredDataByHours", filteredDataByHours);
  // }, [filteredDataByHours]);

  // useEffect(() => {
  //   console.log("filteredDataByDAYS", filteredDataByDay);
  // }, [filteredDataByDay]);

  //sets the data so that only the hours for one day appear
  useEffect(() => {
    //debugger;
    // console.log("setFilteredDataByDay", filteredDataByDay);
    validCity && setFilteredDataByHours(filteredDataByDay);
    //debugger;
  }, [filteredDataByDay, validCity]);

  //Not
  useEffect(() => {
    //debugger;
    if (validCity && !isLoading && activeTab) {
      if (activeTab.day0) {
        setDefaultHour(filteredDataByDay.weather.list[0].dt_txt.slice(11, 16));
      }
      if (!activeTab.day0) {
        settingActiveHour();
      }
    }
    //debugger;
  }, [isLoading, filteredDataByDay]);

  //SETTING ACTIVE HOUR
  const settingActiveHour = e => {
    // console.log("e:", e);
    if (e === undefined) {
      setDefaultHour("12:00");
      return filterByActiveHour("anotherDay");
    } else {
      setDefaultHour(e.target.textContent);
      return filterByActiveHour(e);
    }
  };

  //One array with the matching time is returned and will be passed down
  const filterByActiveHour = e => {
    const timeOnButton = e === "anotherDay" ? "12:00" : e.target.textContent;
    const activeHourArray = filteredDataByDay.weather.list.filter(item => {
      return item.dt_txt.slice(11, 16) === timeOnButton;
    });
    if (validCity && !isLoading) {
      //don't change, will re-render data also after false city
      console.log("active hour", activeHourArray);
      setFilteredDataByHours({
        weather: {
          list: activeHourArray,
        },
      });
    }
  };

  return (
    <>
      <div className="container__hours">
        {!isLoading &&
          validCity &&
          filteredDataByDay.weather.list.map((item, i) => {
            let classes = [
              defaultHour === item.dt_txt.slice(11, 16) ? "active-hour" : null,
              `item--${i + 1}`,
            ];
            return (
              <button
                className={classes.join(" ")}
                onClick={e => settingActiveHour(e)}
                key={i}
              >
                {item.dt_txt.slice(11, 16)}
              </button>
            );
          })}
      </div>
      <DisplayWeather finalData={filteredDataByHours} validCity={validCity} />
    </>
  );
}
