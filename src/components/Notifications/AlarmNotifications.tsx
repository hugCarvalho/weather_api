import Emoji from "components/Utils/Emoji/Emoji";
import React, { useEffect, useState } from "react";
import { convertTemp } from "../Utils/convertTemp";
import { convertWindSpeed } from "../Utils/convertWindSpeed";
import { StateWrapper, AlarmNotificationsSection, IconContainer, AlarmsContainer, HeaderWrapper, Title, AlarmsTime, TimeWrapper, HourFormat, ValueFormat } from "./NotificationsStyles";


type AlarmTypes = {
  rain?: any[]
  temp?: any[]
  wind?: any[]
}
export type AlarmNotificationsProps = {
  // forecast3Days: Record<string, Array<unknown>>
  forecast3Days: Record<string, Array<any>>
  activeDay: string
}

const alarmValues = {
  wind: 5,
  cold: 0,
  heat: 5
}

const AlarmMenusInit = {
  rain: false,
  wind: false,
  temp: false
}

const AlarmNotifications: React.FC<AlarmNotificationsProps> = ({forecast3Days, activeDay}) => {
  const [alarms, setAlarms] = useState<AlarmTypes[] | null>(null)
  const [isRightPanelClosed, setCloseRightPanel] = useState(false)
  const alarmTypes = ["rain", "temp", "wind"]
  const [isContentOpen, setIsContentOpen] =useState(AlarmMenusInit)

  useEffect(() => {
    const rain: Array<Record<string, any>> = []
    const temp: Array<Record<string, any>> = []
    const wind: Array<Record<string, any>> = []
    
    forecast3Days[activeDay] && forecast3Days[activeDay].forEach(hour => {
      const tempConverted = +convertTemp(undefined, hour.main.temp)
      const windConverted = convertWindSpeed(hour.wind.speed)
    
      if (hour.rain) rain.push(hour)
      if (windConverted > alarmValues.wind) wind.push(hour)
      if (tempConverted > alarmValues.heat || tempConverted < alarmValues.cold) temp.push(hour)
    })
    if (rain.length > 0 || temp.length > 0 || wind.length > 0) {
      setAlarms([{ rain: rain } , {temp: temp}, {wind: wind} ])
    }
  }, [forecast3Days, activeDay, setAlarms])

  console.log(isContentOpen)

  const setIsAlarmContentOpen = (alarmType) => {
    setIsContentOpen((state) => {
                  return {
                    ...state,
                    [alarmType]: !state[alarmType]
                  }
    })
  }  

  return <AlarmNotificationsSection onClick={()=> setCloseRightPanel(!isRightPanelClosed)} >
    {/* {alarms.length > 0 ? <span>DANGER </span> : <span>OK </span>} */}
    <span>Alarms: </span>
    <div>
      {
        alarms && alarms.map((obj: AlarmTypes, i: number) => {
          const alarmName = alarmTypes[i]
          if ((obj[alarmName]).length > 0) {
            return (
              <AlarmsContainer key={i}>
                {/* <HeaderWrapper onClick={() => setIsContentOpen((state) => !state)}> */}
                <HeaderWrapper onClick={() => setIsAlarmContentOpen(alarmName)}>
                  <IconContainer>
                    <Emoji title="strong wind" emoji="💨" />
                  </IconContainer>
                  <Title>{i === 0 ? "Rain" : i === 1 ? "Temperature" : "wind"}</Title>
                </HeaderWrapper>
                <StateWrapper isContentOpen={isContentOpen[alarmName]}>
                  <AlarmsTime >
                    {obj[alarmName].map(hourForecast => {
                      const windSpeed = convertWindSpeed(hourForecast.wind.speed)
                      //TODO change undefined
                      const temperature = +convertTemp(undefined, hourForecast.main.temp)
                      const hour = hourForecast.dt_txt.slice(hourForecast.dt_txt.length - 8, hourForecast.dt_txt.length - 8 + 5)
                      const value = i === 0 ? hourForecast.rain["3h"] : i === 1 ? temperature : windSpeed
                      const valueFormat = i === 0 ? 'mm' : i === 1 ? '°' : 'km'

                      // console.log("HOUR", hourForecast)
                      return (
                        <div key={hourForecast.dt}>
                          {/* {i === 1 && <span> {temperature < 10 ? '* ' : 'O '} </span>} */}
                          {/* TODO change to Grid */}
                          {/* //TODO reduce fontsize value */}
                          <TimeWrapper>
                            <HourFormat>
                              <div>
                                <span>{hour}</span>
                              </div>
                              <div>
                                <span>{value}</span><ValueFormat>{valueFormat}</ValueFormat>
                              </div>
                            </HourFormat>
                          </TimeWrapper>
                        </div>
                      )
                    })}
                </AlarmsTime>
                </StateWrapper>
              </AlarmsContainer>
            )
          } else return null
        })
      }
    </div>
  </AlarmNotificationsSection>;
};

export { AlarmNotifications };
