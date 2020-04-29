// import React, { useState } from "react";
// import "./HourlyWeather.scss";
// import WeatherCard from "../WeatherCard/WeatherCard";

// export default function HourlyWeather({
//   data,
//   city,
//   dayNeeded,
//   isLoading,
//   // currentArray,
// }) {
//   //console.log("DATA:", data, city);

//   const renderHoursDOM = day => {
//     const res = data.weather.list.filter(item => {
//       const forecastDay = item.dt_txt.slice(8, 10);
//       const intendedDay = String(new Date().getDate() + day);
//       console.log(forecastDay, intendedDay);
//       return forecastDay === intendedDay;
//     });
//     currentDay = res; //change
//     console.log("RENDERED HOUR ", res);
//     return res.map((item, i) => (
//       <li
//         key={i}
//         className={`item item--1 id${1}`}
//         onClick={e => runFunction(e, day)}
//       >
//         {item.dt_txt.slice(11, 16)}
//       </li>
//     ));
//   };

//   const runFunction = e => {
//     const intendedHour = e.target.textContent;
//     const res = dayNeeded.filter(item => {
//       return item.dt_txt.slice(11, 16) === intendedHour;
//     });

//     console.log(res);
//   };

//   return (
//     <>
//       {/* {console.log("HourlyWeather:", dayNeeded)} */}
//       {isLoading
//         ? null
//         : dayNeeded.map((item, i) => (
//             <li
//               key={i}
//               className={`item item--1 id${1}`}
//               onClick={e => runFunction(e)}
//             >
//               {item.dt_txt.slice(11, 16)}
//             </li>
//           ))}

//       <WeatherCard
//         isLoading={isLoading}
//         // currentArray={currentArray}
//         dayNeeded={dayNeeded}
//       />
//     </>
//   );
// }

// setDayNeeded;
//console.log(currentDay);
// const hour = currentDay.filter(item => {
//   const forecastHour = item.dt_txt.slice(11, 16);
//   const intendedHour = e.target.textContent;
//   console.log("forecastHour, intendedHour", forecastHour, intendedHour);
//   return forecastHour === intendedHour;
// });
// console.log(hour);
// return hour;

/* <div className="container">
        {/* <div className="item item--1">03:00</div> }
        {city && renderHoursDOM(0)}
        <p className="item item--11">
          <button onClick={e => runFunction(e)} className="test">
            18:00
          </button>
        </p>
      </div>
 */
