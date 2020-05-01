import React from "react";

export default function RadioInput({ value, runFn, value2, id }) {
  return (
    <>
      <input
        type="radio"
        id={id}
        //name="cities"
        value={value}
        onChange={
          //only allows action if a city is saved already
          value ? e => runFn(e.target.value) : () => {} //React shows warning if null is chosen
        }
        checked={value === value2}
      />
      <label htmlFor={id}></label>
    </>
  );
}
