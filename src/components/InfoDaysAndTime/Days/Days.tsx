import React from 'react'
import Moment from 'react-moment'
import { days } from '../../../config/config'
import { DaysType } from '../../../config/types'
import './Days.scss'

type DaysProps = {
  activeDay: DaysType
  setActiveDay: (day: DaysType) => DaysType
}

export const Days: React.FC<DaysProps> = ({ activeDay, setActiveDay }) => {
  const time = new Date().getHours()
  const isTimeBetween23and24 = time >= 23 && time < 24
  console.log("days", days)
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
                      format='ddd'
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
