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
  display: flex;
  flex-direction: column;
  line-height: 18px;
`
export const TemperatureValues = styled.div`
  display: flex;
  margin: 3px 0;
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
  display: flex;
`
export const H1 = styled.h1`
  font-size: 18px;
  text-align: center;
  padding: 0 5px 10px;
`
export const SaveBtn = styled.button`
  margin: 8px auto 16px;
  width: 50%;
`