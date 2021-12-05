import React, { useState } from "react"
import styled from "styled-components"
import { alarmTemperature, alarmWindValues, alarmRainValues } from "./optionsDatabase"

const DefaultHeadline = styled.div`
  display: flex;
  justify-content: space-between;
`
const OpenClose = styled.div`
  display: flex;
`
const ShowAlarmsWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  `
const OpenContainer = styled.div`
  background-color: lime;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const CloseContainer = styled(OpenContainer)`
  background-color: orange;
  
`
const Name = styled.span`
  /* padding-top: 5px; */
`
const OptionsSection = styled.section`
  background-color: pink;
  display: flex;
  flex-direction: column;
`
const TemperatureValues = styled.div`
  display: flex;
`
const WindValues = styled(TemperatureValues)``
const RainValues = styled(TemperatureValues)``

const Input = styled.input`
  width: 45px;
  padding: 0 0 0 2px;
  margin: 0 0 0 5px;
`

//TODO: enhance and refactor

const NotificationOptions = ({ isContentOpen: isOpen, setIsAlarmContentOpen }) => {
  const [alarmTemp, setAlarmTemp] = useState(alarmTemperature)
  const [alarmWind, setAlarmWind] = useState(alarmWindValues)
  const [alarmRain, setAlarmRain] = useState(alarmRainValues)

  return <div>
    <h1>Options</h1>
    <OptionsSection>
      <h2>Temperature</h2>
      <TemperatureValues>
        <span>Show alarm if temp below:</span>
        <Input
          type="number"
          value={alarmTemp?.min}
          onChange={(e) => setAlarmTemp({ ...alarmTemp, min: e.target.value })} //TODO: don't accept "" values
        />
      </TemperatureValues>
      <TemperatureValues>
        <span>Show alarm if temp above:</span>
        <Input value={alarmTemp?.max} onChange={(e) => setAlarmTemp({ ...alarmTemp, max: e.target.value })} />
      </TemperatureValues>

      <h2>Wind</h2>
      <WindValues>
        <span>Show alarm if wind below:</span>
        <Input value={alarmWind?.min} onChange={(e) => setAlarmWind({ ...alarmWind, min: e.target.value })} />
      </WindValues>
      <WindValues>
        <span>Show alarm if wind below:</span>
        <Input value={alarmWind?.max} onChange={(e) => setAlarmWind({ ...alarmWind, max: e.target.value })} />
      </WindValues>

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
    {/* <div>
      <DefaultHeadline>
        <span>Default behaviour of alarm boxes:</span>
        <OpenClose>
          <OpenContainer>Open</OpenContainer>
          <CloseContainer>Close</CloseContainer>
        </OpenClose>
      </DefaultHeadline>
    </div> */}
    {/* <ul>
      <ShowAlarmsWrapper>
        <Name>Rain</Name>
        <div>
          <OpenClose>
          <OpenContainer>
              <input type="radio" name="option" value="open" id="rain-open" checked={isOpen.rainDefault}
                onChange={() => {
                  if (!isOpen.rainDefault) {
                    setIsAlarmContentOpen("rainDefault")
                  }
                }}
              />
          </OpenContainer>
          <CloseContainer>
              <input
                type="radio" name="option" value="close" id="rain-close" checked={!isOpen.rainDefault}
                onChange={() => {
                  if (isOpen.rainDefault) {
                    setIsAlarmContentOpen("rainDefault")
                  }
                }}
              />
          </CloseContainer>
          </OpenClose>
        </div>
      </ShowAlarmsWrapper>
      <ShowAlarmsWrapper>
        <span>Wind</span>
      </ShowAlarmsWrapper>
      <ShowAlarmsWrapper>
        <span>Temp</span>
        
      </ShowAlarmsWrapper>
      
    </ul> */}

  </div>
}

export { NotificationOptions }