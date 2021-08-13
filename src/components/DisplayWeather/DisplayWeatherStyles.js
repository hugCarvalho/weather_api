import styled from "styled-components"

const RainValue = styled.span`
  font-size: 1.5rem;
  padding: 3px 0 0 0;

  @media (max-width: 992px) {
    font-size: 1.1rem;
  };
`
export const Humidity = styled(RainValue)``
export const AirPressure = styled(RainValue)``

export {RainValue}
