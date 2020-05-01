import React, { useState, useContext } from "react";
import "./InputSearchCity.scss";
import { IsLoadingContext, CityContext } from "../../App";

export default function InputSearchCity() {
  const [text, setText] = useState("");
  const { setIsLoading } = useContext(IsLoadingContext);
  const { setCity } = useContext(CityContext);

  const fetchCity = e => {
    //console.log("USER INPUT");
    e.preventDefault();
    setIsLoading(true);
    setCity(text);
  };

  return (
    <>
      <div className="container__search-city">
        <form onSubmit={e => fetchCity(e)}>
          <input
            type="search"
            placeholder="type a city..."
            onChange={e => setText(e.target.value)}
          />
          <button type="submit">Go</button>
        </form>
      </div>
    </>
  );
}
