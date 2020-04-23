import React from "react";
import "./HourlyWeather.scss";

export default function HourlyWeather({ data, city }) {
  const x = data;
  console.log("DATA:", x, city);
  const dayToday = null;
  const dayTomorrow = null;
  const dayAfterTomorrow = null;

  const renderHours = day => {
    const filter = data.data.list.filter(item => {
      const actualDay = item.dt_txt.slice(8, 10);
      const matchingDay = String(new Date().getDate() + day);
      //dateData = item.dt_txt.slice(11, 16);

      // console.log(
      //   "actualDay,matchingDay, dateData",
      //   actualDay,
      //   matchingDay,
      //   dateData
      // );
      // console.log("actualDay === matchingDay", actualDay === matchingDay);

      return actualDay === matchingDay;
      //   return <div className="item item--1">{dateData}</div>;
      // }
      // return actualDay === matchingDay ? (
      //   <div className="item item--1">{dateData}</div>
      // ) : null;
    });
    console.log("FILTER", filter);
    return filter.map(item => (
      <div className={`item item--${1}`}>{item.dt_txt.slice(11, 16)}</div>
    ));
  };

  return (
    <>
      <div class="container">
        {/* <div className="item item--1">03:00</div> */}
        {city && renderHours(1)}
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
      </div>
    </>
  );
}
