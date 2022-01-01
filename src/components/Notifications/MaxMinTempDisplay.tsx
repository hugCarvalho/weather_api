import { Media } from "hooks/MediaQueries"
import React from "react"
import styled from "styled-components"
import { convertTemp } from "../Utils/convertTemp"
import { ActiveDay, Forecast3Days, HourObj } from "./optionsConfig"

const TemperatureContainer = styled.section`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-content: space-between;

  background-color: transparent;
  color: white;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 4px;
  border-bottom-right-radius: 10px;
  border-bottom: 1px solid lightgray;
  ${Media.small`
    padding: 6px;
    line-height: 18px;
    border-bottom-right-radius: 10px;
    letter-spacing: 2px;
  `
  }
`
const ValuesWraper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-bottom: 2px;
  ${Media.small`
      width: 69px;
      flex-direction: row;
      justify-content: space-between;
      padding-bottom: 0;
    `
  }
`
type MaxMinTempDisplayProps = {
  activeDay: ActiveDay,
  forecast3Days: Forecast3Days
}

const MaxMinTempDisplay: React.FC<MaxMinTempDisplayProps> = ({ forecast3Days, activeDay }) => {

  const MaxTemp = forecast3Days[activeDay]?.reduce((acc, hourObj) => {
    console.log("ACC", acc)
    const max = hourObj.main.temp_max
    return max > acc ? max : acc
  }, -100)

  const MinTemp = forecast3Days[activeDay]?.reduce((acc, hourObj) => {
    const min = hourObj.main.temp_min
    return min < acc ? min : acc
  }, 1000)

  //TODO fix hardcoded celsius value as first argument
  const convertedMaxTemp = convertTemp(true, MaxTemp)
  const convertedMinTemp = convertTemp(true, MinTemp)

  console.log("foreacst", forecast3Days);
  // console.log("DAY", activeDay);



  return <TemperatureContainer>
    <ValuesWraper>
      <span>Max:</span><span>{forecast3Days?.today?.length !== 0 ? convertedMaxTemp + "°" : "n/a"}</span>
    </ValuesWraper>
    <ValuesWraper>
      <span>Min: </span><span>{forecast3Days?.today?.length !== 0 ? convertedMinTemp + "°" : "n/a"}</span>
    </ValuesWraper>
  </TemperatureContainer>
}

export { MaxMinTempDisplay }
//TODO 🌡️ find icon for min Temp. Make Desktop Hook?