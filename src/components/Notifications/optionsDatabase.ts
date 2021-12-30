export type AlarmType = "rain" | "temperature" | "wind" //1
export type OptionName = "rain" | "temp" | "wind"
export const alarmTypes = ["rain", "temperature", "wind"]



export const SETTINGS = {
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

export type SettingsType = typeof SETTINGS