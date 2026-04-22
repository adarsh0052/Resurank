import React from "react";
import "./style.css";

function HelpPage() {
  return (
    <div className="help-page-wrapper">
      <div className="help-header">
        <h1 className="help-title">Need Help? We've Got You.</h1>
        <p className="help-intro">
          Whether you're just getting started or need assistance with specific tools, we're here to support you every step of the way.
        </p>
      </div>

      <div className="help-container">
        <div className="help-content">
          <section className="help-section">
            <h2>🛠 Getting Started</h2>
            <p>
              To begin using ResuRank, sign up, upload your resumes in bulk, and select the role you want to hire for. Our AI takes care of the rest!
            </p>
            <ul className="help-list">
              <li>Create your account with your business email</li>
              <li>Set up your company profile and hiring preferences</li>
              <li>Upload your first batch of resumes to analyze</li>
              <li>Review AI-generated insights and rankings</li>
            </ul>
          </section>

          <section className="help-section">
            <h2>💡 Key Features</h2>
            <div className="feature-grid">
              <div className="feature-item">
                <h3>Bulk Resume Analysis</h3>
                <p>Process hundreds of resumes simultaneously with our powerful AI engine.</p>
              </div>
              <div className="feature-item">
                <h3>Skills Matching</h3>
                <p>Automatically detect and match candidate skills to your job requirements.</p>
              </div>
              <div className="feature-item">
                <h3>Candidate Ranking</h3>
                <p>Get a prioritized list of candidates based on your specific criteria.</p>
              </div>
              <div className="feature-item">
                <h3>Interview Questions</h3>
                <p>Generate tailored interview questions based on resume content.</p>
              </div>
            </div>
          </section>

          <section className="help-section">
            <h2>📚 FAQs</h2>
            <div className="faq-container">
              <div className="faq-item">
                <p className="faq-question">Can I upload multiple resumes at once?</p>
                <p className="faq-answer">Yes! ResuRank supports bulk uploads for maximum efficiency.</p>
              </div>
              <div className="faq-item">
                <p className="faq-question">Is my data secure?</p>
                <p className="faq-answer">Absolutely. We use encrypted data handling and never store your resumes permanently.</p>
              </div>
              <div className="faq-item">
                <p className="faq-question">How accurate is the AI matching?</p>
                <p className="faq-answer">Our AI achieves 94% accuracy in identifying relevant skills and experience for your roles.</p>
              </div>
            </div>
          </section>

          <section className="help-section">
            <h2>🎓 Video Tutorials</h2>
            <div className="tutorials-list">
              <div className="tutorial-item">
                <span className="tutorial-icon">▶️</span>
                <span className="tutorial-title">Getting Started with ResuRank</span>
                <span className="tutorial-duration">3:45</span>
              </div>
              <div className="tutorial-item">
                <span className="tutorial-icon">▶️</span>
                <span className="tutorial-title">Advanced Filtering Techniques</span>
                <span className="tutorial-duration">5:12</span>
              </div>
              <div className="tutorial-item">
                <span className="tutorial-icon">▶️</span>
                <span className="tutorial-title">Creating Custom Hiring Templates</span>
                <span className="tutorial-duration">4:30</span>
              </div>
            </div>
          </section>

          <section className="help-section">
            <h2>📩 Contact Support</h2>
            <p>
              Still stuck? Our support team is ready to help you succeed with ResuRank.
            </p>
            <div className="support-options">
              <div className="support-option">
                <h3>Email Support</h3>
                <p>Reach out anytime at <a href="mailto:support@resurank.com">support@resurank.com</a></p>
                <p className="support-note">We usually respond within 24 hours</p>
              </div>
              <div className="support-option">
                <h3>Live Chat</h3>
                <p>Available Monday-Friday, 9am-5pm EST</p>
                <button className="chat-button">Start Chat</button>
              </div>
            </div>
          </section>
        </div>

        <div className="help-image-section">
          <img src="/3b3dac97d6172f786d95efb9f35bc117.jpg" alt="ResuRank support team" className="help-image" />
          <div className="image-caption">
            <h4>Our dedicated support team is here to help you streamline your hiring process</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;