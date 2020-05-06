import React from "react";
import "./Header.scss";

//TODO: search icon for options (cog style)
//TODO: see font weigth 500

export default function Header() {
  return (
    <>
      <header className="page-header">
        {/* <div className="options">Options</div> */}
        <div className="wrapper__header">
          <h1>Weatherjetzt</h1>
          <p>Get your weather everywhere. Or almost...</p>
        </div>
      </header>
    </>
  );
}

//Photo by Nathaniel Yeo on Unsplash
