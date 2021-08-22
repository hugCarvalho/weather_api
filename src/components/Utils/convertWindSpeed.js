//converts from metres per second (m/s) to km/h or to miles per hour
export const convertWindSpeed = (value, type = true) =>
  type ? Math.round(value * 3.6) : Math.round(value * 2.237);
