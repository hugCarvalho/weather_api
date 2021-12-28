import styled from "styled-components";

export const DefaultHeadline = styled.div`
  display: flex;
  justify-content: space-between;
`
export const OpenClose = styled.div`
  display: flex;
`
export const ShowAlarmsWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  `
export const OpenContainer = styled.div`
  background-color: lime;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const CloseContainer = styled(OpenContainer)`
  background-color: orange;
  
`
export const Name = styled.span`
  /* padding-top: 5px; */
`
export const OptionsSection = styled.section`
  background-color: pink;
  display: flex;
  flex-direction: column;
`
export const TemperatureValues = styled.div`
  display: flex;
`
export const WindValues = styled(TemperatureValues)``
export const RainValues = styled(TemperatureValues)``

export const Input = styled.input`
  width: 45px;
  padding: 0 0 0 2px;
  margin: 0 0 0 5px;
`
export const WrapperContainer2 = styled.div`
  background-color: lime;
  display: flex
`