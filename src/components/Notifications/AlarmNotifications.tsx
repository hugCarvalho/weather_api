import React, { useEffect, useState } from "react";
import styled from "styled-components"
import { convertTemp } from "../Utils/convertTemp";
import { convertWindSpeed } from "../Utils/convertWindSpeed";
import { AlarmNotificationsContainer, WrapperIconAlarmsContainer, IconContainer, AlarmsContainer, AlarmsList } from "./NotificationsStyles";



type AlarmTypes = {
  rain?: any[]
  temp?: any[]
  wind?: any[]
}

const alarmValues = {
  wind: 5,
  cold: 0,
  heat: 5
}

export type AlarmNotificationsProps = {
  // forecast3Days: Record<string, Array<unknown>>
  forecast3Days: Record<string, Array<any>>
  activeDay: string
}

const AlarmNotifications: React.FC<AlarmNotificationsProps> = ({forecast3Days, activeDay}) => {
  const [alarms, setAlarms] = useState<AlarmTypes[] | null>(null)
  const [closeRightPanel, setCloseRightPanel] = useState(false)
  const types = ["rain", "temp", "wind"]

  useEffect(() => {
    const rain: Array<Record<string, any>> = []
    const temp: Array<Record<string, any>> = []
    const wind: Array<Record<string, any>> = []
    
    forecast3Days[activeDay] && forecast3Days[activeDay].forEach(hour => {
      const tempConverted = +convertTemp(undefined, hour.main.temp)
      const windConverted = convertWindSpeed(hour.wind.speed)
    
      if (hour.rain) rain.push(hour)
      if (tempConverted > alarmValues.heat || tempConverted < alarmValues.cold) temp.push(hour)
      if (windConverted > alarmValues.wind) wind.push(hour)
    })
    if (rain.length > 0 || temp.length > 0 || wind.length > 0) {
      setAlarms([{ rain: rain } , {temp: temp}, {wind: wind} ])
    }
  }, [forecast3Days, activeDay, setAlarms])

  //console.log("FCK", todayAlarms)
  console.log("islosed", closeRightPanel)
  
  return <AlarmNotificationsContainer onClick={()=> setCloseRightPanel(!closeRightPanel)} >
    {/* {alarms.length > 0 ? <span>DANGER </span> : <span>OK </span>} */}
    <span>Alarms: </span>
    <div>
      {
        alarms && alarms.map((obj: Record<string, any[]>, i: number) => {
          const type = types[i]
          if ((obj[type]).length > 0) {
            return (
              <WrapperIconAlarmsContainer close={closeRightPanel} key={i}>
                <IconContainer><span>💨</span></IconContainer>
                <AlarmsContainer>
                  <h3>{i === 0 ? "Rain" : i === 1 ? "Temperature" : "wind"}</h3>
                  <AlarmsList>
                    {/* MAKE COMP */}
                    {obj[type].map(hour => {
                      const windSpeed = convertWindSpeed(hour.wind.speed)
                      const temperature = +convertTemp(undefined, hour.main.temp)
                      
                      return (
                        
                        <div key={hour.dt}>
                          {/* TEMP */}
                          {i === 1 && <span> {temperature < 10 ? '* ' : 'O '} </span>}
                          <span>{hour.dt_txt.slice(hour.dt_txt.length - 8, hour.dt_txt.length - 8 + 5)} </span>
                          {/* WInd */}
                          ( <span>{i === 0 ? hour.rain["3h"] : i === 1 ? temperature : windSpeed}</span>
                          <span>{i === 0 ? 'mm' : i === 1 ? '°' : 'km/h'}</span> )
                        </div>
                        
                      )
                    })}
                </AlarmsList>
                </AlarmsContainer>
              </WrapperIconAlarmsContainer>
            )
          } else return null
        })
      }
    </div>
  </AlarmNotificationsContainer>;
};

export { AlarmNotifications };
