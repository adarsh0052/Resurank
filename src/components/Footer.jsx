import React from "react";
import "./style.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Navigation links */}
        <div className="footer-links">
          <a href="/" className="footer-link">Home</a>
          <a href="/pricing" className="footer-link">Pricing</a>
          <a href="/about" className="footer-link">About</a>
          <a href="/help" className="footer-link">Help</a>
        </div>
        <p>Phone: +91 23467 87765</p>
        <p>
            Still stuck? Reach out to us anytime at <a href="mailto:support@resurank.com">support@resurank.com</a> — we usually respond within 24 hours!
        </p>

        {/* Copyright */}
        <div className="footer-copy">
          © {new Date().getFullYear()} ResuRank. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
