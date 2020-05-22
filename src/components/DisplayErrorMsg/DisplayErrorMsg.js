import React, { useEffect, useContext } from "react";
import "./DisplayErrorMsg.scss";
import { ErrorContext } from "../../App";

export default function DisplayErrorMsg() {
  const { error, dispatch } = useContext(ErrorContext);

  useEffect(() => {
    const showErrorMsg = () => {
      setTimeout(() => {
        dispatch("FALSE");
      }, 1200);
    };
    error.showError && showErrorMsg();
  }, [error, dispatch]);

  return (
    <>
      <div className="container__error-message">
        <p
          className="error-message"
          style={
            error.showError ? { display: "inline-block" } : { display: "none" }
          }
        >
          {error.text}
        </p>
      </div>
    </>
  );
}
