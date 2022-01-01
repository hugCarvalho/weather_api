import Emoji from "components/Utils/Emoji/Emoji";
import { notifications, settingsObj } from "config/config";
import { SettingsType, AlarmName } from "config/types";
import React from "react";
import { Fragment, useState } from "react";
import { OptionsTitle, SaveBtn, OptionsSection, TemperatureValues, Input, H1 } from "./styles/NotificationOptionsStyles";

type NotificationOptionsProps = {
  options: SettingsType,
  setOptions: (value: SettingsType) => void
}

const NotificationOptions: React.FC<NotificationOptionsProps> = ({ options, setOptions }) => {
  const [inputValues, setInputValues] = useState(options)
  const [showSaved, setShowSaved] = useState(false)

  const onInputChange = (e, option: AlarmName, type: "min" | "max") => {
    const newState = {
      ...inputValues,
      [option]: {
        ...inputValues[option],
        [type]: e.target.value
      }
    }
    setInputValues(newState)
    setShowSaved(false)
  }

  const onSave = (e) => {
    e.preventDefault()
    setOptions(inputValues)
    setShowSaved(true)
  }

  return <OptionsSection>
    <H1>Options</H1>
    <form>
      {
        notifications.map((option: AlarmName, i) => {
          const { min, max } = inputValues[option]
          return (<Fragment key={i}>
            <OptionsTitle>{settingsObj[option].name}</OptionsTitle>
            {option !== "rain" && <TemperatureValues>
              <label htmlFor="value-below">
                Show alarm if {settingsObj[option].name} is below:
              </label>
              <Input
                id="value-below"
                type="number"
                min={option !== "temperature" ? "0" : null}
                value={min}
                onChange={(e) => onInputChange(e, option, "min")}
              />
            </TemperatureValues>}
            <TemperatureValues>
              <label htmlFor="value-above">
                Show alarm if {settingsObj[option].name} is above:
              </label>
              <Input
                id="value-above"
                type="number"
                min={option !== "temperature" ? "0" : null}
                value={max}
                onChange={(e) => onInputChange(e, option, "max")}
              />
            </TemperatureValues>
          </Fragment>)
        })
      }
      <SaveBtn
        type="submit"
        onClick={(e) => onSave(e)}>
        {showSaved ? <Emoji title="check-mark" emoji="✅" /> : "save"}
      </SaveBtn>
    </form>
  </OptionsSection >
}

export { NotificationOptions }