import React, { useState, useEffect, useReducer } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import InputSearchCity from "./components/InputSearchCity/InputSearchCity";
import DisplayErrorMsg from "./components/DisplayErrorMsg/DisplayErrorMsg";
import SavedCitiesMenu from "./components/SavedCitiesMenu/SavedCitiesMenu";
import DisplayCityName from "./components/DisplayCityName/DisplayCityName";
import { errorInit, errorReducer } from "./components/reducers";
import { InfoTabs } from "./components/InfoTabs/InfoTabs";

export const UserQueryContext = React.createContext();
export const ErrorContext = React.createContext();
export const IsNightContext = React.createContext();

function App() {
  const key = "f2b65d46e479364d7c9f2127abfcb2b4";
  const [userQuery, setUserQuery] = useState("");
  const [validCity, setValidCity] = useState(""); //is useful when searching for an invalid city if there's no city saved yet
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isNight, setIsNight] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [error, dispatch] = useReducer(errorReducer, errorInit);
  const [forecast3Days, setForecast3Days] = useState({}) 
 
  //FETCH DATA
  useEffect(() => {
    setIsLoading(true); //don't change
    console.log("FETCHED")
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
        dispatch({ type: "TRUE", value: data.message });
        if (data.message === "city not found") {
          setCityNotFound(true);
          setCityNotFound(false); //prevents error when selecting a dif day and typing a not valid name
        }
        setIsLoading(false);
      }
    };

    userQuery && getWeather().catch(() => {
        dispatch({ type: "TRUE", value: "Something went wrong..." });
      });
  }, [userQuery, key]);

  useEffect(() => {
    const currentDay = new Date().toString().slice(8,10)
    let today = []
    let tomorrow = []
    let afterTomorrow = []
    if (data) {
      data.weather.list.forEach((day, i) => {
          if (currentDay === day.dt_txt.slice(8,10)) {today.push(day) }
          if (Number(currentDay) + 1 == day.dt_txt.slice(8,10)) { tomorrow.push(day) }
          if (Number(currentDay) + 2 == day.dt_txt.slice(8,10)) { afterTomorrow.push(day) }
          return
        })
    }

    setForecast3Days({
      today,
      tomorrow,
      afterTomorrow
    })
  }, [data])

  useEffect(() => {
     console.log("F3DAYS", forecast3Days)
  }, [forecast3Days])

  // useEffect(() => {
  //   console.log("TODAY", today)
  //   console.log("TOM", tomorrow)
  // }, [today])
  // console.log("T", threeDays)
  return (
    <>
      <div
        className="container__app"
        style={isNight ? { background: "#202020" } : { background: "#7cafeb" }}
      >
        <Header />
        <ErrorContext.Provider value={{ error, dispatch }}>
          <UserQueryContext.Provider value={{ userQuery, setUserQuery }}>
            <InputSearchCity />
            <DisplayErrorMsg />
            <SavedCitiesMenu validCity={validCity} />
          </UserQueryContext.Provider>
        </ErrorContext.Provider>{" "}
        <DisplayCityName validCity={validCity} isLoading={isLoading} />
        <IsNightContext.Provider value={{ isNight, setIsNight }}>
          <InfoTabs
            data={data}
            isLoading={isLoading}
            validCity={validCity}
            cityNotFound={cityNotFound}
            forecast3Days={forecast3Days}
          >
          </InfoTabs>
        </IsNightContext.Provider>
      </div>
    </>
  );
}
export default App;
