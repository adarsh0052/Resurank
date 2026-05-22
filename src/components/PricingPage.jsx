import React from "react";
import "./style.css";
function PricingPage() {
  return (
    <div className="pricing-page-wrapper">
      {/* Left: Pricing Content */}
      <div className="pricing-left">
        <h2 className="pricing-title">Flexible Hiring Solutions for Your Team</h2>        
        <div className="pricing-cards">
          {/* Basic Plan */}
          <div className="pricing-card">
            <h3>Basic</h3>
            <p className="price">$0/month</p>
            <ul>
              <li>10 resumes/month</li>
              <li>Basic AI Matching</li>
              <li>Email Support</li>
              <li>Job Description Analysis</li>
              <li>Standard Resume Parsing</li>
            </ul>
            <p className="plan-description">Perfect for small businesses or individuals with occasional hiring needs.</p>
            <button>Get Started</button>
          </div>
          
          {/* Pro Plan - Most Popular */}
          <div className="pricing-card popular">
            <div className="popular-badge">Most Popular</div>
            <h3>Pro</h3>
            <p className="price">$29/month</p>
            <ul>
              <li>100 resumes/month</li>
              <li>Advanced Ranking</li>
              <li>Priority Support</li>
              <li>Skill Gap Analysis</li>
              <li>Candidate Scoring</li>
            </ul>
            <p className="plan-description">Ideal for growing teams with regular recruitment activities.</p>
            <button>Choose Plan</button>
          </div>
          
          {/* Enterprise Plan */}
          <div className="pricing-card">
            <h3>Enterprise</h3>
            <p className="price">Contact Us</p>
            <ul>
              <li>Unlimited resumes</li>
              <li>Custom AI Models</li>
              <li>Dedicated Support</li>
              <li>API Integration</li>
              <li>White-label Options</li>
            </ul>
            <p className="plan-description">Tailored solutions for large organizations with high-volume recruiting needs.</p>
            <button>Contact Sales</button>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="faq-section">
          <h3>Frequently Asked Questions</h3>
          <div className="faq-container" style={{ marginLeft: '680px' }}>
            <div className="faq-item">
              <strong>Can I cancel anytime?</strong>
              <p>Yes, you can cancel your plan at any time from your account settings.</p>
            </div>
            <div className="faq-item">
              <strong>What happens after the free trial?</strong>
              <p>You can upgrade to the Pro or Enterprise plan to continue using premium features.</p>
            </div>
            <div className="faq-item">
              <strong>Can I switch plans later?</strong>
              <p>Absolutely! You can upgrade or downgrade at any time.</p>
            </div>
            <div className="faq-item">
              <strong>Do you offer refunds?</strong>
              <p>Not satisfied with our service? We offer a 7-day money-back guarantee for a full refund, no questions asked. Your satisfaction is our top most priority.</p>
            </div>
            <div className="faq-item">
              <strong>Is there a limit on users?</strong>
              <p>Basic and Pro subscription tiers include support for up to 3 user accounts per organization, while Enterprise plans offer unlimited user accounts to accommodate larger teams and organizations with extensive collaboration needs.</p>
            </div>
            <div className="faq-item">
              <strong>How does AI matching work?</strong>
              <p>Our AI analyzes resumes against your job requirements, evaluating skills, experience, and cultural fit to rank candidates based on their compatibility with your position.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PricingPage;