import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function HomePage() {
  return (
    <div className="home-wrapper">
      {/* Content Block (Image + Text side by side) */}
      <div className="home-section">
        {/* Left: Main Video */}
        <div className="home-left">
          <video className="home-video" autoPlay muted loop>
            <source src="src\assets\WhatsApp Video 2025-04-19 at 16.12.54_585a36ea.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Right: Content */}
        <div className="home-right">
          <h1 className="home-title">Streamline Your Hiring with ResuRank</h1>
          <p className="home-description">
            ResuRank helps recruiters quickly screen resumes and identify top
            candidates based on role-specific parameters. Save time and hire smarter.
          </p>
          <Link to="/signup">
            <button className="get-started-btn">Get Started</button>
          </Link>
        </div>
      </div>

      {/* Horizontal strip with keypoints */}
      <div className="keypoints-strip">
        <div className="keypoint">
          <h3>Fast Screening</h3>
          <p>Quickly sort and rank resumes based on job role requirements.</p>
        </div>
        <div className="keypoint">
          <h3>Accurate Matching</h3>
          <p>AI-driven algorithm ensures the best candidate matches.</p>
        </div>
        <div className="keypoint">
          <h3>Custom Filters</h3>
          <p>Set specific filters to meet your exact hiring needs.</p>
        </div>
        <div className="keypoint">
          <h3>Time-Saving</h3>
          <p>Automate resume screening and reduce time-to-hire.</p>
        </div>
      </div>

      {/* NEW SECTION: Why ResuRank + Animation */}
      <div className="why-resurank-section">
        <div className="why-left">
          <h2>Why ResuRank?</h2>
          <p>
            ResuRank isn't just another hiring tool. It's your intelligent assistant that streamlines your workflow, 
            gives you deep insights on candidates, and makes hiring less of a hassle.
          </p>
          <ul>
            <li>🔍 AI that understands job-specific nuances</li>
            <li>⚙️ Configurable filters to tailor every screening</li>
            <li>📊 Real-time candidate ranking and reports</li>
            <li>🔐 Fully secure, scalable, and cloud-based</li>
          </ul>
        </div>

        <div className="why-right">
          <video className="why-video" autoPlay muted loop>
            <source src="src\assets\WhatsApp Video 2025-04-19 at 15.29.15.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

           


    </div>
  );
}

export default HomePage;
