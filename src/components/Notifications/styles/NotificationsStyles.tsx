import styled from "styled-components"
//TODO sort
//HERE

export const AlarmNotificationsSection = styled.section`
  width: 300px;
  position: absolute;
  top: 0;
  right: 0;
  padding: 7px;
  font-size: 14px;
  @media (max-width: 620px) {
    display: none
  }
`
export const AlarmsContainer = styled.div`
`
export const HeaderWrapper = styled.div`
  position:relative;
  overflow: hidden;
  display: flex;
  align-items: center;

  background-color: transparent;
  padding: 4px 0;
  border-bottom:1px solid gray;
  border-radius: 15px 0 0 15px;
  z-index: 10;
  cursor: pointer;
`
export const IconContainer = styled.div`
  width: 28px;
  padding-left: 6px;
`
export const Title = styled.h4`
  color: white;
`
export const StateWrapper = styled.div<{ toggleOpen: boolean }>`
  display: ${props => props.toggleOpen ? "block" : "none"};
`
export const AlarmsTime = styled.div`
color: white;
  position: relative;
  margin-left: 8px;
  padding: 5px 0px 0 3px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`
export const TimeWrapper = styled.div`
  display: flex;
  text-align: center;
  margin: 0 3px 3px 0;
`
export const HourFormat = styled.div`
  display: flex;
  flex-direction: column;
`
export const ValueFormat = styled.span`
  font-size: smaller;
`
