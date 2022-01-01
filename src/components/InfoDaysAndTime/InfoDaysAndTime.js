import React from "react";
import DisplayWeather from "../DisplayWeather/DisplayWeather";
import Days from "./Days/Days";
import Hours from "./Hours/Hours";
import { MaxMinTempDisplay } from "../Notifications/MaxMinTempDisplay";
import { AlarmNotifications } from "../Notifications/Notifications";

const InfoDaysAndTime = ({ data, isLoading, cityNotFound, validCity, forecast3Days }) => {
  const [activeDay, setActiveDay] = React.useState("today");
  const [selectedTime, setSelectedTime] = React.useState({});

  React.useEffect(() => {
    setActiveDay("today");
  }, [validCity]); //will reset the active tab after a request about a new city

  return (
    <>
      <MaxMinTempDisplay forecast3Days={forecast3Days} activeDay={activeDay} />
      <AlarmNotifications forecast3Days={forecast3Days} activeDay={activeDay} />

      <Days
        data={data}
        isLoading={isLoading}
        validCity={validCity}
        cityNotFound={cityNotFound}
        forecast3Days={forecast3Days}
        activeDay={activeDay}
        setActiveDay={setActiveDay}
      />
      <Hours
        isLoading={isLoading}
        activeDay={activeDay}
        validCity={validCity}
        forecast3Days={forecast3Days}
        setSelectedTime={setSelectedTime}
        selectedTime={selectedTime}
      />
      <DisplayWeather
        selectedTime={selectedTime}
        validCity={validCity}
        isLoading={isLoading}
      />
    </>
  );
};

export { InfoDaysAndTime };
