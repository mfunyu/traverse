import React from "react";
import "../styles/NavigationBar.css";

function NavigationBar () {
  return (
    <div className="navbar">
      <div className="brand">Traverse</div>
      <div className="nav-buttons">
        <button>Clear</button>
      </div>
    </div>
  );
}

export default NavigationBar;
