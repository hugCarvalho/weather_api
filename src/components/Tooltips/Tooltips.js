import React from "react";
import Tippy from "@tippyjs/react";
import "./Tooltips.scss";
import "tippy.js/dist/tippy.css";

export default function Tooltips() {
  return (
    <>
      <div id="what-is">
        <p></p>
        <Tippy
          delay={500}
          content="MUST have a saved city. Weather will automatically be displayed for the selected city"
        >
          <p>?</p>
        </Tippy>
        <Tippy delay={500} content="must contain a valid city name">
          <p>?</p>
        </Tippy>
        <Tippy
          delay={500}
          content="SEARCH for a city and then press the desired save spot"
        >
          <p>?</p>
        </Tippy>
      </div>
    </>
  );
}
