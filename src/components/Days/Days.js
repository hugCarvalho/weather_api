import React, { useState, useEffect } from "react";
import "./Days.scss";
//import { IsLoading } from "../../App";
import Moment from "react-moment";
import Hours from "../Hours/Hours";

//TODO change active method for more dynamic approach

export default function CityCard({ isLoading, data }) {
  const [filteredData, setFilteredData] = useState({});
  const [isActive, setIsActive] = useState({
    day0: true,
    day1: false,
    day2: false,
  });

  useEffect(() => {
    // console.log("USELAYOUT DAY:", data, isLoading);
    setFilteredData(data);
    !isLoading && filterByDay(0);
  }, [data, isLoading]);

  useEffect(() => {
    // console.log("filteredData", filteredData);
  }, [filteredData]);

  useEffect(() => {
    // console.log("isActive", isActive);
  }, [isActive]);

  const filterByDay = day => {
    const currentDay = Number(data.weather.list[0].dt_txt.slice(8, 10));
    const currentMonth = Number(data.weather.list[0].dt_txt.slice(5, 7));
    let forecastDay = currentDay + day;

    let res = data.weather.list.filter(day => {
      return +day.dt_txt.slice(8, 10) === forecastDay;
    });

    if (res.length === 0 && forecastDay === 33) {
      forecastDay = 2;
      res = data.weather.list.filter(day => {
        return +day.dt_txt.slice(8, 10) === forecastDay;
      });
    }
    if (res.length === 0 && forecastDay === 31) {
      forecastDay = 1;
      res = data.weather.list.filter(day => {
        return +day.dt_txt.slice(8, 10) === forecastDay;
      });
    }
    if (res.length === 0 && forecastDay === 32) {
      res = data.weather.list.filter(day => {
        currentMonth % 2 !== 0 ? (forecastDay = 1) : (forecastDay = 2);
        return +day.dt_txt.slice(8, 10) === forecastDay;
      });
    }
    //TODO: condition for feb
    setFilteredData({
      weather: {
        list: res,
      },
    });
  };
  //TODO: conditional render to wait for loading, display or btns
  return (
    <>
      {/* Doesn't show "days" if there is no default city on page load  */}
      <div
        className="container__days-forecast "
        style={!isLoading ? { display: "block" } : { display: "none" }}
      >
        <ul className="days">
          {/* TODAY */}
          <li
            onClick={() =>
              setIsActive({
                day0: true,
                day1: false,
                day2: false,
              })
            }
          >
            <button
              className={isActive.day0 ? "active" : "inactive"}
              onClick={() => filterByDay(0)}
            >
              {" "}
              <p>Today</p>
            </button>
          </li>

          {/* Tomorrow */}
          <li
            onClick={() =>
              setIsActive({
                day0: false,
                day1: true,
                day2: false,
              })
            }
          >
            <button
              className={isActive.day1 ? "active" : "inactive"}
              onClick={() => filterByDay(1)}
            >
              <p>
                <Moment format="dddd" add={{ days: 1 }}></Moment>
              </p>
            </button>
          </li>

          {/* After Tomorrow */}
          <li
            onClick={() =>
              setIsActive({
                day0: false,
                day1: false,
                day2: true,
              })
            }
          >
            <button
              className={isActive.day2 ? "active" : "inactive"}
              onClick={() => filterByDay(2)}
            >
              <h5>
                <Moment format="dddd" add={{ days: 2 }} />
              </h5>
            </button>
          </li>
        </ul>
      </div>
      <Hours filteredData={filteredData} isLoading={isLoading} />
    </>
  );
}
