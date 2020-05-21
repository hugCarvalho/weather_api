import React, { useState, useContext } from "react";
import "./InputSearchCity.scss";
import {
  IsLoadingContext,
  CityContext,
  ErrorContext,
  UserQueryContext,
} from "../../App";

//TODO: prevent n/a display if city already is displayed and new city is not found

export default function InputSearchCity() {
  const { setUserQuery } = useContext(UserQueryContext);

  const [text, setText] = useState("");
  const { setIsLoading } = useContext(IsLoadingContext);
  const { setCity } = useContext(CityContext);
  const { dispatch } = useContext(ErrorContext);

  // const fetchCity = () => {
  //   setIsLoading(true);
  //   setCity(text);
  // };

  //VALIDATION
  const checkInputIsValid = e => {
    e.preventDefault();
    if (text) {
      //      fetchCity();
      setUserQuery(text);
    } else {
      dispatch({ type: "TRUE", value: "Please type something" });
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
            id="input-search-city"
          />
          <button type="submit">Go</button>
        </form>
      </div>
    </>
  );
}
