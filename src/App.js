import React, { useState, useEffect, useReducer } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import InputSearchCity from "./components/InputSearchCity/InputSearchCity";
import DisplayErrorMsg from "./components/DisplayErrorMsg/DisplayErrorMsg";
import SavedCitiesMenu from "./components/SavedCitiesMenu/SavedCitiesMenu";
import DisplayCityName from "./components/DisplayCityName/DisplayCityName";
import Days from "./components/Days/Days";
import { errorInit, errorReducer } from "./components/reducers";

export const UserQueryContext = React.createContext();
export const ErrorContext = React.createContext();
export const IsNightContext = React.createContext();

function App() {
  const key = "f2b65d46e479364d7c9f2127abfcb2b4";
  const [userQuery, setUserQuery] = useState("");
  const [validCity, setValidCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isNight, setIsNight] = useState(false);
  const [notValidCity, setNotValidCity] = useState(false);

  const [error, dispatch] = useReducer(errorReducer, errorInit);

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
        dispatch({ type: "TRUE", value: data.message });
        if (data.message === "city not found") {
          setNotValidCity(true);
          setNotValidCity(false); //prevents error when selecting a dif day and typing a not valid name
        }
        setIsLoading(false);
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
        <ErrorContext.Provider value={{ error, dispatch }}>
          <UserQueryContext.Provider value={{ userQuery, setUserQuery }}>
            <InputSearchCity />
            <DisplayErrorMsg />
            <SavedCitiesMenu validCity={validCity} />
          </UserQueryContext.Provider>
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
      </div>
    </>
  );
}
export default App;
