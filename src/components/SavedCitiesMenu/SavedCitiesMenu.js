import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import { ErrorContext, UserQueryContext } from '../../App'
import DefaultCityRadioBtn from '../Utils/RadioButtons/RadioButtons'
import { CityCloud, CityItem, Container, Icon, RadioBtnWrapper, SaveBtnWrapper, ToggleButton, ToggleItem, } from './SavedCitiesStyled'

// eslint-disable-next-line no-unused-vars
const x = React

const accessibility = {
  width: '1px',
  height: '1px',
  position: 'absolute',
  top: 'auto',
  left: '-10000px',
  overflow: 'hidden',
}

export default function SavedCitiesMenu({ validCity }) {
  const { setUserQuery } = useContext(UserQueryContext)
  const { dispatchError } = useContext(ErrorContext)

  const [defaultCity, setDefaultCity] = useState('')
  const [isMenuClosed, setIsMenuClosed] = useState(false)
  const [savedCities, setSavedCities] = useState({ city1: '', city2: '', city3: '', city4: '' })

  // LOCAL STORAGE: GET
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
      if (fetchedDefaultCity) setUserQuery(fetchedDefaultCity)
    } catch (err) {
      dispatchError({ type: 'TRUE', value: 'Error! File may be corrupted!' })
    }
  }, [setUserQuery, dispatchError])

  // LOCAL STORAGE: SET
  useEffect(() => {
    localStorage.setItem('weatherApp', JSON.stringify(savedCities))
  }, [savedCities])
  useEffect(() => {
    localStorage.setItem('defaultCity', JSON.stringify(defaultCity))
  }, [defaultCity])
  useEffect(() => {
    localStorage.setItem('menuClosed', JSON.stringify(isMenuClosed))
  }, [isMenuClosed])

  // FUNCTIONS
  const setContainerHeight = () => (isMenuClosed ? { height: '42px' } : { height: 'auto' })

  const saveCity = (citySlot) => {
    setSavedCities({ ...savedCities, [citySlot]: validCity })
  }

  const checkCityisElegible = (citySlot) => {
    if (!validCity) {
      return dispatchError({ type: 'TRUE', value: 'SEARCH for a valid city first' })
    }
    const cityNameExists = Object.values(savedCities).some(
      (city) => city.toLowerCase() === validCity.toLowerCase()
    )
    if (cityNameExists) {
      dispatchError({ type: 'TRUE', value: `${validCity} is already saved` })
    } else {
      saveCity(citySlot)
    }
  }

  const checkSlotIsEmpty = (e) => {
    if (e.target.textContent === 'empty') {
      return dispatchError({ type: 'TRUE', value: 'This slot is empty. SAVE a city first' })
    } else setUserQuery(e.target.textContent)
  }

  const chooseDefaultCity = (city) => {
    if (!city) {
      return dispatchError({ type: 'TRUE', value: 'This slot is empty. SAVE a city first' })
    }
    setDefaultCity(city)
  }

  const cities = Object.values(savedCities)
  const citySlots = Object.keys(savedCities)

  return (
    <Container style={setContainerHeight()}>
      {/* FAST ACCESS CITIES */}
      {cities.map((city, i) => (
        <CityItem className="cityClouds" key={i} area={`city${i + 1}`}>
          <CityCloud
            className={city && city === validCity ? 'selected' : ''}
            onClick={checkSlotIsEmpty}>
            {city || 'empty'}
          </CityCloud>
        </CityItem>
      ))}

      {/* TOGGLE BUTTON (fixed at top-right area; icon flips only) */}
      <ToggleItem>
        <ToggleButton onClick={() => setIsMenuClosed(!isMenuClosed)}>
          <Icon className={`fas fa-angle-double-${isMenuClosed ? 'down' : 'up'}`} />
          <span style={accessibility}>toggle saved cities menu</span>
        </ToggleButton>
      </ToggleItem>

      {/* RADIO BTNS */}
      {cities.map((city, i) => (
        <RadioBtnWrapper key={i} area={`radio${i + 1}`}>
          <DefaultCityRadioBtn
            value={city}
            defaultCity={defaultCity}
            chooseDefaultCity={chooseDefaultCity}
          />
        </RadioBtnWrapper>
      ))}

      {/* SAVE CITY BUTTONS */}
      {citySlots.map((city, i) => (
        <SaveBtnWrapper key={i} area={`save${i + 1}`}>
          <button onClick={() => checkCityisElegible(city)}>Save</button>
        </SaveBtnWrapper>
      ))}
    </Container>
  )
}

SavedCitiesMenu.propTypes = {
  validCity: PropTypes.string,
}
