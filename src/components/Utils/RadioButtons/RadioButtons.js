import React from 'react'

export default function DefaultCityRadioBtn({ id, value, defaultCity, chooseDefaultCity }) {
  console.log('V', value, 'V2', defaultCity)
  return (
    <>
      <input
        type='radio'
        id={id}
        value={value}
        onChange={(e) => chooseDefaultCity(e.target.value)}
        checked={value === defaultCity}
      />
      <label htmlFor={id}></label>
    </>
  )
}

export function RadioButtons2({ id, checked, label, action }) {
  return (
    <>
      <input
        type='radio'
        id={id}
        checked={checked}
        onChange={action}
      />
      <label htmlFor={id}>{label}</label>
    </>
  )
}
