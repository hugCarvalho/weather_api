import React, { useState, useContext } from "react";
import "./SearchCity.scss";
import { ErrorContext, UserQueryContext } from "../../App";

export default function InputSearchCity() {
  const { setUserQuery } = useContext(UserQueryContext);
  const { dispatchError } = useContext(ErrorContext);
  const [text, setText] = useState("");

  const checkInputIsValid = e => {
    //don't use setIsLoading. Allows for rerender on city not found
    e.preventDefault();
    if (text) {
      setUserQuery(text);
    } else {
      dispatchError({ type: "TRUE", value: "Please type something" });
    }
  };

  return (
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
  );
}
