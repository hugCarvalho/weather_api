import React, { useEffect, useContext } from "react";
import "./DisplayErrorMsg.scss";
import { ErrorMsgContext, ShowErrorContext } from "../../App";

//TODO use reducer to join error messages in one object

export default function DisplayErrorMsg() {
  const { showError, setShowError } = useContext(ShowErrorContext);
  const { errorMsg, setErrorMsg } = useContext(ErrorMsgContext);

  useEffect(() => {
    const showErrorMsg = () => {
      setTimeout(() => {
        setShowError(false);
      }, 1500);
    };
    console.log("showError", showError);
    showError && showErrorMsg();
  }, [setShowError, showError]);

  console.log("errorMsg2", errorMsg);
  return (
    <>
      <p
        className="error-message"
        style={showError ? { display: "block" } : { display: "none" }}
      >
        {errorMsg.error}
      </p>
    </>
  );
}
