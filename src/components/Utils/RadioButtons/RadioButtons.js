import React from "react";

export default function RadioButtons({ id, value, value2, action }) {
  console.log(id, value, value2, action);
  return (
    <>
      <input
        type="radio"
        id={id}
        value={value}
        onChange={e => action(e.target.value)}
        checked={value === value2}
      />
      <label htmlFor={id}></label>
    </>
  );
}

export function RadioButtons2({ id, checked, label, action }) {
  return (
    <>
      <input type="radio" id={id} checked={checked} onChange={action} />
      <label htmlFor={id}>{label}</label>
    </>
  );
}
