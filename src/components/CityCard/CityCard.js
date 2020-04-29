import React, { useContext, useState, useEffect } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import { WeatherDataContext } from "../../App";
import "./CityCard.scss";
import Moment from "react-moment";
// import WeatherCard from "../WeatherCard/WeatherCard";
import HourlyWeather from "../HourlyWeather/HourlyWeather";

export default function CityCard({ city, isLoading, data, automaticRender }) {
  // let initDayToDisplay = data.render.list[0].dt_txt.slice(8, 10);
  // const [dayToDisplay, setDayToDisplay] = useContext(initDayToDisplay);
  //TESTING
  const [renderedWeatherData, setRenderedWeatherData] = useState();
  const [firstLoadFinished, setFirstLoadFinished] = useState(false);

  const getWeatherForSpecificDay = day => {
    const clonedObj = { ...data };
    //console.log("GETWEATHERSPECIFICDAY", data);
    const currentDay = Number(clonedObj.weather.list[0].dt_txt.slice(8, 10));
    const specifiedForecastDay = currentDay + day;

    const res = clonedObj.weather.list.filter(item => {
      return +item.dt_txt.slice(8, 10) === specifiedForecastDay;
    });
    setRenderedWeatherData(() => res);
    //console.log("RES:", res);
    //created firstLoadFinished to avoid rendering infinite loop
    setFirstLoadFinished(false);
  };

  const getWeatherOnFetching = day => {
    const clonedObj = { ...data };
    //console.log("GETWEATHERSPECIFICDAY", data);
    const currentDay = Number(clonedObj.weather.list[0].dt_txt.slice(8, 10));
    const specifiedForecastDay = currentDay + day;

    const res = clonedObj.weather.list.filter(item => {
      return +item.dt_txt.slice(8, 10) === specifiedForecastDay;
    });
    setRenderedWeatherData(res);
    //console.log("RES:", res);
    //created firstLoadFinished to avoid rendering infinite loop
    setFirstLoadFinished(true);
  };

  return (
    <>
      {/* {console.log("LOADFINISHED?:", firstLoadFinished)} */}
      {/* {!isLoading
        ? console.log("HEEEEERE:", isLoading, data.weather.list[0])
        : null} */}
      {/* {console.log(
        "IS LOADING:",
        //automaticRender,
        isLoading,
        "AUTO:",
        automaticRender,
        "FIRST:",
        firstLoadFinished
      )} */}

      {!isLoading && !firstLoadFinished //&& currentArray.length === 0
        ? getWeatherOnFetching(0)
        : null}

      <div className="container__city-forecast">
        {/* {city ? (
          <h1>{data.weather.city.name}</h1>
        ) : (
          <h4>Search for a city or set a default city to get started</h4>
        )} */}
        <ul>
          <li className="current">
            {/* // prettier-ignore */}
            <button onClick={() => getWeatherForSpecificDay(0)}>Current</button>
          </li>
          <li onClick={() => getWeatherForSpecificDay(1)} className="tomorrow">
            Tomorrow
            {/* <Moment format="DD/MM/YYYY">{dateTesting}</Moment> */}
          </li>
          {/* // prettier-ignore */}
          <li
            className="after-current"
            onClick={() => getWeatherForSpecificDay(2)}
          >
            After Tomorrow
          </li>
        </ul>
      </div>
      <WeatherCard
        isLoading={isLoading}
        //data={data}
        renderedWeatherData={renderedWeatherData}
      />
    </>
  );
}

// {/* <HourlyWeather dayNeeded={currentArray} isLoading={isLoading} /> */}

// {/* HOURLY WEATHER COMPONENT */}
// {/* <div className="container">
//   {/* <div className="item item--1">03:00</div> }
//   {city && renderHoursDOM(0)}
//   <p className="item item--11">
//     <button onClick={e => runFunction(e)} className="test">
//       18:00
//     </button>
//   </p>
//</div> */}
