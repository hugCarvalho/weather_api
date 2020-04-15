import React, { useState, useEffect } from "react";
import "./App.scss";

function App() {
  let city = "London";
  const key = "82005d27a116c2880c8f0fcb866998a0";
  const kelvin = 273;

  const [data, setData] = useState({});

  const getWeather = async () => {
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    const response = await fetch(api);
    const data = await response.json();
    return setData(data);
  };

  useEffect(() => {
    // getWeather();
  }, []);

  return (
    <>
      {console.log(data)}
      <div className="container-app">
        <li>Input where to search city </li>
        <li>
          Grid - Display City name + Date today + [tomorrow] + [aftertomorrow]
        </li>
        <li>Grid - Weather Info</li>
      </div>
    </>
  );
}

export default App;
