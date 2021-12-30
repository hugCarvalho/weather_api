import React from "react";
import { Fragment, useState } from "react";
import { SaveBtn, OptionsSection, TemperatureValues, Input, H1 } from "./NotificationOptionsStyles";
import { AlarmType, alarmTypes, SETTINGS, SettingsType } from "./optionsDatabase";

//TODO: Disabled for now on mobile

type NotificationOptionsProps = {
  options: SettingsType,
  setOptions: any// () => SettingsType why not work?
}

const NotificationOptions: React.FC<NotificationOptionsProps> = ({ options, setOptions }) => {
  const [inputValues, setInputValues] = useState(options)

  const onInputChange = (e, option: AlarmType, type: "min" | "max") => {
    const newState = {
      ...inputValues,
      [option]: {
        ...inputValues[option],
        [type]: e.target.value
      }
    }
    setInputValues(newState)
  }

  return <OptionsSection>
    <H1>Options</H1>
    {
      alarmTypes.map((option: AlarmType, i) => {
        return (<Fragment key={i}>
          <h2>{SETTINGS[option].name}</h2>
          {option !== "rain" && <TemperatureValues>
            <label htmlFor="value-below">
              Show alarm if {SETTINGS[option].name} is below:
            </label>
            <Input
              id="value-below"
              type="number"
              min={option !== "temperature" ? "0" : null}
              value={inputValues[option]?.min}
              onChange={(e) => onInputChange(e, option, "min")}
            />
          </TemperatureValues>}
          <TemperatureValues>
            <label htmlFor="value-above">
              Show alarm if {SETTINGS[option].name} is above:
            </label>
            <Input
              id="value-above"
              type="number"
              min={option !== "temperature" ? "0" : null}
              value={inputValues[option]?.max}
              onChange={(e) => onInputChange(e, option, "max")}
            />
          </TemperatureValues>
          <SaveBtn
            type="button"
            onClick={() => setOptions(inputValues)}>save
          </SaveBtn>
        </Fragment>)
      })
    }
  </OptionsSection >
}

export { NotificationOptions }