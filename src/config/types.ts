import { settingsObj } from "./config"

export type AlarmName = "rain" | "temperature" | "wind" //1
export type SettingsType = typeof settingsObj
export type DaysType = "today" | "tomorrow" | "afterTomorrow" | "day4" | "day5"
export type DaysArr = Array<"today" | "tomorrow" | "afterTomorrow" | "day4" | "day5">

export type Forecast5Days = {
  today: Array<HourObj>
  tomorrow: Array<HourObj>
  afterTomorrow: Array<HourObj>
  day4: Array<HourObj>
  day5: Array<HourObj>
}
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
