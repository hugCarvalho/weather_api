import React, { useState, useEffect } from "react";
import "./App.scss";
import { keyAPI } from "./key";
import Header from "./components/Header/Header";
import InputSearchCity from "./components/InputSearchCity/InputSearchCity";
import DisplayErrorMsg from "./components/DisplayErrorMsg/DisplayErrorMsg";
import Days from "./components/Days/Days";
import SavedCitiesMenu from "./components/SavedCitiesMenu/SavedCitiesMenu";

export const IsLoadingContext = React.createContext();
export const CityContext = React.createContext();
export const ErrorMsgContext = React.createContext();
export const ShowErrorContext = React.createContext();

function App() {
  const key = keyAPI;
  // prettier-ignore
  const [city, setCity] = useState("");
  const [validCity, setValidCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  //Join them?!
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    error: "",
    errorSavedCities: "",
    errorLocalStorage: "",
  });

  //FETCH DATA
  useEffect(() => {
    const getWeather = async () => {
      //console.log("GETWEATHER");
      // let api = `http://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${key}`;
      let api = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`; //CHANGE TO TEXT!!!!
      const response = await fetch(api);
      const data = await response.json();

      // console.log("DATAFROMFETCHING :", isLoading);
      if (data.cod === "200") {
        console.log("FETCHEDDATA:", data);
        setData({
          weather: data,
        });
        setValidCity(city);
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      } else {
        setErrorMsg({ error: data.message });
        setShowError(true);
      }
    };
    city &&
      getWeather().catch(() => {
        setErrorMsg({ error: "Something went wrong..." });
        setShowError(true);
      });
  }, [isLoading, city, key]);

  useEffect(() => {
    console.log("Effect 2 -> IS Loading:", isLoading, city);
    console.log("----------------------------");
  }, [isLoading, city]);

  return (
    <>
      <Header />
      <div className="container-app">
        {/* SAVED CITIES */}
        {/* END of chosen city + forecast */}
        <CityContext.Provider value={{ city, setCity }}>
          <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
            <ErrorMsgContext.Provider value={{ errorMsg, setErrorMsg }}>
              <ShowErrorContext.Provider value={{ showError, setShowError }}>
                <InputSearchCity />
                <DisplayErrorMsg showError={showError} errorMsg={errorMsg} />
                <SavedCitiesMenu validCity={validCity} />
                <Days data={data} isLoading={isLoading} />
              </ShowErrorContext.Provider>
            </ErrorMsgContext.Provider>
          </IsLoadingContext.Provider>
        </CityContext.Provider>
      </div>
    </>
  );
}
export default App;
