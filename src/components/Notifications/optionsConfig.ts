export type AlarmName = "rain" | "temperature" | "wind" //1
export type SettingsType = typeof settingsObj
export type ActiveDay = "today" | "tomorrow" | "afterTomorrow"

export type HourObj = {
  clouds: Record<string, number>,
  dt: number,
  dt_txt: string,
  main: {
    feels_like: number
    grnd_level: number
    humidity: number
    pressure: number
    sea_level: number
    temp: number
    temp_kf: number
    temp_max: number
    temp_min: number
  }
  pop: number,
  rain: Record<string, number>,
  sys: Record<string, string>,
  visibility: number,
  weather: Array<Record<string, any>>,
  wind: {
    deg: number
    gust: number
    speed: number
  },
}

export type Forecast3Days = {
  today: Array<HourObj>
  tomorrow: Array<HourObj>
  afterTomorrow: Array<HourObj>
}

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