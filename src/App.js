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

function App() {
  const key = "82005d27a116c2880c8f0fcb866998a0";
  // prettier-ignore
  const [city, setCity] = useState("");
  const [validCity, setValidCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

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
      let api = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`; //CHANGE TO TEXT!!!!
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
        console.log("Error", data.message);
        setErrorMsg(data.message);
        setShowError(true);
        setIsLoading(false);
      }
    };
    city &&
      getWeather().catch(() => {
        setErrorMsg({ error: "Something went wrong..." });
        setShowError(true);
      });
  }, [isLoading, city, key]);

  // useEffect(() => {
  //   console.log("----------------------------");
  // }, [city]);

  return (
    <>
      <div className="container-app">
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
                <Days data={data} isLoading={isLoading} validCity={validCity} />
              </ShowErrorContext.Provider>
            </ErrorMsgContext.Provider>
          </IsLoadingContext.Provider>
        </CityContext.Provider>
      </div>
    </>
  );
}
export default App;
