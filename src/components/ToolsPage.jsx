import React from "react";
import { Link } from 'react-router-dom';
import "./style.css";

function ToolsPage() {
  return (
    <div className="tools-page-wrapper">
      {/* Hero Section with Video and Intro */}
      <div className="tools-hero-section">
        <div className="tools-hero-content">
          <h1 className="tools-main-title">Smart Tools for Smarter Hiring</h1>
          <h6 className="tools-main-subtitle">
            Our suite of tools is designed to help recruiters automate and optimize every step of the resume screening process.
          </h6>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">70%</span>
              <span className="stat-label">Time Saved</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3x</span>
              <span className="stat-label">Faster Hiring</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Accuracy</span>
            </div>
          </div>
          <Link to="/resume-screener-bot">
               <button className="tools-cta-button">Get Started</button>
          </Link>
        </div>
        <div className="tools-hero-video">
          <video className="tools-animation" autoPlay muted loop>
            <source src="src\assets\tools.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Tools Features Grid */}
      <div className="tools-features-section">
        <h2 className="tools-section-title">Our Hiring Tools</h2>
        
        <div className="tools-grid">
          <div className="tool-card">
            <div className="tool-icon">🔍</div>
            <div className="tool-content">
              <h3>Resume Analyzer</h3>
              <p>Automatically extract and score key details from resumes using AI. Supports bulk uploads and smart parsing.</p>
            </div>
          </div>
          
          <div className="tool-card">
            <div className="tool-icon">🎯</div>
            <div className="tool-content">
              <h3>Role Matcher</h3>
              <p>Instantly match candidates to job roles using skills, experience, and custom filters tailored to your needs.</p>
            </div>
          </div>
          
          <div className="tool-card">
            <div className="tool-icon">📊</div>
            <div className="tool-content">
              <h3>Candidate Ranking</h3>
              <p>Generate ranked lists of top candidates based on relevance, keywords, and match percentage.</p>
            </div>
          </div>
          
          <div className="tool-card">
            <div className="tool-icon">⚙️</div>
            <div className="tool-content">
              <h3>Custom Filters</h3>
              <p>Create filters for specific qualifications, years of experience, location preferences, and more.</p>
            </div>
          </div>
          
          <div className="tool-card">
            <div className="tool-icon">📥</div>
            <div className="tool-content">
              <h3>Export & Share</h3>
              <p>Download rankings or share shortlisted candidates with your hiring team easily.</p>
            </div>
          </div>
          
          <div className="tool-card highlight-card">
            <div className="tool-content">
              <h3>Ready to streamline your hiring?</h3>
              <p>Try our AI-powered tools today and reduce your screening time by up to 70%.</p>
              <Link to="/resume-screener-bot">
                <button className="tool-action-button">Start Free Trial</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section - Now with 5 steps */}
      <div className="tools-workflow-section">
        <h2 className="tools-section-title">How It Works</h2>
        <div className="workflow-steps">
          <div className="workflow-step">
            <div className="step-number">1</div>
            <h3>Upload Resumes</h3>
            <p>Batch upload multiple resumes in various formats</p>
          </div>
          <div className="workflow-divider"></div>
          
          <div className="workflow-step">
            <div className="step-number">2</div>
            <h3>AI Analysis</h3>
            <p>Our AI extracts skills, experience, and education data</p>
          </div>
          <div className="workflow-divider"></div>
          
          <div className="workflow-step">
            <div className="step-number">3</div>
            <h3>Define Requirements</h3>
            <p>Specify your job requirements and selection criteria</p>
          </div>
          <div className="workflow-divider"></div>
          
          <div className="workflow-step">
            <div className="step-number">4</div>
            <h3>Match & Rank</h3>
            <p>Candidates are automatically scored and ranked</p>
          </div>
          <div className="workflow-divider"></div>
          
          <div className="workflow-step">
            <div className="step-number">5</div>
            <h3>Review Results</h3>
            <p>Get ranked candidate matches with detailed insights</p>
          </div>
        </div>
        <div className="workflow-cta">
        <Link to="/resume-screener-bot">
          <button className="tools-cta-button">Start Your Free Trial Today</button>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default ToolsPage;