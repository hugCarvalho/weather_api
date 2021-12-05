import Emoji from "components/Utils/Emoji/Emoji";
import { Popup } from "components/Utils/Popup/Popup";
import React, { useEffect, useState } from "react";
import { convertTemp } from "../Utils/convertTemp";
import { convertWindSpeed } from "../Utils/convertWindSpeed";
import { StateWrapper, AlarmNotificationsSection, IconContainer, AlarmsContainer, HeaderWrapper, Title, AlarmsTime, TimeWrapper, HourFormat, ValueFormat } from "./NotificationsStyles";
import { NotificationOptions } from "./NotificationOptions";


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
  wind: 20,
  cold: 5,
  heat: 30
}

//TODO do proper objects
export type AlarmMenusInitProps = {
  rain: boolean,
  rainDefault: boolean,
  wind: boolean,
  temp: boolean
}

const alarmMenusInit = {
  rain: true,
  rainDefault: true,
  wind: true,
  temp: true
}

//make obj 🌧️ 🚨
const renderEmoji = (alarm) => {
  switch (alarm) {
    case "wind": return <Emoji title="wind" emoji="💨" />;
    case "rain": return <Emoji title="rain" emoji="☔" />;
    case "temp": return <Emoji title="temperature" emoji="🌡️" />;
    default: throw Error("invalid alarm name")
  }
}

//TODO make keyboard friendly
const AlarmNotifications: React.FC<AlarmNotificationsProps> = ({ forecast3Days, activeDay }) => {
  const [alarms, setAlarms] = useState<AlarmTypes[] | null>(null)
  const [isOpen, setIsOpen] = useState<AlarmMenusInitProps>(alarmMenusInit)
  const [showPopup, setShowPopup] = useState(true)
  const alarmTypes = ["rain", "temp", "wind"]

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
      setAlarms([{ rain: rain }, { temp: temp }, { wind: wind }])
    }
  }, [forecast3Days, activeDay, setAlarms])

  const setIsAlarmContentOpen = (alarmType) => {
    console.log(alarmType)
    setIsOpen((state) => {
      return {
        ...state,
        [alarmType]: !state[alarmType]
      }
    })
  }
  const areThereAlarms = alarms?.some(item => Object.values(item).length)

  return <><AlarmNotificationsSection >
    <HeaderWrapper onClick={() => setShowPopup(true)}>
      <IconContainer>
        <Emoji title="wind" emoji="🚨" />
      </IconContainer>
      <Title>Alarms / Options</Title>
    </HeaderWrapper>
    <div>
      {
        areThereAlarms ? alarms.map((obj: AlarmTypes, i: number) => {
          const alarmName = alarmTypes[i]
          if ((obj[alarmName]).length > 0) {
            return (
              <AlarmsContainer key={i}>
                <HeaderWrapper onClick={() => setIsAlarmContentOpen(alarmName)}>
                  <IconContainer>
                    {renderEmoji(alarmName)}
                  </IconContainer>
                  <Title>{i === 0 ? "Rain" : i === 1 ? "Temperature" : "Wind"}</Title>
                </HeaderWrapper>
                <StateWrapper isContentOpen={isOpen[alarmName]}>
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
        }) : <AlarmsTime>None</AlarmsTime>

      }
    </div>

  </AlarmNotificationsSection>;
    {showPopup && <Popup setShowPopup={setShowPopup} content={<NotificationOptions isContentOpen={isOpen} setIsAlarmContentOpen={setIsAlarmContentOpen} />} />}
  </>
};

export { AlarmNotifications };
