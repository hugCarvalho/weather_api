import styled from "styled-components"

export const AlarmNotificationsContainer = styled.section`
  width: 180px;
  /* background-color: lime; */
  position: absolute;
  top: 0;
  right: 0;
  /* overflow: hidden; */
`
type AlarmsContainerProps = {
  close: boolean
}

export const WrapperIconAlarmsContainer = styled.div<AlarmsContainerProps>`
  background-color: orange;
  display: flex;
  align-items: center;
  flex-direction: row;
    margin: ${props => props.close ? 0 : '0 0 0 150px' };
  /* transform: ${props => props.close ? 'translate(0%)' : 'translate(5px)' }; */
  transition: margin 2s;
  border-radius: 5px 0 0 5px;
`
export const IconContainer = styled.div`
  /* padding: 5px 5px 5px 10px; */
  height: 10px;
  width: 200px;
  background-color: lime;
`

export const AlarmsContainer = styled.div`
  width: 170px;
  position: relative;
  background-color: lightcoral;


`
export const AlarmsList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap; /* is this doing anytinhG? */
  /* TEMP */
  display: none;
`
