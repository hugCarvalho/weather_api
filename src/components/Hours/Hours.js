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

  //One array with the matching time is returned and will be passed down
  const filterByActiveHour = day => {
    const timeOnButton = day === "anotherDay" ? "12:00" : day;
    const activeHourArray = filteredDataByDay.weather.list.filter(item => {
      return item.dt_txt.slice(11, 16) === timeOnButton;
    });
    if (validCity && !isLoading) {
      //don't change, will re-render data also after false city
      setFilteredDataByHours({
        weather: {
          list: activeHourArray,
        },
      });
    }
  };

  //Sets active hour, triggers on click => filterByActiveHour
  const settingActiveHour = e => {
    setDefaultHour(e.target.textContent);
    return filterByActiveHour(e.target.textContent);
  };

  //sets the data so that only the hours for one day appear
  useEffect(() => {
    validCity && setFilteredDataByHours(filteredDataByDay);
  }, [filteredDataByDay, validCity]);

  useEffect(() => {
    if (validCity && !isLoading) {
      if (activeTab.day0) {
        //sets default hour for day of today. Will be automatically chosen when page loads for first time.
        setDefaultHour(filteredDataByDay.weather.list[0].dt_txt.slice(11, 16));
      }
      if (!activeTab.day0) {
        setDefaultHour("12:00");
        return filterByActiveHour("anotherDay");
      }
    }
  }, [isLoading, filteredDataByDay, validCity]);

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
