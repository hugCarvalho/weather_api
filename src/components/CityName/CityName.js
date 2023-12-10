import React from 'react'
import { ClipLoader } from 'react-spinners'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CityName = styled.div`
  /* background-color: orange; */
  /* padding: 25px 3px 15px; */
  padding: 5px;
  margin: 25px 0px 15px;
  text-align: center;
  color: #faf9f9;
  letter-spacing: 2px;
  font-size: 17px;

  @media (min-width: 768px) {
    margin: 50px 0px 35px;
    font-size: 24px;
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
