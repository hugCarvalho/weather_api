import React, { useState, useEffect } from "react";
import "./Hours.scss";
import DisplayWeather from "../DisplayWeather/DisplayWeather";
// import { IsLoadingContext } from "../../App";

export default function Hours({ filteredData, isLoading }) {
  const [filData2, setFilData2] = useState({});
  let [defaultHour, setDefaultHour] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  let hour;
  //const isLoading = useContext(IsLoadingContext);

  // useEffect(() => {
  //   // console.log("USELAYOUT DAY:", filData2);
  // }, [filData2]);

  useEffect(() => {
    //console.log("object");
    setFilData2(filteredData);

    //setSelectedHour(filteredData);
    //console.log("filteredData", defaultHour, isLoading);
  }, [filteredData, isLoading, defaultHour]);

  useEffect(() => {
    //console.log("222222");
    if (!isLoading) {
      setDefaultHour(filteredData.weather.list[0].dt_txt.slice(11, 16));
      //console.log("IS NOT LOADING-SELECT HOUR", defaultHour);
    }
  }, [filData2, isLoading]);

  // useEffect(() => {
  //   //console.log("DATA2:", filData2);
  // }, [filterByHour]);

  const filterByHour = e => {
    const timeOnButton = e.target.textContent;
    let prevHour = document.querySelector(".active-hour");
    console.log(prevHour);

    hour = e.target;
    setSelectedHour(e.target);
    console.log("hour1:", hour, "REACT1:", selectedHour);

    const activeHour = filteredData.weather.list.filter(item => {
      //console.log(timeOnButton);
      return item.dt_txt.slice(11, 16) === timeOnButton;
    });
    setFilData2({
      weather: {
        list: activeHour,
      },
    });
    //e.target.style.color = "green";

    prevHour.classList.remove("active-hour");
    e.target.classList.add("active-hour");
    console.log("hour2:", hour, "REACT2:", selectedHour);
    // makeActive(timeOnButton)
    //console.log("e.target", e.target, "HOUR:", selectedHour);
    //console.log("AAAAAAAA", activeHour);
  };
  // const makeActive = timeOnButton => {
  //   const timeOnButton = e.target.textContent;
  //   console.log("timeOnButton", timeOnButton);
  // };

  return (
    <>
      <div className="container__hours">
        {!isLoading &&
          filteredData.weather.list.map((item, i) => {
            //console.log(selectedHour); //=== item.dt_txt.slice(11, 16));
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
