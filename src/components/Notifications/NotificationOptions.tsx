import React, { useState } from "react";
import { OptionsSection, TemperatureValues, Input, WindValues, RainValues, WrapperContainer2 } from "./NotificationOptionsStyles";

//TODO: enhance and refactor. Disable for now in mobile

const OPTIONS = [
  {
    id: "temp",
    title: "Temperature",
    min: 4,
    max: 25
  },
  {
    id: "wind",
    title: "Wind",
    min: 0,
    max: 20
  },

]


const NotificationOptions = ({ alarmTemp, alarmWind, alarmRain, setAlarmTemp, setAlarmWind, setAlarmRain, isOpen, setIsAlarmContentOpen }) => {

  const [inputValue, setInputValue] = useState(alarmTemp)

  const onSave = () => {
    //console.log("TEMP-MIN", e.currentTarget)
    // console.log(e.currentTarget.value)
    setAlarmTemp({ max: inputValue.max, min: inputValue.min })
  }

  console.log("ALARMTEMP", alarmTemp)

  return <div>
    <h1>Options</h1>
    <OptionsSection>
      {
        OPTIONS.map((item, i) => {
          return (<>
            <h2>{item.title}</h2>
            <TemperatureValues>
              {/* TODO: change to labels */}
              <span>Show alarm if {item.title} below:</span>
              <Input
                type="number"
                value={inputValue?.min}
                onChange={(e) => {
                  console.log("ITEM", item, e.target.value)
                  setInputValue({ ...inputValue, min: e.target.value })
                }}
              />
            </TemperatureValues>
            <TemperatureValues>
              <span>Show alarm if {item.title} above:</span>
              <Input
                value={inputValue?.max}
                onChange={(e) => setInputValue({ ...inputValue, max: e.target.value })}
              />
            </TemperatureValues>
            <button type="button" onClick={() => onSave()}>save</button>
          </>)
        })
      }
      {/* <h2>Temperature</h2>
      <TemperatureValues>
        <span>Show alarm if temp below:</span>
        <Input
          type="number"
          name="tempMin"
          value={inputValue?.min}
          onChange={(e) => {
            console.log("TEMP-MIN", e.target.value)
            setInputValue({ ...alarmTemp, min: e.target.value })
          }}
        />
      </TemperatureValues> */}
      {/* <TemperatureValues>
        <span>Show alarm if temp above:</span>
        <Input
          value={alarmTemp?.max}
          onChange={(e) => setAlarmTemp({ ...alarmTemp, max: e.target.value })}
        />
      </TemperatureValues>
      <button type="button" onClick={(e) => onSave(e)}>save</button>
      <form>
        <h2>Wind</h2>
        <WindValues>
          <span>Show alarm if wind below:</span>
          <Input value={alarmWind?.min} onChange={(e) => setAlarmWind({ ...alarmWind, min: e.target.value })} />
        </WindValues>
        <WindValues>
          <span>Show alarm if wind below:</span>
          <Input value={alarmWind?.max} onChange={(e) => setAlarmWind({ ...alarmWind, max: e.target.value })} />
        </WindValues>

      </form> */}

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
  </div>
}

export { NotificationOptions }