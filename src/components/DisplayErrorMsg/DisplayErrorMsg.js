import React, { useEffect, useContext } from "react";
import "./DisplayErrorMsg.scss";
import { ErrorMsgContext, ShowErrorContext } from "../../App";

//TODO use reducer to join error messages in one object
//TODO v.1.1 display error if input is blank

export default function DisplayErrorMsg() {
  const { showError, setShowError } = useContext(ShowErrorContext);
  const { errorMsg, setErrorMsg } = useContext(ErrorMsgContext);

  useEffect(() => {
    const showErrorMsg = () => {
      setTimeout(() => {
        setShowError(false);
      }, 1500);
    };
    // console.log("showError", showError);
    showError && showErrorMsg();
  }, [setShowError, showError]);

  return (
    <>
      <br></br>
      <p
        className="error-message"
        style={showError ? { display: "block" } : { display: "none" }}
      >
        {errorMsg.error}
      </p>
    </>
  );
}
