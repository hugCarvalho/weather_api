import { DaysArr } from "./types";

export const days: DaysArr = ["today", "tomorrow", "afterTomorrow"];
export const notifications = ["rain", "temperature", "wind"]

export const settingsObj = {
  temperature: {
    id: "temperature",
    name: "Temperature",
    min: 5,
    max: 25
  },
  wind: {
    id: "wind",
    name: "Wind",
    min: 0,
    max: 20
  },
  rain: {
    id: "rain",
    name: "Rain",
    max: "0",
    min: "0"
  }
}

//todo: merge
export const NotificationsInit = {
  rain: true,
  wind: true,
  temperature: true
}

export enum ValueFormats {
  KM = "km",
  RAIN = "mm",
  TEMP = "°",
}