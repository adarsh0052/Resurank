import React from "react";
import { Link } from "react-router-dom";
import "./style.css";


function Header() {
  return (
    <header className="header">
      <div className="header-container">
        {/* Left: Logo and brand name */}
        <div className="logo-section">
          <img src="/LOGO.png" alt="logo" className="logo-img" style={{ height: '70px', width: '70px' }} />
          <span className="brand-name" style={{ marginLeft: '30px'}}>RESURANK</span>
        
        </div>

    
        <nav className="nav-links">
          <div className="nav-item dropdown" > 
            <a href="/" style={{ color: '#f9fafb',textDecoration:'none' }}>Home</a>
           
          </div>
          <div className="nav-item dropdown">
          <a href="/pricing"style={{ color: '#f9fafb', textDecoration: 'none' }} >Pricing</a>
            
          </div>
          <div className="nav-item dropdown">
          <a href="/tools" style={{ color: '#f9fafb', textDecoration: 'none' }}>Tools</a>
            
          </div>
          <div className="nav-item dropdown">
            <a href="/about" style={{ color: '#f9fafb', textDecoration: 'none' }}>About Us</a>
           
          </div>
          <div className="nav-item dropdown">
            <a href="/help"style={{ color: '#f9fafb', textDecoration: 'none' }}>Help</a>
          
          </div>
        </nav>

        {/* Right: Auth buttons */}
        <div className="auth-buttons">
        <Link to="/login">
          <button className="sign-in">Log In</button>
        </Link> 
       <Link to="/signup">  
          <button className="sign-in">Sign Up</button>
        </Link> 
          
        </div>
      </div>
       
    </header>
  );
}

export default Header;
