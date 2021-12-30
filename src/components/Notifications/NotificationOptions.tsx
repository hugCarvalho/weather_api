import React from "react";
import { Fragment, useState } from "react";
import { SaveBtn, OptionsSection, TemperatureValues, Input, H1 } from "./NotificationOptionsStyles";
import { SETTINGS } from "./optionsDatabase";

//TODO: Disable for now on mobile

const NotificationOptions = ({ options, setOptions }) => {

  const [inputValues, setInputValues] = useState(options)
  const ids = ["temp", "wind"]

  const onInputChange = (e, option, type) => {
    const newState = {
      ...inputValues,
      [option]: {
        ...inputValues[option],
        [type]: e.target.value
      }
    }
    console.log("option", option)
    setInputValues(newState)
  }

  console.log("adadsa", inputValues?.temp)

  return <OptionsSection>
    <H1>Options</H1>
    {
      ids.map((option, i) => {
        return (<Fragment key={i}>
          <h2>{SETTINGS[option].name}</h2>
          <TemperatureValues>
            {/* TODO: change to labels */}
            <span>Show alarm if {SETTINGS[option].name} is below:</span>
            <Input
              type="number"
              value={inputValues[option]?.min}
              onChange={(e) => onInputChange(e, option, "min")}
            />
          </TemperatureValues>
          <TemperatureValues>
            <span>Show alarm if {SETTINGS[option].name} is above:</span>
            <Input
              type="number"
              value={inputValues[option]?.max}
              onChange={(e) => onInputChange(e, option, "max")}
            />
          </TemperatureValues>
          <SaveBtn
            type="button"
            onClick={() => setOptions(inputValues)}
          >
            save
          </SaveBtn>
        </Fragment>)
      })
    }

    {/* <h2>Rain</h2>
    <RainValues>
      <span>Show always:</span>
      <Input
        type="checkbox"
        checked={alarmRain?.always}
        onChange={(e) => {
          console.log("E", e.target)
          setAlarmRain({ ...alarmRain, always: !alarmRain.always })
        }}
      />
    </RainValues>
    <RainValues>
      <span>Show alarm if Rain below:</span>
      <Input
        disabled={alarmRain.always}
        value={alarmWind?.min} onChange={(e) => setAlarmWind({ ...alarmWind, min: e.target.value })} />
    </RainValues>
    <RainValues>
      <span>Show alarm if Rain above:</span>
      <Input
        disabled={alarmRain.always}
        value={alarmWind?.min} onChange={(e) => setAlarmWind({ ...alarmWind, min: e.target.value })} />
    </RainValues> */}
  </OptionsSection>
}

export { NotificationOptions }