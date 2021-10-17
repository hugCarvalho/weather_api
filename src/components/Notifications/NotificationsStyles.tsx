import styled from "styled-components"
//TODO sort 
//HERE

export const AlarmNotificationsSection = styled.section`
  width: 150px;
  background-color: #5f645f;
  position: absolute;
  top: 0;
  right: 0;
  /* overflow: hidden; */
`
export const AlarmsContainer = styled.div`
  background-color: aliceblue;
  /* border-radius: 10px 0 0 10px; */
`
export const HeaderWrapper = styled.div`
  position:relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  
  background-color: #696b69;
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
export const Title = styled.h3``

type ContentProps = {
  isContentOpen: boolean
}
export const StateWrapper = styled.div<ContentProps>`
  display: ${ props => props.isContentOpen ? "block" : "none"};

`
export const AlarmsTime = styled.div`
  position: relative;
  background-color: pink;
  margin-left: 7px;
  padding: 3px 0px 0 3px; 
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`
export const TimeWrapper = styled.div`
  /* background-color: orange; */
  display: flex;
  /* flex-direction: column; */
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