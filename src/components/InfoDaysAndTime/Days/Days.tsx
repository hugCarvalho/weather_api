import React from "react";
import "./Days.scss";
import Moment from "react-moment";
import { days } from "../../../config/config";
import { DaysType } from "../../../config/types";

type DaysProps = {
  activeDay: DaysType
  setActiveDay: (day: DaysType) => DaysType
  isLoading: boolean
  validCity: "" | string
}

export const Days: React.FC<DaysProps> = ({ activeDay, setActiveDay }) => {

  return (
    <>
      <div className="container__days-forecast">
        <ul className="days">
          {days.map((day, i) => {
            return (
              <li key={i} onClick={() => setActiveDay(day)}>
                <button
                  className={activeDay === day ? "tab-is-active" : "tab-is-inactive"}>
                  {i === 0 ? "Today" : <Moment format="dddd" add={{ days: i }}></Moment>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
