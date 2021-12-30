import styled from "styled-components";

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

export const OptionsTitle = styled.h2`
  padding-top: 10px;
`
export const Input = styled.input`
  width: 45px;
  padding: 0 0 0 2px;
  margin: 0 5px 0 5px;
`
export const H1 = styled.h1`
  font-size: 18px;
  text-align: center;
  padding: 0 5px 10px;
`
export const SaveBtn = styled.button`
  margin: 12px auto 16px;
  width: 100%;
  padding: 6px;
`
