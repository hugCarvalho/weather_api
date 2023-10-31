import React from 'react'
import './DisplayCityName.scss'
import { ClipLoader } from 'react-spinners'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CityName = styled.h2`
  padding: 15px 3px 20px;
  text-align: center;
  color: #faf9f9;
  letter-spacing: 2px;
  font-size: 20px;

  @media (min-width: 768px) {
    font-size: 26px;
  }
`

export default function DisplayCityName({ validCity, isLoading }) {
  return (
    <>
      <CityName>
        <h2>
          {isLoading && validCity ? <ClipLoader color='white' /> : validCity.toUpperCase() || 'Search for a city'}
        </h2>
      </CityName>
    </>
  )
}

DisplayCityName.propTypes = {
  validCity: PropTypes.string,
  isLoading: PropTypes.bool,
}
