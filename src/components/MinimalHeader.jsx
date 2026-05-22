// components/MinimalHeader.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./style.css"; // Reuse logo styling if needed

function MinimalHeader() {
  return (
    <header className="header">
      <div className="header-container justify-start">
        <Link to="/" className="logo-section flex items-center gap-2">
          <img src="/logopicrr.png" alt="logo" className="logo-img" />
          <span className="brand-name text-xl font-bold">RESURANK</span>
        </Link>
      </div>
    </header>
  );
}

export default MinimalHeader;
