import Tippy from '@tippyjs/react'
import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import 'tippy.js/dist/tippy.css'
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

// Styled Components
const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
  display: grid;
  grid-column-gap: 3px;
  grid-row-gap: 10px;
  grid-template-rows: 40px 20px 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr auto auto;
  grid-template-areas:
    'city1 city2 city3 city4 open open'
    'btn1 btn2 btn3 btn4 question1 close'
    'save1 save2 save3 save4 question2 close';

  @media (min-width: 768px) {
    width: 60%;
    grid-column-gap: 6px;
  }
`

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .tooltips {
    padding: 0 6px;
    &:hover {
      cursor: help;
    }
  }

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
    }
  }

  button {
    border-radius: 5px;
    font-weight: 600;
    font-size: 1.3rem;
    outline: none;
    background: #a6caee75;
    color: white;
    width: 100%;
    height: 100%;
    padding: 0 3px;
    border: none;
    transition: background 250ms ease-in;
  }
`

const CloseItem = styled(Item)`
  grid-area: close;
  width: 20px;
  margin-left: 4px;
`

const OpenItem = styled(Item)`
  grid-area: open;
  width: 20px;
  margin-left: 4px;
`

const RadioBtnWrapper = styled(Item)`
  width: 55%;
  justify-self: center;
`

const SaveBtnWrapper = styled(Item)`
  width: 55%;
  justify-self: center;

  .save-btns {
    width: auto;
    padding: 0 8px;
  }
`

const Icon = styled.i`
  font-size: 1.5rem;
`

// COMPONENT
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
      if (fetchedDefaultCity) setUserQuery(fetchedDefaultCity)
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
  const setContainerHeight = () => (isMenuClosed ? { height: '42px' } : { height: 'auto' })
  const showHideOpenArrow = () => (isMenuClosed ? { visibility: 'visible' } : { visibility: 'hidden' })

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
      {/* FAST ACCESS CITIES BUTTONS */}
      {cities.map((city, i) => (
        <Item className="cityClouds" key={i}>
          <CityCloud
            className={city && city === validCity ? 'selected' : ''}
            onClick={checkSlotIsEmpty}>
            {city || 'empty'}
          </CityCloud>
        </Item>
      ))}

      {/* CLOSE MENU */}
      <CloseItem>
        <button onClick={() => setIsMenuClosed(true)}>
          <Icon className="fas fa-angle-double-up" />
          <span style={accessibility}>open or close saved cities menu</span>
        </button>
      </CloseItem>

      {/* OPEN MENU */}
      <OpenItem style={showHideOpenArrow()}>
        <button className="open-menu" onClick={() => setIsMenuClosed(false)}>
          <Icon className="fas fa-angle-double-down" />
        </button>
      </OpenItem>

      {/* RADIO BTNS */}
      {cities.map((city, i) => (
        <RadioBtnWrapper key={i}>
          <DefaultCityRadioBtn
            value={city}
            defaultCity={defaultCity}
            chooseDefaultCity={chooseDefaultCity}
          />
        </RadioBtnWrapper>
      ))}

      {/* TOOLTIP RADIO BUTTON */}
      <Item>
        <Tippy delay={500} content="set a default city to load at startup">
          <button className="tooltips">?</button>
        </Tippy>
      </Item>

      {/* SAVE CITY BUTTONS */}
      {citySlots.map((city, i) => (
        <SaveBtnWrapper key={i}>
          <button className="save-btns" onClick={() => checkCityisElegible(city)}>
            Save
          </button>
        </SaveBtnWrapper>
      ))}

      {/* TOOLTIP SAVE BUTTON */}
      <Item>
        <Tippy delay={400} content="SEARCH for a city first. Then press `save`">
          <button className="tooltips">?</button>
        </Tippy>
      </Item>
    </Container>
  )
}

SavedCitiesMenu.propTypes = {
  validCity: PropTypes.string,
}
