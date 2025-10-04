import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ErrorContext, UserQueryContext } from '../../App'
import DefaultCityRadioBtn from '../Utils/RadioButtons/RadioButtons'
import { CityCloud } from './SavedCitiesStyled'
const x = React

const accessibility = {
  width: '1px',
  height: '1px',
  position: 'absolute',
  top: 'auto',
  left: '-10000px',
  overflow: 'hidden',
}

// ---------------- Styled Components ----------------
const Container = styled.div`
  width: 90%;
  max-width: 700px;
  margin: 1rem auto;
  overflow: hidden;
  display: grid;
  /* minimal horizontal spacing, original-like vertical spacing */
  grid-column-gap: 3px;
  grid-row-gap: 10px;
  grid-template-rows: 40px 20px 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr auto auto;
  grid-template-areas:
    'city1 city2 city3 city4 open open'
    'radio1 radio2 radio3 radio4 question1 close'
    'save1 save2 save3 save4 question2 close';
  justify-items: center;
  align-items: center;
  transition: height 0.25s ease;
  @media (min-width: 768px) {
    width: 60%;
    grid-column-gap: 6px;
  }
`

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .selected {
    background-color: rgb(107, 102, 102);
    border-radius: 5px;
  }

  &.cityClouds {
    :focus {
      background-color: #9694947c;
    }
    :hover {
      background: #3c3c3c;
      color: white;
      opacity: 0.8;
      border-radius: 5px;
    }
  }

  button {
    border-radius: 5px;
    font-weight: 600;
    font-size: 1.1rem;
    outline: none;
    background: #a6caee75;
    color: white;
    width: 100%;
    height: 100%;
    padding: 0.35rem 0.6rem;
    border: none;
    transition: background 200ms ease-in;
    &:hover {
      background: #6ea8dc;
      cursor: pointer;
    }
  }
`

/* City cloud wrapper with fixed height and desktop growth */
const CityItem = styled(Item)`
  grid-area: ${({ area }) => area};
  width: 85px;
  height: 40px;
  justify-self: center;
  align-self: center;

  @media (min-width: 768px) {
    width: 160px; /* grows on desktop */
  }
`

const RadioBtnWrapper = styled(Item)`
  grid-area: ${({ area }) => area};
  width: 70%;
  justify-self: center;
`

const SaveBtnWrapper = styled(Item)`
  grid-area: ${({ area }) => area};
  justify-self: center;
`

/* Toggle sits in the top-right area ('open open') so it's aligned with clouds */
const ToggleItem = styled.div`
  grid-area: open;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const ToggleButton = styled.button`
  padding: 2px;
  height: 38px;
  background: #a6caee75;
  border: none;
  color: white;
  font-size: 1.3rem;
  transition: background 0.2s ease-in;
  cursor: pointer;

  &:hover {
    background: #6ea8dc;
  }
`

const Icon = styled.i`
  font-size: 1.3rem;
  color: white;
`

// ---------------- COMPONENT ----------------
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
