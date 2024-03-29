import React from 'react'
import './Days.scss'
import Moment from 'react-moment'
import { days } from '../../../config/config'
import { DaysType } from '../../../config/types'

type DaysProps = {
  activeDay: DaysType
  setActiveDay: (day: DaysType) => DaysType
}

export const Days: React.FC<DaysProps> = ({ activeDay, setActiveDay }) => {
  const time = new Date().getHours()
  const isTimeBetween23and24 = time >= 23 && time < 24

  return (
    <>
      <div className='container__days-forecast'>
        <ul className='days'>
          {days.map((day, i) => {
            return (
              <li
                key={i}
                onClick={() => setActiveDay(day)}>
                <button className={activeDay === day ? 'tab-is-active' : 'tab-is-inactive'}>
                  {
                    <Moment
                      format='dddd'
                      add={{ days: isTimeBetween23and24 ? i + 1 : i }}
                    />
                  }
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
