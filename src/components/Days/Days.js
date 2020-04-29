import React, { useState, useEffect } from "react";
import "./Days.scss";
//import { IsLoading } from "../../App";
import Moment from "react-moment";
import Hours from "../Hours/Hours";

export default function CityCard({ isLoading, data }) {
  const [filteredData, setFilteredData] = useState({});

  useEffect(() => {
    // console.log("USELAYOUT DAY:", data, isLoading);
    setFilteredData(data);
    !isLoading && filterByDay(0);
  }, [data, isLoading]);
  useEffect(() => {
    // console.log("filteredData", filteredData);
  }, [filteredData]);

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
        //console.log(day);
        return +day.dt_txt.slice(8, 10) === forecastDay;
      });
    }
    if (res.length === 0 && forecastDay === 31) {
      forecastDay = 1;
      res = data.weather.list.filter(day => {
        //console.log(day);
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
      <ul>
        <li className="current">
          {/* // prettier-ignore */}
          <button onClick={() => filterByDay(0)}>
            {" "}
            <Moment format="DD-MM-YY" />
          </button>
          <button onClick={() => filterByDay(1)}>
            {" "}
            <Moment format="DD-MM-YY" add={{ days: 1 }}></Moment>
          </button>
          <button onClick={() => filterByDay(2)}>
            <Moment format="dddd" add={{ days: 2 }} />
          </button>
        </li>
      </ul>
      <Hours filteredData={filteredData} isLoading={isLoading} />
    </>
  );
}
