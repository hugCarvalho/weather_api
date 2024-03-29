import React from "react"
import styled from "styled-components"

const BackDrop = styled.section`
  background-color: #00000067;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Content = styled.div`
  background-color: #ffffff;
  min-width: 310px;
  width: 25%;
  //height: 50%;
  height: auto;
  border-radius: 6px;
  padding: 16px 10px;
  position: relative;
`
export const BtnContainer = styled.div`
  width: 100%;
  height: 0px;
  position: relative;
  text-align: right;
`
export const CloseBtn = styled.button`
  position: sticky;  
  padding: 2px; 
`

type PopupProps = {
  setShowPopup: any //change
  content: unknown
}

const Popup: React.FC<PopupProps> = ({ setShowPopup, content }) => {
  return <BackDrop onClick={() => setShowPopup(false)}>
    <Content onClick={(e) => e.stopPropagation()}>
      <BtnContainer>
        <CloseBtn onClick={() => setShowPopup(false)}>X</CloseBtn>
      </BtnContainer>
      {content}
    </Content>
  </BackDrop >
}

export { Popup }