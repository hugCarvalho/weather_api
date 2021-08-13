import React, { useState, useEffect } from "react";
import "./Hours.scss";
import DisplayWeather from "../DisplayWeather/DisplayWeather";
import PropTypes from "prop-types";

export default function Hours({ filteredDataByDay, isLoading, activeDay, validCity, forecast3Days}) {
  const [activeHour, setActiveHour] = useState("12:00");
  const [selectedTime, setSelectedTime] = useState({})  

  useEffect(() => {
    if (!isLoading && validCity) {
      let res = forecast3Days[activeDay].filter(hour => {
        return hour.dt_txt.slice(11, 16) === activeHour
      })
      setSelectedTime(res)
    }

  }, [forecast3Days, isLoading, validCity, activeHour])

  useEffect(() => {
    // console.log("selected", selectedTime[0])
  }, [selectedTime])

  //One array with the matching time is returned and will be passed down
  // const filterByActiveHour = (day) => {
  //   const timeOnButton = day === "anotherDay" ? "12:00" : day;
  //   const activeHourArray = filteredDataByDay.weather.list.filter((item) => {
  //     return item.dt_txt.slice(11, 16) === timeOnButton;
  //   });
  //   if (validCity && !isLoading) {
  //     //don't change, will re-render data also after false city
  //     // setFilteredDataByHours({
  //     //   weather: {
  //     //     list: activeHourArray,
  //     //   },
  //     // });
  //   }
  // };

  //Sets active hour for "tomorrow and after tomorrow", triggers on click => filterByActiveHour
  // const settingActiveHour = (e) => {
  //   setActiveHour(e.target.textContent);
  //   return filterByActiveHour(e.target.textContent);
  // };

  //sets the data so that only the hours for one day appear
  useEffect(() => {
    // validCity && setFilteredDataByHours(filteredDataByDay);
  }, [filteredDataByDay, validCity]);

  useEffect(() => {
    if (validCity && !isLoading && activeDay === "today") {
        setActiveHour(forecast3Days[activeDay][0].dt_txt.slice(11, 16));
    }
    if (validCity && !isLoading && activeDay !== "today") {
      setActiveHour("12:00");
  }
  }, [isLoading, validCity, activeDay, forecast3Days]);

  // console.log("FORECAST", forecast3Days.today)

  useEffect(() => {
    console.log("activeTab", activeDay)
  }, [activeDay])

  return (
    <>
      <div className="container__hours">
        {
          !isLoading && validCity && forecast3Days[activeDay].map((day, i) => {
            let classes = [
              activeHour === day.dt_txt.slice(11, 16) ? "active-hour" : null,
              `item--${i + 1}`,
            ];
            return (
              <button
                className={classes.join(" ")}
                onClick={(e) => setActiveHour(e.target.textContent)}
                key={i}
              >
                {day.dt_txt.slice(11, 16)}
              </button>
            );

          })
        }
      </div>
      <DisplayWeather
        activeDay={activeDay}
        activeHour={activeHour}
        selectedTime={selectedTime}
        validCity={validCity}
        isLoading={isLoading}
      />
    </>
  );
}

Hours.propTypes = {
  validCity: PropTypes.string,
  isLoading: PropTypes.bool,
  activeDay: PropTypes.object,
  filteredDataByDay: PropTypes.object,
};
