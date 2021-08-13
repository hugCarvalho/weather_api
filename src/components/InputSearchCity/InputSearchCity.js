import React, { useState, useContext } from "react";
import "./InputSearchCity.scss";
import { ErrorContext, UserQueryContext } from "../../App";

export default function InputSearchCity() {
  const { setUserQuery } = useContext(UserQueryContext);
  const { dispatch } = useContext(ErrorContext);

  const [text, setText] = useState("");

  //VALIDATION
  const checkInputIsValid = e => {
    //don't use setIsLoading. Allows for rerender on city not found
    e.preventDefault();
    if (text) {
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
            name="searchCity"
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
