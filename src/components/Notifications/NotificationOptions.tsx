import React, { Fragment, useState } from "react";
import { SaveBtn, OptionsSection, TemperatureValues, Input, WindValues, RainValues, WrapperContainer2, H1 } from "./NotificationOptionsStyles";
import { OPTIONS } from "./optionsDatabase";

//TODO: Disable for now in mobile

const NotificationOptions = ({ alarmWind, alarmRain, setOptions, setAlarmWind, setAlarmRain, isOpen, setIsAlarmContentOpen }) => {

  const [inputValue, setInputValue] = useState(OPTIONS)
  const ids = ["temp", "wind"]

  const onInputChange = (e, option) => {
    const newState = {
      ...inputValue,
      [option]: {
        ...OPTIONS[option],
        min: e.target.value
      }
    }
    setInputValue(newState)
  }

  return <OptionsSection>
    <H1>Options</H1>
    {
      ids.map((option, i) => {
        return (<Fragment key={i}>
          <h2>{OPTIONS[option].name}</h2>
          <TemperatureValues>
            {/* TODO: change to labels */}
            <span>Show alarm if {OPTIONS[option].name} is below:</span>
            <Input
              type="number"
              value={inputValue[option]?.min}
              onChange={(e) => onInputChange(e, option)}
            />
          </TemperatureValues>
          <TemperatureValues>
            <span>Show alarm if {OPTIONS[option].name} is above:</span>
            <Input
              type="number"
              value={inputValue[option]?.max}
              onChange={(e) => onInputChange(e, option)}
            />
          </TemperatureValues>
          <SaveBtn
            type="button"
            onClick={() => setOptions(inputValue)}
          >
            save
          </SaveBtn>
        </Fragment>)
      })
    }

    <h2>Rain</h2>
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
    </RainValues>
  </OptionsSection>
}

export { NotificationOptions }