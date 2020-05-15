import React, { useState, useEffect } from "react";
import "./App.scss";
//import { keyAPI } from "./key";
import Header from "./components/Header/Header";
import InputSearchCity from "./components/InputSearchCity/InputSearchCity";
import DisplayErrorMsg from "./components/DisplayErrorMsg/DisplayErrorMsg";
import Days from "./components/Days/Days";
import SavedCitiesMenu from "./components/SavedCitiesMenu/SavedCitiesMenu";
import DisplayCityName from "./components/DisplayCityName/DisplayCityName";

export const IsLoadingContext = React.createContext();
export const CityContext = React.createContext();
export const ErrorMsgContext = React.createContext();
export const ShowErrorContext = React.createContext();
export const IsNightContext = React.createContext();

//TODO: check focus behaviour
//TODO!!!: check bug when choosing a city in fast track after displaying a dif day
//TODO: check hoover effect on cities fast track

function App() {
  const key = "82005d27a116c2880c8f0fcb866998a0";
  // prettier-ignore
  const [city, setCity] = useState("");
  const [validCity, setValidCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [isNight, setIsNight] = useState(false);

  //Join them?!
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  //TESTING EFFECTS
  useEffect(() => {
    //console.log("1- city:", city, "validCity:", validCity);
  }, [city, validCity]);

  //FETCH DATA
  useEffect(() => {
    console.log("1:", data);
    const getWeather = async () => {
      console.log("GETWEATHER");
      // let api = `http://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${key}`;
      let api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`; //CHANGE TO TEXT!!!!
      const response = await fetch(api);
      const data = await response.json();

      // console.log("DATAFROMFETCHING :", isLoading);
      if (data.cod === "200") {
        //console.log("FETCHEDDATA:", data);
        setData({
          weather: data,
        });
        setValidCity(city);
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      } else {
        console.log("An Error ocurred:", data.message);
        setErrorMsg(data.message);
        setShowError(true);
      }
    };
    city &&
      getWeather().catch(() => {
        setErrorMsg("Something went wrong...");
        setShowError(true);
      });
  }, [isLoading, city, key]);

  window.addEventListener(
    "unhandledrejection",
    alert("An error has ocurred, please reload ")
  );

  return (
    <>
      <div
        className="container-app"
        style={isNight ? { background: "#202020" } : { background: "#7cafeb" }}
      >
        <Header />
        {/* <DisplayOutput></DisplayOutput> organize components later */}
        <CityContext.Provider value={{ city, setCity }}>
          <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
            <ErrorMsgContext.Provider value={{ errorMsg, setErrorMsg }}>
              <ShowErrorContext.Provider value={{ showError, setShowError }}>
                <InputSearchCity />
                <DisplayErrorMsg showError={showError} errorMsg={errorMsg} />
                <SavedCitiesMenu validCity={validCity} />
                <DisplayCityName validCity={validCity} />
                <IsNightContext.Provider value={{ isNight, setIsNight }}>
                  <Days
                    data={data}
                    isLoading={isLoading}
                    validCity={validCity}
                  />
                </IsNightContext.Provider>
              </ShowErrorContext.Provider>
            </ErrorMsgContext.Provider>
          </IsLoadingContext.Provider>
        </CityContext.Provider>
      </div>
    </>
  );
}
export default App;
