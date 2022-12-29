import Emoji from "components/Utils/Emoji/Emoji";
import { Popup } from "components/Utils/Popup/Popup";
import React, { useEffect, useState } from "react";
import { convertTemp } from "../Utils/convertTemp";
import { convertWindSpeed } from "../Utils/convertWindSpeed";
import { StateWrapper, AlarmNotificationsSection, IconContainer, AlarmsContainer, HeaderWrapper, Title, AlarmsTime, TimeWrapper, HourFormat, ValueFormat } from "./styles/NotificationsStyles";
import { NotificationOptions } from "./NotificationOptions";
import { renderEmoji } from "./functions";
import { useLocalStorage } from "../../hooks/LocalStorage.js"
import { NotificationsInit, settingsObj, notifications, ValueFormats } from "config/config";
import { HourObj, AlarmName } from "config/types";

type AlarmTypes = {
  rain?: any[]
  temperature?: any[]
  wind?: any[]
}
export type AlarmNotificationsProps = {
  forecast3Days: Record<string, Array<any>>
  activeDay: string
}

//TODO make keyboard friendly
//TODO notifications for mph $ °F
const AlarmNotifications: React.FC<AlarmNotificationsProps> = ({ forecast3Days, activeDay }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [showNotification, setShowNotification] = useState(NotificationsInit) //TODO merge with settings & extend
  const [alarms, setAlarms] = useState<AlarmTypes[] | null>(null)
  const [settings, setSettings] = useLocalStorage("NotificationsSettings", settingsObj)

  //SETS DATA FOR ALARMS
  useEffect(() => {
    const rain: Array<Record<string, any>> = []
    const temperature: Array<Record<string, any>> = []
    const wind: Array<Record<string, any>> = []

    forecast3Days[activeDay] && forecast3Days[activeDay].forEach((hour: HourObj) => {
      const tempConverted = +convertTemp(undefined, hour.main.temp) //TODO resolve undefined
      const windConverted = convertWindSpeed(hour.wind.speed)
      const rainValue = hour.rain && Object.values(hour.rain)[0]
      if (hour.rain && rainValue > +settings.rain?.max) {
        rain.push(hour)
      }
      if (windConverted > +settings.wind?.max || windConverted < +settings.wind?.min) {
        wind.push(hour)
      }
      if (tempConverted > +settings.temperature?.max || tempConverted < +settings.temperature?.min) {
        temperature.push(hour)
      }
    })

    if (rain.length > 0 || temperature.length > 0 || wind.length > 0) {
      setAlarms([{ rain }, { temperature }, { wind }])
    }
  }, [forecast3Days, activeDay, setAlarms, settings])

  const toggleOpen = (alarmType: AlarmName) => {
    setShowNotification((state) => {
      return {
        ...state,
        [alarmType]: !state[alarmType]
      }
    })
  }
  const areThereAlarms = alarms?.some(alarm => Object.values(alarm).length)

  return <>
    <AlarmNotificationsSection>
      <HeaderWrapper onClick={() => setShowPopup(true)}>
        <IconContainer>
          <Emoji title="alarm" emoji="🚨" />
        </IconContainer>
        <Title>Alarms | Options</Title>
        <IconContainer>
          <Emoji title="alarm" emoji="⚙️" />
        </IconContainer>
      </HeaderWrapper>
      <div>
        {
          areThereAlarms ? alarms.map((alarm: AlarmTypes, i) => {
            const name = notifications[i] as AlarmName
            if ((alarm[name]).length > 0) {
              return (
                <AlarmsContainer key={i}>
                  <HeaderWrapper onClick={() => toggleOpen(name)}>
                    <IconContainer>
                      {renderEmoji(name)}
                    </IconContainer>
                    <Title>{name}</Title>
                  </HeaderWrapper>
                  <StateWrapper toggleOpen={showNotification[name]}>
                    <AlarmsTime>
                      {
                        alarm[name].map((hourForecast: HourObj) => {
                          const windSpeed: number = +convertWindSpeed(hourForecast.wind.speed)
                          const temperature = +convertTemp(undefined, hourForecast.main.temp)
                          const hour = hourForecast.dt_txt.slice(hourForecast.dt_txt.length - 8, hourForecast.dt_txt.length - 8 + 5)
                          const value = i === 0 ? hourForecast.rain["3h"] : i === 1 ? temperature : windSpeed
                          const valueFormat = i === 0 ? ValueFormats.RAIN : i === 1 ? ValueFormats.TEMP : ValueFormats.KM

                          return (
                            <div key={hourForecast.dt}>
                              <TimeWrapper>
                                <HourFormat>
                                  <div style={{paddingBottom: '4px'}}>
                                    <span>{hour}</span>
                                  </div>
                                  <div>
                                    <span style={{fontSize: '13px'}}>{value}</span>
                                    <ValueFormat>{valueFormat}</ValueFormat>
                                  </div>
                                </HourFormat>
                              </TimeWrapper>
                            </div>
                          )
                        })
                      }
                    </AlarmsTime>
                  </StateWrapper>
                </AlarmsContainer>
              )
            } else return null
          }) : <AlarmsTime>None</AlarmsTime>
        }
      </div>

    </AlarmNotificationsSection>;
    {showPopup && <Popup
      setShowPopup={setShowPopup}
      content={
        <NotificationOptions
          options={settings}
          setOptions={setSettings}
        />
      } />
    }
  </>
};

export { AlarmNotifications };
