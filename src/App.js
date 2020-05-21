import React, { useState, useEffect, useReducer } from "react";
import "./App.scss";
//import { keyAPI } from "./key";
import Header from "./components/Header/Header";
import InputSearchCity from "./components/InputSearchCity/InputSearchCity";
import DisplayErrorMsg from "./components/DisplayErrorMsg/DisplayErrorMsg";
import Days from "./components/Days/Days";
import SavedCitiesMenu from "./components/SavedCitiesMenu/SavedCitiesMenu";
import DisplayCityName from "./components/DisplayCityName/DisplayCityName";

//TESTIUNG
import { errorInit, errorReducer } from "./components/reducers";
export const ErrorContext = React.createContext();

export const IsLoadingContext = React.createContext();
export const CityContext = React.createContext();
export const ErrorMsgContext = React.createContext();
export const ShowErrorContext = React.createContext();
export const IsNightContext = React.createContext();

//TODO: check focus behaviour
//TODO: check hoover effect on cities fast track

function App() {
  const key = "82005d27a116c2880c8f0fcb866998a0";

  const [city, setCity] = useState("");
  const [validCity, setValidCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isNight, setIsNight] = useState(false);

  const [error, dispatch] = useReducer(errorReducer, errorInit);

  //FETCH DATA
  useEffect(() => {
    // console.log("1:", data);
    const getWeather = async () => {
      //console.log("GETWEATHER");
      let api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`; //CHANGE TO TEXT!!!!
      const response = await fetch(api);
      const data = await response.json();

      // setIsLoading(true);
      // console.log("DATAFROMFETCHING :", isLoading);
      if (data.cod === "200") {
        //console.log("FETCHEDDATA:", data);
        setData({
          weather: data,
        });
        setValidCity(city); //change to another place
        setIsLoading(false);
        // setTimeout(() => {
        //   console.log("ONE");
        // }, 100);
      } else {
        console.log("An Error ocurred:", data.message);
        dispatch({ type: "TRUE", value: data.message });
      }
    };
    setIsLoading(true);
    city &&
      getWeather().catch(() => {
        dispatch({ type: "TRUE", value: "Something went wrong..." });
      });
  }, [city, key]);

  useEffect(() => {
    console.log("isLoading:", isLoading);
  }, [isLoading]);

  return (
    <>
      <div
        className="container-app"
        style={isNight ? { background: "#202020" } : { background: "#7cafeb" }}
      >
        <Header />
        {/* {/* <DisplayOutput></DisplayOutput> organize components later */}
        <CityContext.Provider value={{ city, setCity }}>
          <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
            <ErrorContext.Provider value={{ error, dispatch }}>
              <InputSearchCity />
              <DisplayErrorMsg />
              <SavedCitiesMenu validCity={validCity} />
            </ErrorContext.Provider>{" "}
            <DisplayCityName validCity={validCity} />
            <IsNightContext.Provider value={{ isNight, setIsNight }}>
              <Days data={data} isLoading={isLoading} validCity={validCity} />
            </IsNightContext.Provider>
          </IsLoadingContext.Provider>
        </CityContext.Provider>
      </div>
    </>
  );
}
export default App;
