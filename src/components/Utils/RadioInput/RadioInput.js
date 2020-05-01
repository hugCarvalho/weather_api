import React from "react";

export default function RadioInput({
  savedCities,
  chooseDefaultCity,
  defaultCity,
  cityNum,
}) {
  //const {savedCities} = props
  //console.log(;
  return (
    <>
      <input
        type="radio"
        id={cityNum}
        //name="cities"
        value={savedCities}
        //only allows action if a city is saved already
        onChange={
          savedCities ? e => chooseDefaultCity(e.target.value) : () => {} //React shows warning if null is chosen
        }
        checked={savedCities === defaultCity}
      />
      <label htmlFor={cityNum}></label>
    </>
  );
}

// const button = props => {
//   <button
//     className={[".nameofclass", [props.btnType]].join(" ")}
//     onClick={props.clicked}
//   >
//     {props.children}
//   </button>;
// };
