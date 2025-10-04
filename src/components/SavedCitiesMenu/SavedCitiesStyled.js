import styled from 'styled-components'

const CityCloud = styled.button`
  text-transform: capitalize;

  @media (min-width: 768px) {
    text-transform: uppercase;
  }
`
export { CityCloud }

export const Container = styled.div`
  width: 99%;
  max-width: 700px;
  margin: 1rem auto;
  overflow: hidden;
  display: grid;
  /* minimal horizontal spacing, original-like vertical spacing */
  grid-column-gap: 2px;
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
  /* @media (min-width: 900px) {
    width: 60%;
    grid-column-gap: 6px;
  } */
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
export const CityItem = styled(Item)`
  grid-area: ${({ area }) => area};
  width: 85px;
  height: 40px;
  justify-self: center;
  align-self: center;

  @media (min-width: 768px) {
    min-width: 160px; /* grows on desktop */
  }
`

export const RadioBtnWrapper = styled(Item)`
  grid-area: ${({ area }) => area};
  width: 70%;
  justify-self: center;
`

export const SaveBtnWrapper = styled(Item)`
  grid-area: ${({ area }) => area};
  justify-self: center;
`

/* Toggle sits in the top-right area ('open open') so it's aligned with clouds */
export const ToggleItem = styled.div`
  grid-area: open;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const ToggleButton = styled.button`
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

export const Icon = styled.i`
  font-size: 1.3rem;
  color: white;
`
