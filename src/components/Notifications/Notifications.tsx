import Emoji from 'components/Utils/Emoji/Emoji';
import { Popup } from 'components/Utils/Popup/Popup';
import React, { useEffect, useState } from 'react';
import { useDeviceType } from '../../hooks/useDeviceType.js';
import { useLocalStorage } from '../../hooks/useLocalStorage.js';
import { convertTemp } from '../Utils/convertTemp';
import { convertWindSpeed } from '../Utils/convertWindSpeed';
import { NotificationOptions } from './NotificationOptions';
import { renderEmoji } from './functions';
import {
  AlarmNotificationsSection,
  AlarmsContainer,
  AlarmSettingsMobile,
  DataCell,
  HeaderWrapper,
  HorizontalScrollWrapper,
  IconContainer,
  NotificationTable,
  StateWrapper,
  StickyCell,
  TimeHeader,
  Title
} from './styles/NotificationsStyles';

import { settingsObj } from 'config/config';
import { HourObj } from 'config/types';

// Types
type AlarmTypes = {
  rain?: HourObj[];
  temperature?: HourObj[];
  wind?: HourObj[];
};

export type AlarmNotificationsProps = {
  forecast3Days: Record<string, Array<HourObj>>;
  activeDay: string;
};

const AlarmNotifications: React.FC<AlarmNotificationsProps> = ({ forecast3Days, activeDay }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [alarms, setAlarms] = useState<AlarmTypes[] | null>(null);
  const [settings, setSettings] = useLocalStorage('NotificationsSettings', settingsObj);
  const isMobile = useDeviceType();

  // 1. DATA FILTERING (Logic from original code)
  useEffect(() => {
    const rain: HourObj[] = [];
    const temperature: HourObj[] = [];
    const wind: HourObj[] = [];

    if (forecast3Days[activeDay]) {
      forecast3Days[activeDay].forEach((hour: HourObj) => {
        const tempConverted = +convertTemp(undefined, hour.main.temp);
        const windConverted = +convertWindSpeed(hour.wind.speed);
        const rainValue = hour.rain ? Object.values(hour.rain)[0] : 0;

        if (hour.rain && rainValue > +settings.rain?.max) {
          rain.push(hour);
        }
        if (windConverted > +settings.wind?.max || windConverted < +settings.wind?.min) {
          wind.push(hour);
        }
        if (tempConverted > +settings.temperature?.max || tempConverted < +settings.temperature?.min) {
          temperature.push(hour);
        }
      });
    }

    if (rain.length > 0 || temperature.length > 0 || wind.length > 0) {
      setAlarms([{ rain }, { temperature }, { wind }]);
    } else {
      setAlarms(null);
    }
  }, [forecast3Days, activeDay, settings]);

  // 2. MATRIX DATA TRANSFORMATION
  // Create a map: TimeString -> { rainVal, tempVal, windVal }
  const groupedByHour: Record<string, { rain?: string | number; temp?: string | number; wind?: string | number }> = {};

  alarms?.forEach((alarmGroup) => {
    const type = Object.keys(alarmGroup)[0] as keyof AlarmTypes;
    const items = alarmGroup[type] as HourObj[];

    items.forEach((item) => {
      const time = item.dt_txt.slice(11, 16);
      if (!groupedByHour[time]) groupedByHour[time] = {};

      if (type === 'rain') groupedByHour[time].rain = item.rain ? Object.values(item.rain)[0] : '-';
      if (type === 'temperature') groupedByHour[time].temp = +convertTemp(undefined, item.main.temp);
      if (type === 'wind') groupedByHour[time].wind = +convertWindSpeed(item.wind.speed);
    });
  });

  const hours = Object.keys(groupedByHour).sort();
  const hasAlarms = hours.length > 0;

  return (
    <>
      {isMobile && (
        <AlarmSettingsMobile onClick={() => setShowPopup(true)}>
          <IconContainer>
            <Emoji title='alarm' emoji='🚨' />
          </IconContainer>
        </AlarmSettingsMobile>
      )}

      <AlarmNotificationsSection>
        {!isMobile && (
          <HeaderWrapper onClick={() => setShowPopup(true)}>
            <IconContainer>
              <Emoji title='alarm' emoji='🚨' />
            </IconContainer>
            <Title>Settings</Title>
          </HeaderWrapper>
        )}

        <AlarmsContainer>
          {hasAlarms ? (
            <>
              <HeaderWrapper onClick={() => setIsOpen(!isOpen)} style={{ marginTop: '5px' }}>
                <Title style={{ paddingLeft: '10px' }}>
                  {isOpen ? '☔ Rain(mm) 💨 Wind (km)  🌡️ Temp (°) ▲' : '▼'}
                </Title>
              </HeaderWrapper>
              {/* Alarm Notifications Table */}
              <StateWrapper toggleOpen={isOpen}>
                <HorizontalScrollWrapper>
                  <NotificationTable>
                    <thead>
                      <tr>
                        <StickyCell /> {/* Completely empty header cell */}
                        {hours.map((time) => (
                          <TimeHeader key={time}>{time}</TimeHeader>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <StickyCell>{renderEmoji('rain')}</StickyCell>
                        {hours.map((time) => (
                          <DataCell key={time}>{groupedByHour[time].rain ?? '-'}</DataCell>
                        ))}
                      </tr>
                      <tr>
                        <StickyCell>{renderEmoji('temperature')}</StickyCell>
                        {hours.map((time) => (
                          <DataCell key={time}>{groupedByHour[time].temp ?? '-'}</DataCell>
                        ))}
                      </tr>
                      <tr>
                        <StickyCell>{renderEmoji('wind')}</StickyCell>
                        {hours.map((time) => (
                          <DataCell key={time}>{groupedByHour[time].wind ?? '-'}</DataCell>
                        ))}
                      </tr>
                    </tbody>
                  </NotificationTable>
                </HorizontalScrollWrapper>
              </StateWrapper>

            </>
          ) : (
            <div style={{ color: '#888', textAlign: 'center', fontSize: '12px', marginTop: '10px' }}>
              No active alarms
            </div>
          )}
        </AlarmsContainer>
      </AlarmNotificationsSection>

      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          content={
            <NotificationOptions
              options={settings}
              setOptions={setSettings}
            />
          }
        />
      )}
    </>
  );
};

export { AlarmNotifications };
