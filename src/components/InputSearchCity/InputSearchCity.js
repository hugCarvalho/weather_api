import React, { useState, useContext } from "react";
import "./InputSearchCity.scss";
import {
  IsLoadingContext,
  CityContext,
  ErrorMsgContext,
  ShowErrorContext,
} from "../../App";

//TODO: prevent n/a display if city already is displayed and new city is not found

export default function InputSearchCity() {
  const [text, setText] = useState("");
  const { setIsLoading } = useContext(IsLoadingContext);
  const { setCity } = useContext(CityContext);
  const { setErrorMsg } = useContext(ErrorMsgContext);
  const { setShowError } = useContext(ShowErrorContext);

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
    } else {
      setErrorMsg("Please type something");
      setShowError(true);
      console.log("Please type something"); //TODO USEREDUCER
    }
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
