import styled from 'styled-components'

export const AlarmNotificationsSection = styled.section`
  width: 300px;
  position: absolute;
  top: 0;
  right: 0;
  padding: 7px 0px 7px 7px;
  font-size: 14px;
  background-color: ;
  @media (max-width: 960px) {
    width: 100%;
    /* background-color: lime; */
    margin: 0px 0 0 0;
    position: relative;
    padding: 7px 7px 7px 7px;
  }
`
export const AlarmsContainer = styled.div``
export const AlarmSettingsMobile = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 16px;
  padding: 7px;
  cursor: pointer;
`
export const HeaderWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;

  background-color: #5d5c5c;
  padding: 4px 0;
  border-bottom: 1px solid gray;
  /* border: 1px solid #5d5c5c; */
  border-radius: 15px 0 0 15px;
  z-index: 10;
  cursor: pointer;

  @media (max-width: 960px) {
    text-align: center;
    border-radius: 15px;
    justify-content: center;
    border: 1px solid #5d5c5c;
    background-color: transparent;
    border-top: none;
    border-left: none;
    border-right: none;
  }
`
export const IconContainer = styled.div`
  width: 28px;
  padding-left: 6px;
`
export const Title = styled.h4`
  color: white;
`
export const StateWrapper = styled.div<{ toggleOpen: boolean }>`
  display: ${(props) => (props.toggleOpen ? 'block' : 'none')};
`
export const AlarmsTime = styled.div`
  color: white;
  position: relative;
  margin-left: 10px;
  margin-right: 10px;
  padding: 5px 0px 0 3px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  /* border-radius: 4px; */
  /* background-color: #8a8a8a; */
`
export const TimeWrapper = styled.div`
  display: flex;
  text-align: center;
  margin: 0 3px 3px 0;

  /* background-color: red; */
  @media (max-width: 960px) {
    font-size: small;
  }
`
export const HourFormat = styled.div`
  display: flex;
  flex-direction: column;
`
export const ValueFormat = styled.span`
  font-size: smaller;
`
