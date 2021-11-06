import React from "react"
import styled from "styled-components"




const DefaultHeadline = styled.div`
  display: flex;
  justify-content: space-between;
`
const OpenClose = styled.div`
  display: flex;
`
const ShowAlarmsWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  `
const OpenContainer = styled.div`
  background-color: lime;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

`

const CloseContainer = styled(OpenContainer)`
  background-color: orange;
`
const Name = styled.span`
  /* padding-top: 5px; */
`

const NotificationOptions = ({isContentOpen, setIsAlarmContentOpen}) => {
  return <div>
    <h1>Options</h1>
    <div>
      <DefaultHeadline>
        <span>Default behaviour of alarm boxes:</span>
        <OpenClose>
          <OpenContainer>Open</OpenContainer>
          <CloseContainer>Close</CloseContainer>
        </OpenClose>
      </DefaultHeadline>
    </div>
    <ul>
      <ShowAlarmsWrapper>
        <Name>Rain</Name>
        <div>
          <OpenClose>
          <OpenContainer>
              <input type="radio" name="option" value="open" id="rain-open" checked={isContentOpen.rainDefault}
                onChange={() => {
                  if (!isContentOpen.rainDefault) {
                    setIsAlarmContentOpen("rainDefault")
                  }
                }}
              />
          </OpenContainer>
          <CloseContainer>
              <input
                type="radio" name="option" value="close" id="rain-close" checked={!isContentOpen.rainDefault}
                onChange={() => {
                  if (isContentOpen.rainDefault) {
                    setIsAlarmContentOpen("rainDefault")
                  }
                }}
              />
          </CloseContainer>
          </OpenClose>
          {/* <label htmlFor="rain-open">hum</label> */}
        </div>
      </ShowAlarmsWrapper>
      <ShowAlarmsWrapper>
        <span>Wind</span>
        
      </ShowAlarmsWrapper>
      <ShowAlarmsWrapper>
        <span>Temp</span>
        
      </ShowAlarmsWrapper>
      
    </ul>
  </div>
}

export {NotificationOptions}