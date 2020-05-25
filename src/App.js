import React, { useState, useEffect, useReducer } from "react";
import "./App.scss";
//import { keyAPI } from "./key";
import Header from "./components/Header/Header";
import InputSearchCity from "./components/InputSearchCity/InputSearchCity";
import DisplayErrorMsg from "./components/DisplayErrorMsg/DisplayErrorMsg";
import SavedCitiesMenu from "./components/SavedCitiesMenu/SavedCitiesMenu";
import DisplayCityName from "./components/DisplayCityName/DisplayCityName";
import Days from "./components/Days/Days";
import { errorInit, errorReducer } from "./components/reducers";

export const IsLoadingContext = React.createContext();
export const UserQueryContext = React.createContext();
export const IsNightContext = React.createContext();
export const ErrorContext = React.createContext();

function App() {
  const key = "82005d27a116c2880c8f0fcb866998a0";
  const [userQuery, setUserQuery] = useState("");
  const [validCity, setValidCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isNight, setIsNight] = useState(false);
  const [notValidCity, setNotValidCity] = useState(false); //fixing error

  const [error, dispatch] = useReducer(errorReducer, errorInit);

  useEffect(() => {
    console.log("notValidCity from app:", notValidCity);
  }, [notValidCity]);

  //FETCH DATA
  useEffect(() => {
    setIsLoading(true); //don't comment out
    ////debugger;
    const getWeather = async () => {
      const api = `https://api.openweathermap.org/data/2.5/forecast?q=${userQuery}&appid=${key}`;
      const response = await fetch(api);
      const data = await response.json();

      if (data.cod === "200") {
        setData({
          weather: data,
        });
        //debugger;
        setValidCity(userQuery);
        setIsLoading(false);
        //debugger;
      } else {
        //debugger;
        dispatch({ type: "TRUE", value: data.message });
        if (data.message === "city not found") {
          // console.log(data.message);
          setNotValidCity(true);
          setNotValidCity(false); //prevents error when selecting a dif day and typing a not valid name
        }
        setIsLoading(false);
        //debugger;
      }
    };
    userQuery &&
      getWeather().catch(() => {
        dispatch({ type: "TRUE", value: "Something went wrong..." });
      });
  }, [userQuery, key]);

  return (
    <>
      <div
        className="container__app"
        style={isNight ? { background: "#202020" } : { background: "#7cafeb" }}
      >
        <Header />
        <UserQueryContext.Provider value={{ userQuery, setUserQuery }}>
          <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
            <ErrorContext.Provider value={{ error, dispatch }}>
              <InputSearchCity />
              <DisplayErrorMsg />
              <SavedCitiesMenu validCity={validCity} />
            </ErrorContext.Provider>{" "}
            <DisplayCityName validCity={validCity} isLoading={isLoading} />
            <IsNightContext.Provider value={{ isNight, setIsNight }}>
              <Days
                data={data}
                isLoading={isLoading}
                validCity={validCity}
                notValidCity={notValidCity}
              />
            </IsNightContext.Provider>
          </IsLoadingContext.Provider>
        </UserQueryContext.Provider>
      </div>
    </>
  );
}
export default App;
