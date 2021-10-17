import Emoji from "components/Utils/Emoji/Emoji";
import React, { Fragment, useEffect, useState } from "react";
import { convertTemp } from "../Utils/convertTemp";
import { convertWindSpeed } from "../Utils/convertWindSpeed";
import { AlarmNotificationsContainer, WrapperIconAlarmsContainer, IconContainer, AlarmsContainer, AlarmsList, Wrapper, HeaderWrapper, Icon, Title, Content, ContentSlider } from "./NotificationsStyles";

const alarmValues = {
  wind: 5,
  cold: 0,
  heat: 5
}
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

const AlarmNotifications: React.FC<AlarmNotificationsProps> = ({forecast3Days, activeDay}) => {
  const [alarms, setAlarms] = useState<AlarmTypes[] | null>(null)
  const [isRightPanelClosed, setCloseRightPanel] = useState(false)
  const alarmTypes = ["rain", "temp", "wind"]
  const [isContentOpen, setIsContentOpen] =useState(true)

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

  return <AlarmNotificationsContainer onClick={()=> setCloseRightPanel(!isRightPanelClosed)} >
    {/* {alarms.length > 0 ? <span>DANGER </span> : <span>OK </span>} */}
    <span>Alarms: </span>
    <div>
      {
        alarms && alarms.map((obj: AlarmTypes, i: number) => {
          const alarmType = alarmTypes[i]
          if ((obj[alarmType]).length > 0) {
            return (
              <Wrapper key={i}>
              <HeaderWrapper onClick={()=> setIsContentOpen((state) => !state)}>
                <IconContainer><span>💨</span></IconContainer>
                <h3>{i === 0 ? "Rain" : i === 1 ? "Temperature" : "wind"}</h3>
              </HeaderWrapper>
                  <Content isContentOpen={isContentOpen}>
                    {obj[alarmType].map(hourForecast => {
                      const windSpeed = convertWindSpeed(hourForecast.wind.speed)
                      //TODO change undefined
                      const temperature = +convertTemp(undefined, hourForecast.main.temp)
                      const hour = hourForecast.dt_txt.slice(hourForecast.dt_txt.length - 8, hourForecast.dt_txt.length - 8 + 5)
                      const value = i === 0 ? hourForecast.rain["3h"] : i === 1 ? temperature : windSpeed
                      const valueFormat = i === 0 ? 'mm' : i === 1 ? '°' : 'km/h'
                      console.log("HOUR", hourForecast)
                      return (
                        <div key={hourForecast.dt}>
                          {/* {i === 1 && <span> {temperature < 10 ? '* ' : 'O '} </span>} */}
                          <span>{hour}</span> (<span>{value}</span><span>{valueFormat}</span>)
                        </div>
                      )
                    })}
                </Content>
              </Wrapper>
            )
          } else return null
        })
      }
    </div>
    
    <Wrapper>
      <HeaderWrapper onClick={()=> setIsContentOpen((state) => !state)}>
        <Icon><Emoji title="strong wind" emoji="💥"/></Icon>
        <Title>SIND</Title>
      </HeaderWrapper>
      <Content isContentOpen={isContentOpen}>
        <div>timslots</div>
        <div>timslots</div>
        <div>timslots</div>
      </Content>
         <HeaderWrapper onClick={()=> setIsContentOpen((state) => !state)}>
        <Icon><Emoji title="strong wind" emoji="💥"/></Icon>
        <Title>SIND</Title>
      </HeaderWrapper>
    </Wrapper>

  </AlarmNotificationsContainer>;
};

export { AlarmNotifications };
