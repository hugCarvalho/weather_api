import React from "react";
import "./HourlyWeather.scss";

export default function HourlyWeather({ data, city }) {
  console.log("DATA:", data, city);
  let currentDay;

  const renderHoursDOM = day => {
    const res = data.data.list.filter(item => {
      const forecastDay = item.dt_txt.slice(8, 10);
      const intendedDay = String(new Date().getDate() + day);
      return forecastDay === intendedDay;
    });
    currentDay = res;
    console.log("RENEDR HOUR ", res);
    return res.map((item, i) => (
      <li key={i} className={`item item--1 id${1}`}>
        {item.dt_txt.slice(11, 16)}
      </li>
    ));
  };

  const [hourChosen, setHourChosen] = [];
  const runFunction = e => {
    console.log(currentDay);
    const hour = currentDay.filter(item => {
      const forecastHour = item.dt_txt.slice(11, 15);
      const intendedHour = e.target.textContent;
      console.log("forecastHour, intendedHour", forecastHour, intendedHour);
      return forecastHour === intendedHour;
    });
    setHourChosen(hour);
  };

  return (
    <>
      <div className="container">
        {/* <div className="item item--1">03:00</div> */}
        {city && renderHoursDOM(0)}
        {/* <div className="item item--2">06:00</div>
        <div className="item item--3">06:00</div>
        <div className="item item--4">06:00</div>
        <div className="item item--5">06:00</div>
        <div className="item item--6">06:00</div>
        <div className="item item--7">7 </div>
        <div className="item item--8">8 </div>
        <div className="item item--9">9 </div>
        <div className="item item--10">10</div>
       <div className="item item--11">11</div> */}
        <p className="item item--11">
          <button onClick={e => runFunction(e)} className="test">
            18:00
          </button>
          11
        </p>
      </div>
      {console.log(document.querySelector(".test"))}
    </>
  );
}
