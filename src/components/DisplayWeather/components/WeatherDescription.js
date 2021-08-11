import React from "react"
import { AirPressure, Humidity, RainValue } from "../DisplayWeatherStyles";

const WeatherDescription = ({validCity, isLoading, data}) => {
  return <div id="weather-description" className="item item--7">
    {
      validCity && !isLoading && data.weather.list[0].weather[0] ? <>
        <span>
          {data.weather.list[0].weather[0].description}
        </span>
        {data.weather.list[0].rain && <RainValue>
          ({data.weather.list[0].rain["3h"]}mm)
        </RainValue>}
        <Humidity>
          Humidity - {data.weather.list[0].main.humidity}%
        </Humidity>
        <AirPressure>
          Pressure - {data.weather.list[0].main.pressure}mb
        </AirPressure>
        </>
      : "n/a"
    }
  </div>
}

export {WeatherDescription}