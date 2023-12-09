import PropTypes from 'prop-types'
import { ClipLoader } from 'react-spinners'
import styled from 'styled-components'

const Name = styled.div`
  padding: 5px;
  margin: 15px 0px 0px;
  text-align: center;
  color: #faf9f9;
  letter-spacing: 2px;
  font-size: 17px;

  @media (min-width: 768px) {
    margin: 85px 0px 35px;
    font-size: 24px;
  }
`

export default function CityName({ validCity, isLoading }) {
  return (
    <>
      <Name>
        <h2>
          {isLoading && validCity ? <ClipLoader color='white' /> : validCity.toUpperCase() || 'Search for a city'}
        </h2>
      </Name>
    </>
  )
}

Name.propTypes = {
  validCity: PropTypes.string,
  isLoading: PropTypes.bool,
}
