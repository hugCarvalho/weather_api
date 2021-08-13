import React from "react";
import { AirPressure, Humidity, RainValue } from "../DisplayWeatherStyles";

const WeatherDescription = ({ selectedTime }) => {
  return (
    <div id="weather-description" className="item item--7">
      {selectedTime.length > 0 ? (
        <>
          <span>{selectedTime[0].weather[0].description}</span>
          {selectedTime[0].rain && (
            <RainValue>({selectedTime[0].rain["3h"]}mm)</RainValue>
          )}
          <Humidity>Humidity - {selectedTime[0].main.humidity}%</Humidity>
          <AirPressure>Pressure - {selectedTime[0].main.pressure}mb</AirPressure>
        </>
      ) : (
        <span style={{ fontSize: "2.1rem" }}>n/a</span>
      )}
    </div>
  );
};

export { WeatherDescription };
