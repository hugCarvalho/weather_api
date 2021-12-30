import React from "react";
import { Fragment, useState } from "react";
import { SaveBtn, OptionsSection, TemperatureValues, Input, H1 } from "./NotificationOptionsStyles";
import { alarmTypes, SETTINGS } from "./optionsDatabase";

//TODO: Disable for now on mobile

const NotificationOptions = ({ options, setOptions }) => {

  const [inputValues, setInputValues] = useState(options)

  const onInputChange = (e, option, type) => {
    const newState = {
      ...inputValues,
      [option]: {
        ...inputValues[option],
        [type]: e.target.value
      }
    }
    // console.log("option", option, type)
    setInputValues(newState)
  }

  // console.log("adadsa", inputValues?.temp)

  return <OptionsSection>
    <H1>Options</H1>
    {
      alarmTypes.map((option, i) => {
        return (<Fragment key={i}>
          <h2>{SETTINGS[option].name}</h2>
          {option !== "rain" && <TemperatureValues>
            <label htmlFor="value-below">
              Show alarm if {SETTINGS[option].name} is below:
            </label>
            <Input
              id="value-below"
              type="number"
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
  </OptionsSection>
}

export { NotificationOptions }