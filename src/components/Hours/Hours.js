import React, { useState, useEffect } from "react";
import "./Hours.scss";
import DisplayWeather from "../DisplayWeather/DisplayWeather";
// import { IsLoadingContext } from "../../App";

export default function Hours({ filteredData, isLoading }) {
  const [filData2, setFilData2] = useState({});
  let [defaultHour, setDefaultHour] = useState("");
  //const [selectedHour, setSelectedHour] = useState("");
  //let hour;
  //const isLoading = useContext(IsLoadingContext);

  // useEffect(() => {
  //   // console.log("USELAYOUT DAY:", filData2);
  // }, [filData2]);

  useEffect(() => {
    setFilData2(filteredData);
  }, [filteredData, isLoading, defaultHour]);

  useEffect(() => {
    if (!isLoading) {
      setDefaultHour(filteredData.weather.list[0].dt_txt.slice(11, 16));
      //console.log("IS NOT LOADING-SELECT HOUR", defaultHour);
    }
  }, [filData2, isLoading, filteredData]);
  useEffect(() => {
    console.log("defaultHour", defaultHour);
  }, [defaultHour]);

  const filterByHour = e => {
    const timeOnButton = e.target.textContent;
    const prevHour = document.querySelector(".active-hour");
    const actualHour = e.target;

    console.log("1- prevHour", prevHour, "actualHour:", actualHour);
    const activeHour = filteredData.weather.list.filter(item => {
      return item.dt_txt.slice(11, 16) === timeOnButton;
    });
    setFilData2({
      weather: {
        list: activeHour,
      },
    });
    prevHour.classList.remove("active-hour");
    actualHour.classList.add("active-hour");
    console.log("2- prevHour", prevHour, "actualHour:", actualHour);
  };

  return (
    <>
      <div className="container__hours">
        {!isLoading &&
          filteredData.weather.list.map((item, i) => {
            let classes = [
              defaultHour === item.dt_txt.slice(11, 16) ? "active-hour" : null,
              `item--${i + 1}`,
            ];
            return (
              <button
                className={classes.join(" ")}
                onClick={e => filterByHour(e)}
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
