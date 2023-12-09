import React from 'react'
import styled from 'styled-components'

const Heading = styled.header`
  //desktop
  padding: 20px 0 14px 0;
  color: whitesmoke;
  text-align: center;

  h1 {
    font-size: 3.6rem;
  }
  p {
    line-height: 24px;
    font-size: 1.5rem;
  }

  @media (max-width: 980px) {
    /* display: none; */

    color: whitesmoke;
    padding: 2px 0 0 0;
    font-size: 1.1rem;

    h1 {
      padding-bottom: 3px;
      font-size: 3rem;
      font-weight: 500;
    }
    p {
      display: none;
    }
  }
`

function Header() {
  return (
    <Heading>
      <h1>Weatherjetzt</h1>
      <p>Get your weather everywhere. Or almost...</p>
    </Heading>
  )
}

export default Header
