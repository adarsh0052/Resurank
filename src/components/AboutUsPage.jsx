import React from "react";
import "./style.css";

function AboutUsPage() {
  return (
    <div className="about-page-wrapper">
      {/* About ResuRank Hero Section at Top */}
      <div className="about-hero">
        <h1 className="about-title">About ResuRank</h1>
        <p className="about-intro">
          ResuRank is a powerful AI-driven resume screening platform built to simplify and accelerate the hiring process.
          We're on a mission to empower recruiters with intelligent tools that cut through the noise and surface the most relevant candidates — fast.
        </p>
      </div>

      {/* Video and Approach Section Side by Side */}
      <div className="top-section-container">
        <div className="video-container">
          <video className="about-video"  autoPlay muted loop>
            <source src="src\assets\WhatsApp Video 2025-04-19 at 15.30.01.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="approach-content">
          <h2>Our Approach</h2>
          <p>
            At ResuRank, we believe that recruitment should be about connecting the right talent with the right opportunities. 
            Our platform combines natural language processing, machine learning, and industry expertise to create a holistic 
            evaluation system that goes beyond traditional keyword matching.
          </p>
          <p>
            We developed our technology in collaboration with HR professionals, hiring managers, and industry experts to ensure 
            it meets real-world recruitment needs. Our approach balances technological innovation with human expertise, 
            creating a solution that enhances rather than replaces the human element in hiring.
          </p>
          <p>
            We're committed to continuous improvement and regularly refine our algorithms based on new research and client feedback 
            to ensure the highest accuracy and fairness in candidate evaluation.
          </p>
        </div>
      </div>

      <div className="about-content">
        {/* 2x2 Grid for Story, Values, Mission and Vision */}
        <div className="grid-container">
          {/* Company Story Section */}
          <section className="about-section story-section">
            <div className="section-icon">📖</div>
            <div className="section-content">
              <h2>Our Story</h2>
              <p>
                ResuRank was founded in 2023 by a team of HR professionals and AI engineers who experienced firsthand the challenges of modern recruitment. 
                After witnessing countless qualified candidates overlooked due to inefficient resume screening processes, we set out to create a solution.
              </p>
              <p>
                What began as a small project to help streamline recruitment has evolved into a comprehensive platform serving businesses of all sizes. 
                Today, we're proud to have helped thousands of companies make better hiring decisions through intelligent automation.
              </p>
            </div>
          </section>

          {/* Company Values Section */}
          <section className="about-section values-section">
            <div className="section-icon">💎</div>
            <div className="section-content">
              <h2>Our Values</h2>
              <p>
                <strong>Innovation:</strong> We constantly push boundaries to develop cutting-edge solutions that redefine recruitment.
              </p>
              <p>
                <strong>Fairness:</strong> We're committed to reducing bias in hiring through objective, skills-based candidate evaluation.
              </p>
              <p>
                <strong>Efficiency:</strong> We believe in working smarter, not harder—saving our clients time and resources through intelligent automation.
              </p>
              <p>
                <strong>Transparency:</strong> We maintain open communication with our clients and provide explainable AI decisions.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="about-section mission-section">
            <div className="section-icon">🚀</div>
            <div className="section-content">
              <h2>Our Mission</h2>
              <p>
                Our mission is to make hiring smarter, faster, and fairer. We believe great candidates shouldn't be lost in the stack,
                and recruiters shouldn't spend hours manually sorting resumes.
              </p>
              <p>
                By harnessing the power of artificial intelligence, we're transforming how companies identify talent, 
                reducing bias in the hiring process, and helping organizations build diverse, high-performing teams.
              </p>
            </div>
          </section>

          {/* Vision Section */}
          <section className="about-section vision-section">
            <div className="section-icon">🎯</div>
            <div className="section-content">
              <h2>Our Vision</h2>
              <p>
                We envision a world where technology and talent connect effortlessly. ResuRank aims to be the go-to platform
                for automated candidate evaluation — saving time and improving decision quality across all industries.
              </p>
              <p>
                In the future we see, recruiters focus on meaningful candidate interactions while our AI handles the heavy lifting 
                of resume analysis, skills matching, and preliminary assessments.
              </p>
            </div>
          </section>
        </div>

        {/* Company Journey Section */}
        {/* <section className="about-section journey-section">
          <div className="section-icon">🗺️</div>
          <div className="section-content">
            <h2>Our Journey</h2>
            <div className="journey-timeline">
              <div className="timeline-item">
                <div className="timeline-marker">2023</div>
                <div className="timeline-content">
                  <h3>The Beginning</h3>
                  <p>ResuRank started as a prototype built to help a local recruiting agency. Our initial algorithm could match key skills to job requirements.</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-marker">2024</div>
                <div className="timeline-content">
                  <h3>Growth & Recognition</h3>
                  <p>Expanded our capabilities with advanced NLP features and secured our first enterprise clients. Named "Top HR Tech Startup" by Industry Today.</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-marker">2025</div>
                <div className="timeline-content">
                  <h3>Present Day</h3>
                  <p>Now serving over 500 companies worldwide with continuous platform improvements and a growing team dedicated to recruitment innovation.</p>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </div>
      
      <div className="cta-section">
        <h2>Ready to Transform Your Hiring Process?</h2>
        <p>Join thousands of companies using ResuRank to find their ideal candidates faster.</p>
        <button className="cta-button">Request a Demo</button>
      </div>
    </div>
  );
}

export default AboutUsPage;