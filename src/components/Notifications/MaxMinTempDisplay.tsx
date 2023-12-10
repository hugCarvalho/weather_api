import { DaysType, Forecast3Days } from 'config/types'
import { Media } from 'hooks/useMediaQueries'
import React from 'react'
import styled from 'styled-components'
import { convertTemp } from '../Utils/convertTemp'

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
  `}
  text-align:center;
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
    `}
`
type MaxMinTempDisplayProps = {
  activeDay: DaysType
  forecast3Days: Forecast3Days
}

const MaxMinTempDisplay: React.FC<MaxMinTempDisplayProps> = ({ forecast3Days, activeDay }) => {
  let defaultTemp: null | number = null

  const maxTemperature = forecast3Days[activeDay]?.reduce((temp, hourObj) => {
    const maxTemp = hourObj.main.temp_max
    defaultTemp = maxTemp
    return maxTemp > temp ? maxTemp : temp
  }, defaultTemp)

  const minTemperature = forecast3Days[activeDay]?.reduce((temp, hourObj) => {
    const minTemp = hourObj.main.temp_min
    return minTemp < temp ? minTemp : temp
  }, defaultTemp)

  //TODO fix hardcoded celsius value as first argument
  const convertedMaxTemp = convertTemp(true, maxTemperature)
  const convertedMinTemp = convertTemp(true, minTemperature)

  return (
    <TemperatureContainer>
      <ValuesWraper>
        <span>Max:</span>
        <span>{forecast3Days?.today?.length !== 0 ? convertedMaxTemp + '°' : 'n/a'}</span>
      </ValuesWraper>
      <ValuesWraper>
        <span>Min: </span>
        <span>{forecast3Days?.today?.length !== 0 ? convertedMinTemp + '°' : 'n/a'}</span>
      </ValuesWraper>
    </TemperatureContainer>
  )
}

export { MaxMinTempDisplay }
