import React, { useState, useContext } from "react";
import "./InputSearchCity.scss";
import { IsLoadingContext, CityContext } from "../../App";

export default function InputSearchCity() {
  const [text, setText] = useState("");
  const { setIsLoading } = useContext(IsLoadingContext);
  const { setCity } = useContext(CityContext);

  const fetchCity = () => {
    setIsLoading(true);
    setCity(text);
  };

  //VALIDATION
  const checkInputIsValid = e => {
    e.preventDefault();
    console.log("text:", text);
    if (text) {
      fetchCity();
    } else console.log("Please type something"); //TODO ERROR
  };

  return (
    <>
      <div className="container__search-city">
        <form onSubmit={checkInputIsValid}>
          <input
            type="search"
            placeholder="type a city name..."
            onChange={e => setText(e.target.value)}
          />
          <button type="submit">Go</button>
        </form>
      </div>
    </>
  );
}
