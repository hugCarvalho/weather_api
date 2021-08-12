import React from "react"
import { AirPressure, Humidity, RainValue } from "../DisplayWeatherStyles";

const WeatherDescription = ({  data }) => {
  return <div id="weather-description" className="item item--7">
    {
      data.length > 0 ? <>
        <span>
          {data[0].weather[0].description}
        </span>
        {data[0].rain && <RainValue>
          ({data[0].rain["3h"]}mm)
        </RainValue>}
        <Humidity>
          Humidity - {data[0].main.humidity}%
        </Humidity>
        <AirPressure>
          Pressure - {data[0].main.pressure}mb
        </AirPressure>
        </>
      : "n/a"
    }
  </div>
}

export {WeatherDescription}