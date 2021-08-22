import React, { useEffect, useState } from "react";
import styled from "styled-components"
import { convertTemp } from "../Utils/convertTemp";
import { convertWindSpeed } from "../Utils/convertWindSpeed";

const AlarmNotificationsContainer = styled.section`
  padding: 4px;
  width: 180px;
  background-color: lime;
  position: absolute;
  top: 0;
  right: 0;
`

const UL = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`

type AlarmNotificationsProps = {
  forecast3Days: Record<string, any>
}

const AlarmNotifications: React.FC<AlarmNotificationsProps> = ({forecast3Days}) => {

  const [todayAlarms, setTodayAlarms] =useState(null) as any
  const types = ["rain", "temp", "wind"]

  useEffect(() => {
    console.log("forecast3Days ->>>>")
    const rain = []
    const temp = []
    const wind = []
    
    forecast3Days.today && forecast3Days.today.forEach(hour => {
      const tempConverted = +convertTemp(undefined, hour.main.temp)
      const windConverted = convertWindSpeed(hour.wind.speed)
    
      if (hour.rain) rain.push(hour)
      if (tempConverted > 20 || tempConverted < 5) temp.push(hour)
      if (windConverted > 5) wind.push(hour)
    })
    if (rain.length > 0 || temp.length > 0 || wind.length > 0) {
      setTodayAlarms([{ rain: rain } , {temp: temp}, {wind: wind} ])
    }
  }, [forecast3Days])

  console.log("FCK", todayAlarms)
  
  return <AlarmNotificationsContainer>
    {/* {alarms.length > 0 ? <span>DANGER </span> : <span>OK </span>} */}
    <span>Alarms: </span>
    <div>
      <h2>Today:</h2>
      {
        todayAlarms?.length > 0 && todayAlarms.map((obj, i) => {
          const type = types[i]
          if (obj[type].length > 0) {
            console.log("ASDASDASDAS", obj[type])
            return (
              <div key={i}>
                <h3>{i === 0 ? "Rain" : i === 1 ? "Temperature" : "Strong wind"}</h3>
                <UL>
                  {/* MAKE COMP */}
                  {obj[type].map(hour => {
                    const windSpeed = convertWindSpeed(hour.wind.speed)
                    const temperature = convertTemp(undefined,  hour.main.temp)
                    
                    return (
                      <div key={hour.dt}>
                        {i === 1 && <span> {temperature < 10 ? '* ' : 'O '} </span>}
                        <span>{hour.dt_txt.slice(hour.dt_txt.length - 8, hour.dt_txt.length - 8 + 5)} </span>
                        ( <span>{i === 0 ? hour.rain["3h"] : i === 1 ? temperature : windSpeed}</span>
                        <span>{i === 0 ? 'mm' : i === 1 ? '°' : 'km/h'}</span> )
                      </div>
                    )
                  })}
               </UL>
              </div>
            )
          }
        })
      }
    </div>
  </AlarmNotificationsContainer>;
};

export { AlarmNotifications };
