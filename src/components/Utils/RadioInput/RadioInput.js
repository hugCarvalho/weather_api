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
          //value ? e => runFn(e.target.value) : () => {} //React shows warning if null is chosen
          e => runFn(e.target.value)
        }
        checked={value === value2}
      />
      <label htmlFor={id}></label>
    </>
  );
}

export function RadioInput2({ id, checked, label, action }) {
  return (
    <>
      <input type="radio" id={id} checked={checked} onChange={action} />
      <label htmlFor={id}>{label}</label>
    </>
  );
}
