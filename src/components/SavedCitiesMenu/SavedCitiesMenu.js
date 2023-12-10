import React, { useEffect, useState, useContext } from 'react'
import './SavedCitiesMenu.scss'
import DefaultCityRadioBtn from '../Utils/RadioButtons/RadioButtons'
import { ErrorContext, UserQueryContext } from '../../App'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import PropTypes from 'prop-types'
import { CityCloud } from './SavedCitiesStyled'

const accessibility = {
  width: '1px',
  height: '1px',
  position: 'absolute',
  top: 'auto',
  left: '-10000px',
  overflow: 'hidden',
}

//TODO: refactor. Css at least replace buttons with styled components
export default function SavedCitiesMenu({ validCity }) {
  const { setUserQuery } = useContext(UserQueryContext)
  const { dispatchError } = useContext(ErrorContext)

  const [defaultCity, setDefaultCity] = useState('')
  const [isMenuClosed, setIsMenuClosed] = useState(false)
  const [savedCities, setSavedCities] = useState({ city1: '', city2: '', city3: '', city4: '' })

  //LOCAL STORAGE: GET
  useEffect(() => {
    try {
      if (localStorage.weatherApp) {
        setSavedCities(JSON.parse(localStorage.getItem('weatherApp')))
        setIsMenuClosed(JSON.parse(localStorage.getItem('menuClosed')))
      }
    } catch (err) {
      dispatchError({ type: 'TRUE', value: 'Error! File may be corrupted!' })
    }
  }, [dispatchError])

  useEffect(() => {
    try {
      const fetchedDefaultCity = JSON.parse(localStorage.getItem('defaultCity'))

      setDefaultCity(fetchedDefaultCity)

      if (fetchedDefaultCity) {
        setUserQuery(fetchedDefaultCity) //automatically fetches on onload
      }
    } catch (err) {
      dispatchError({ type: 'TRUE', value: 'Error! File may be corrupted!' })
    }
  }, [setUserQuery, dispatchError])

  //LOCAL STORAGE: SET
  useEffect(() => {
    localStorage.setItem('weatherApp', JSON.stringify(savedCities))
  }, [savedCities])
  useEffect(() => {
    localStorage.setItem('defaultCity', JSON.stringify(defaultCity))
  }, [defaultCity])
  useEffect(() => {
    localStorage.setItem('menuClosed', JSON.stringify(isMenuClosed))
  }, [isMenuClosed])

  //FUNCTIONS
  //SET CONTAINER HEIGHT
  const setContainerHeight = () => (isMenuClosed ? { height: '42px' } : { height: 'auto' })

  const showHideOpenArrow = () => {
    return isMenuClosed
      ? {
          visibility: 'visible',
        }
      : { visibility: 'hidden' }
  }

  //SAVE CITY
  const saveCity = (citySlot) => {
    setSavedCities({ ...savedCities, [citySlot]: validCity })
  }

  //VALIDATION
  const checkCityisElegible = (citySlot) => {
    if (!validCity) {
      return dispatchError({ type: 'TRUE', value: 'SEARCH for a valid city first' })
    }

    const cityNameExists = Object.values(savedCities).some((city) => {
      return city.toLowerCase() === validCity.toLowerCase()
    })

    if (cityNameExists) {
      dispatchError({ type: 'TRUE', value: `${validCity} is already saved` })
    } else {
      saveCity(citySlot)
    }
  }

  // Check to prevent saving the same city again
  const checkSlotIsEmpty = (e) => {
    if (e.target.textContent === 'empty') {
      return dispatchError({ type: 'TRUE', value: 'This slot is empty. SAVE a city first' })
    } else setUserQuery(e.target.textContent)
  }

  //CHOOSE DEFAULT CITY
  const chooseDefaultCity = (city) => {
    if (!city) {
      return dispatchError({ type: 'TRUE', value: 'This slot is empty. SAVE a city first' })
    }
    setDefaultCity(city)
  }

  const cities = Object.values(savedCities)
  const citySlots = Object.keys(savedCities)

  return (
    <>
      <div
        className='container__saved-cities-menu'
        style={setContainerHeight()}>
        {/*FAST ACCESS CITIES BUTTONS */}
        {cities.map((city, i) => {
          return (
            <div
              className='items cityClouds'
              key={i}>
              <CityCloud
                className={city && city === validCity ? 'selected' : ''}
                onClick={checkSlotIsEmpty}>
                {city || 'empty'}
              </CityCloud>
            </div>
          )
        })}

        {/* CLOSE MENU */}
        <div className='items items--8 '>
          <button onClick={() => setIsMenuClosed(true)}>
            <i className='fas fa-angle-double-up'></i>
            <span style={accessibility}>open or close saved cities menu</span>
          </button>
        </div>

        {/* OPEN MENU */}
        <div
          className='items items--19'
          style={showHideOpenArrow()}>
          <button
            className='open-menu'
            onClick={() => setIsMenuClosed(false)}>
            <i className='fas fa-angle-double-down'></i>
          </button>
        </div>

        {/* RADIO BTNS*/}
        {cities.map((city, i) => {
          return (
            <div
              className='items radio-btns'
              key={i}>
              <DefaultCityRadioBtn
                value={city}
                defaultCity={defaultCity}
                chooseDefaultCity={chooseDefaultCity}
              />
            </div>
          )
        })}

        {/* TOOLTIP RADIO BUTTONS*/}
        <div className='items items--13'>
          <Tippy
            delay={500}
            content='set a default city to load at startup'>
            <button className='tooltips'>?</button>
          </Tippy>
        </div>

        {/* SAVE CITY BUTTONS */}
        {citySlots.map((city, i) => {
          return (
            <div
              className='items'
              key={i}>
              <button
                className='save-btns'
                onClick={() => checkCityisElegible(city)}>
                Save
              </button>
            </div>
          )
        })}

        {/* TOOLTIP SAVE BUTTON */}
        <div className='items items--23'>
          <Tippy
            delay={400}
            content='SEARCH for a city first. Then press `save`'>
            <button className='tooltips'>?</button>
          </Tippy>
        </div>
      </div>
    </>
  )
}

SavedCitiesMenu.propTypes = {
  validCity: PropTypes.string,
}
