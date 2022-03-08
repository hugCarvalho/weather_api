import React, { useState, useEffect, useReducer} from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import InputSearchCity from "./components/SearchCity/SearchCity";
import DisplayErrorMsg from "./components/DisplayErrorMsg/DisplayErrorMsg";
import SavedCitiesMenu from "./components/SavedCitiesMenu/SavedCitiesMenu";
import DisplayCityName from "./components/DisplayCityName/DisplayCityName";
import { errorInit, errorReducer } from "./components/reducers";
import { InfoDaysAndTime } from "./components/InfoDaysAndTime/InfoDaysAndTime";
import { ClimbingBoxLoader } from "react-spinners";

export const UserQueryContext = React.createContext();
export const ErrorContext = React.createContext();
export const IsNightContext = React.createContext();

//TODO: move optionsConfig and split types props
function App() {
  const key = "f2b65d46e479364d7c9f2127abfcb2b4";
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [userQuery, setUserQuery] = useState("");
  const [validCity, setValidCity] = useState(""); //is useful when searching for an invalid city if there's no city saved yet
  const [isNight, setIsNight] = useState(false);
  const [error, dispatchError] = useReducer(errorReducer, errorInit);
  const [forecast3Days, setForecast3Days] = useState({});

  //FETCH DATA
  useEffect(() => {
    setIsLoading(true); //don't change
    const getWeather = async () => {
      const api = `https://api.openweathermap.org/data/2.5/forecast?q=${userQuery}&appid=${key}`;
      const response = await fetch(api);
      const data = await response.json();
      if (data.cod === "200") {
        setData({
          weather: data,
        });
        setValidCity(userQuery);
        setIsLoading(false);
      } else {
        dispatchError({ type: "TRUE", value: data.message });
        setIsLoading(false);
      }
    };

    userQuery &&
      getWeather().catch(e => {
        dispatchError({ type: "TRUE", value: "Something went wrong..." });
      });
  }, [userQuery, key]);

  //sets forecast for 3 days
  useEffect(() => {
    let today = [];
    let tomorrow = [];
    let afterTomorrow = [];
    let dayIs = null;
    let control = 0;

    if (data) {
      data.weather.list.forEach((dayObj, i) => {
        const day = +dayObj.dt_txt.slice(8, 10);
        if (i === 0) {
          dayIs = day;
          control += 1;
        }
        if (dayIs !== day) {
          dayIs = day;
          control += 1;
        }
        if (control === 1) {
          today.push(dayObj);
          return;
        }
        if (control === 2) {
          tomorrow.push(dayObj);
          return;
        }
        if (control === 3) {
          afterTomorrow.push(dayObj);
          return;
        }
        return;
      });
    }
    setForecast3Days({
      today,
      tomorrow,
      afterTomorrow,
    });
  }, [data]);

  return (
    <>
      <div
        className="container__app"
        style={isNight ? { background: "#202020" } : { background: "#7cafeb" }}
      >
        <Header />
        <ErrorContext.Provider value={{ error, dispatchError }}>
          <UserQueryContext.Provider value={{ userQuery, setUserQuery }}>
            <InputSearchCity />
            <DisplayErrorMsg />
            <SavedCitiesMenu validCity={validCity} />
          </UserQueryContext.Provider>
        </ErrorContext.Provider>{" "}
        <DisplayCityName validCity={validCity} isLoading={isLoading} />
        <IsNightContext.Provider value={{ isNight, setIsNight }}>
          <InfoDaysAndTime
            data={data}
            isLoading={isLoading}
            validCity={validCity}
            forecast3Days={forecast3Days}
          />
        </IsNightContext.Provider>
      </div>
    </>
  );
}
export default App;
