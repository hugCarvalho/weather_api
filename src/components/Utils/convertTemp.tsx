//Converts Kelvin to Celsius or Fahrenheit
export const convertTemp = (type = true, value: number): string =>
  type ? `${(value - 273.15).toFixed(1)}` : `${((value * 9) / 5 - 459.67).toFixed(0)}`;
