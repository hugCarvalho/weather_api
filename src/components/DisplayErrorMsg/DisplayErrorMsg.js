import React, { useEffect, useContext } from "react";
import "./DisplayErrorMsg.scss";
import { ErrorMsgContext, ShowErrorContext } from "../../App";

//TODO use reducer to join error messages in one object

export default function DisplayErrorMsg() {
  const { showError, setShowError } = useContext(ShowErrorContext);
  const { errorMsg } = useContext(ErrorMsgContext);

  useEffect(() => {
    const showErrorMsg = () => {
      setTimeout(() => {
        setShowError(false);
      }, 1200);
    };
    // console.log("showError", showError);
    showError && showErrorMsg();
  }, [setShowError, showError]);

  return (
    <>
      <div className="container__error-message">
        {/* <br></br> */}
        <p
          className="error-message"
          style={showError ? { display: "inline-block" } : { display: "none" }}
        >
          {errorMsg}
        </p>
      </div>
    </>
  );
}
