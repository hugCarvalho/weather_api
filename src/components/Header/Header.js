import React from "react";
import "./Header.scss";

//TODO: put background image - priority: very low
//TODO: search icon for options (cog style)
//TODO: see font weigth 500

export default function Header() {
  return (
    <>
      <header>
        {/* <div className="options">Options</div> */}
        <div className="wrapper__header">
          <h1>Weatherjetzt</h1>
          <p>Get your weather everywhere. Or almost...</p>
        </div>
      </header>
    </>
  );
}
