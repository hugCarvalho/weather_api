import React from "react";
import "./Header.scss";

function Header() {
  // console.log("HEADER");
  return (
    <>
      <header className="header">
        <h1>Weatherjetzt</h1>
        <p>Get your weather everywhere. Or almost...</p>
      </header>
    </>
  );
}

export default React.memo(Header);
//TODO:  photo by ???
