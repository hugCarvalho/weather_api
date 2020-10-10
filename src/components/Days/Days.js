import React, { useState, useEffect } from "react";
import "./Days.scss";
import Moment from "react-moment";
import Hours from "../Hours/Hours";
import PropTypes from "prop-types";

const initTabs = {
  day0: true,
  day1: false,
  day2: false,
};

export default function Days({ isLoading, data, validCity, notValidCity }) {
  const [filteredDataByDay, setFilteredDataByDay] = useState({});
  const [activeTab, setActiveTab] = useState(initTabs);

  //Filters original data returning the data for desired day
  const filterByDay = (day) => {
    const currentDay = Number(data.weather.list[0].dt_txt.slice(8, 10));
    const currentMonth = Number(data.weather.list[0].dt_txt.slice(5, 7));
    let forecastDay = currentDay + day;

    const filterRequiredDay = () => {
      return data.weather.list.filter((dayOfTheMonth) => {
        return +dayOfTheMonth.dt_txt.slice(8, 10) === forecastDay;
      });
    };
    let res = filterRequiredDay();
    //if no match is found, number is not valid calendar day, hence the conditions
    if (res.length === 0 && forecastDay === 33) {
      forecastDay = 2;
      res = filterRequiredDay();
    } else if (res.length === 0 && forecastDay === 31) {
      forecastDay = 1;
      res = filterRequiredDay();
    } else if (res.length === 0 && forecastDay === 32) {
      res = data.weather.list.filter((day) => {
        currentMonth % 2 !== 0 ? (forecastDay = 1) : (forecastDay = 2);
        return +day.dt_txt.slice(8, 10) === forecastDay;
      });
    }
    //TODO: condition for feb
    setFilteredDataByDay({
      weather: {
        list: res,
      },
    });
  };

  useEffect(() => {
    //Filters the data for initial and reload
    setFilteredDataByDay(data);
    if (!isLoading && validCity) {
      filterByDay(0);
    }
  }, [data, isLoading, validCity, notValidCity]);

  useEffect(() => {
    setActiveTab(initTabs);
  }, [validCity, notValidCity]); //will reset the active tab after a request about a new city

  return (
    <>
      <div
        className="container__days-forecast "
        style={!isLoading && validCity ? { display: "block" } : { display: "none" }}
      >
        <ul className="days">
          {/* TODAY */}
          <li
            onClick={() =>
              setActiveTab({
                day0: true,
                day1: false,
                day2: false,
              })
            }
          >
            <button
              className={activeTab.day0 ? "tab-is-active" : "tab-is-inactive"}
              onClick={() => filterByDay(0)}
            >
              <p>Today</p>
            </button>
          </li>

          {/* TOMORROW */}
          <li
            onClick={() =>
              setActiveTab({
                day0: false,
                day1: true,
                day2: false,
              })
            }
          >
            <button
              className={activeTab.day1 ? "tab-is-active" : "tab-is-inactive"}
              onClick={() => filterByDay(1)}
            >
              <p>
                <Moment format="dddd" add={{ days: 1 }}></Moment>
              </p>
            </button>
          </li>

          {/* AFTER TOMORROW */}
          <li
            onClick={() =>
              setActiveTab({
                day0: false,
                day1: false,
                day2: true,
              })
            }
          >
            <button
              className={activeTab.day2 ? "tab-is-active" : "tab-is-inactive"}
              onClick={() => filterByDay(2)}
            >
              <p>
                <Moment format="dddd" add={{ days: 2 }} />
              </p>
            </button>
          </li>
        </ul>
      </div>
      <Hours
        filteredDataByDay={filteredDataByDay}
        isLoading={isLoading}
        activeTab={activeTab}
        validCity={validCity}
      />
    </>
  );
}

Days.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  notValidCity: PropTypes.bool.isRequired,
  data: PropTypes.object,
  validCity: PropTypes.string,
};
