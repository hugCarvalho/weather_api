import Emoji from "components/Utils/Emoji/Emoji";
import { Popup } from "components/Utils/Popup/Popup";
import React, { useEffect, useState } from "react";
import { convertTemp } from "../Utils/convertTemp";
import { convertWindSpeed } from "../Utils/convertWindSpeed";
import { StateWrapper, AlarmNotificationsSection, IconContainer, AlarmsContainer, HeaderWrapper, Title, AlarmsTime, TimeWrapper, HourFormat, ValueFormat } from "./NotificationsStyles";
import { NotificationOptions } from "./NotificationOptions";
import { NotificationsInit, alarmTypes, settingsObj, SettingsType } from "./optionsDatabase";
import { renderEmoji } from "./functions";

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

const AlarmNotifications: React.FC<AlarmNotificationsProps> = ({ forecast3Days, activeDay }) => {
  const [showPopup, setShowPopup] = useState(true)
  const [showNotification, setShowNotification] = useState(NotificationsInit) //TODO merge with settings & extend
  const [alarms, setAlarms] = useState<AlarmTypes[] | null>(null)
  const [settings, setSettings] = useState<SettingsType>(settingsObj)

  //SETS DATA FOR ALARMS
  useEffect(() => {
    const rain: Array<Record<string, any>> = []
    const temperature: Array<Record<string, any>> = []
    const wind: Array<Record<string, any>> = []

    forecast3Days[activeDay] && forecast3Days[activeDay].forEach(hour => {
      const tempConverted = +convertTemp(undefined, hour.main.temperature) //TODO resolve undefined
      const windConverted = convertWindSpeed(hour.wind.speed)
      const rainValue = Object.values(hour.rain)[0]

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

  const setIsAlarmContentOpen = (alarmType) => {
    console.log(alarmType)
    setShowNotification((state) => {
      return {
        ...state,
        [alarmType]: !state[alarmType]
      }
    })
  }
  const areThereAlarms = alarms?.some(item => Object.values(item).length)

  useEffect(() => {
    // console.log("rain", alarmRain)
    // console.log("temperature", settings.temperature)

  }, [settings])

  return <>
    <AlarmNotificationsSection>
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
                  <StateWrapper isContentOpen={showNotification[alarmName]}>
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