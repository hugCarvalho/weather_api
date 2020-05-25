import React, { useEffect, useContext } from "react";
import "./DisplayErrorMsg.scss";
import { ErrorContext } from "../../App";

export default function DisplayErrorMsg() {
  const { error, dispatch } = useContext(ErrorContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch("FALSE");
    }, 1200);

    return () => {
      console.log("CLEANUP");
      clearTimeout(timer);
    };
  }, [error, dispatch]);

  return (
    <>
      <div className="container__error-message">
        <p
          className="error-message"
          style={
            error.showError
              ? { visibility: "visible", background: "#fffb00" }
              : { visibility: "none" }
          }
        >
          {""}
          {error.text}
        </p>
      </div>
    </>
  );
}
