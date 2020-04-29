import React, { useState, useEffect } from "react";
import "./Hours.scss";
import DisplayWeather from "../DisplayWeather/DisplayWeather";
// import { IsLoadingContext } from "../../App";

export default function Hours({ filteredData, isLoading }) {
  const [filData2, setFilData2] = useState({});
  //const isLoading = useContext(IsLoadingContext);

  useEffect(() => {
    // console.log("USELAYOUT DAY:", filData2);
  }, [filData2]);

  useEffect(() => {
    setFilData2(filteredData);
    // console.log("filteredData", filteredData, isLoading);
  }, [filteredData, isLoading]);

  // useEffect(() => {
  //   //console.log("DATA2:", filData2);
  // }, [filterByHour]);

  const filterByHour = e => {
    const timeOnButton = e.target.textContent;

    const res = filteredData.weather.list.filter(
      item => item.dt_txt.slice(11, 16) === timeOnButton
    );
    setFilData2({
      weather: {
        list: res,
      },
    });
    console.log(res);
  };
  // console.log("isLoading:", isLoading);
  // console.log("filteredData", filteredData);
  return (
    <div>
      {!isLoading &&
        filteredData.weather.list.map((item, i) => {
          return (
            <button onClick={e => filterByHour(e)} key={i}>
              {item.dt_txt.slice(11, 16)}
            </button>
          );
        })}
      <DisplayWeather filData2={filData2} />
    </div>
  );
}
