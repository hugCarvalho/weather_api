import React from "react";
import "./DisplayErrorMsg.scss";

export default function DisplayErrorMsg({ errorMsg, showError }) {
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
