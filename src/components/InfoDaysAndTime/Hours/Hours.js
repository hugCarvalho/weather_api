import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// eslint-disable-next-line no-unused-vars
const x = React
export default function Hours({
  selectedTime,
  setSelectedTime,
  isLoading,
  activeDay,
  validCity,
  forecast3Days,
}) {
  const [activeHour, setActiveHour] = useState("12:00");

  useEffect(() => {
    if (!isLoading && validCity) {
      const filteredBySelectedHour = forecast3Days[activeDay].filter(hour => {
        return hour.dt_txt.slice(11, 16) === activeHour;
      });
      setSelectedTime(filteredBySelectedHour);
    }
  }, [setSelectedTime, forecast3Days, isLoading, validCity, activeHour, activeDay]);

  useEffect(() => {
    if (validCity && !isLoading && activeDay === "today") {
      setActiveHour(forecast3Days[activeDay][0]?.dt_txt.slice(11, 16));
    }
    if (validCity && !isLoading && activeDay !== "today") {
      setActiveHour("12:00");
    }
  }, [isLoading, validCity, activeDay, forecast3Days]);

  return (
    <Container>
      {!isLoading &&
        validCity &&
        selectedTime.length > 0 &&
        forecast3Days[activeDay].map((day, i) => {
          const hour = day.dt_txt.slice(11, 16);
          return (
            <HourButton
              key={i}
              isActive={activeHour === hour}
              onClick={() => setActiveHour(hour)}>
              {hour}
            </HourButton>
          );
        })}
    </Container>
  );
}

Hours.propTypes = {
  validCity: PropTypes.string,
  isLoading: PropTypes.bool,
  activeDay: PropTypes.string,
  selectedTime: PropTypes.array,
  setSelectedTime: PropTypes.func,
  forecast3Days: PropTypes.object,
};

// ---------------- Styled Components ----------------

// Colors formerly from App.scss
const grayDark = "#423f3f";
// const mainBlue = "#1e90ff";

const Container = styled.div`
  background-color: ${grayDark};
  width: 100%;
  min-height: 35px;
  padding: 5px 6px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scroll-behavior: smooth;

    justify-content: center;    /* centers when content width < container */
  align-items: center;
  flex-wrap: nowrap;          /* IMPORTANT — prevent wrapping */
  overflow-x: auto;          /* enable horizontal scroll when overflow */
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  /* Optional: slimmer scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.12);
    border-radius: 3px;
  }




  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }

  @media (min-width: 768px) {
    min-height: 47.6px;
  }
`;

const HourButton = styled.button`
  background-color: ${grayDark};
  color: ${({ isActive }) => (isActive ? "yellow" : "#b3b3b3")};
  width: 5.1rem;
  padding: 4px 3px;
  margin: 1px;
  font-size: 1.7rem;
  font-family: "digital-7regular", monospace;
  border: none;
  border-radius: 4px;
  outline: none;
  /* flex: 0 0 auto; */
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  transition: color 0.2s ease;

  &:hover,
  &:focus {
    color: yellow;
  }

  @media (min-width: 768px) {
    width: 9.1rem;
    padding: 7px 0;
    font-size: 2.4rem;
  }
`;
