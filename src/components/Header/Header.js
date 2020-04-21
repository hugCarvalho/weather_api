import React from "react";
import "./Header.scss";

export default function Header() {
  return (
    <>
      <header>
        <div className="options">Options</div>
        <div className="wrapper-headers">
          <h1>Weatherjetzt</h1>
          <h3>Get your weather everywhere. Or almost...</h3>
        </div>
      </header>
    </>
  );
}

//TODO: put background image - priority: very low
//TODO: search icon for options (cog style) - required
