import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./components/Loginpage";
import SignupPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer"; 
import GetStarted from "./components/GetStarted";
import ResumeScreenerBot from "./components/ResumeScreenerBot";
import PricingPage from "./components/PricingPage";
import ToolsPage from "./components/ToolsPage";
import AboutUsPage from "./components/AboutUsPage";
import HelpPage from "./components/HelpPage";
import ProfilePage from "./components/ProfilePage"; 

function AppLayout() {
  const location = useLocation();
  const hideHeader = location.pathname === "/login"  || location.pathname === "/signup" || location.pathname === "/resume-screener-bot";

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/resume-screener-bot" element={<ResumeScreenerBot />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      {!hideHeader && <Footer />}
    </div>
  
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;

// // App.jsx - Main application file
// import React from "react";
// import ResumeScreenerBot from "./components/ResumeScreenerBot";
// import "./components/new.css"; // Import the CSS

// function App() {
//   return (
//     <div className="app-container">
//       <header className="header">
//         <nav className="p-4 flex justify-between items-center">
//           <div className="flex items-center">
//             <h1 className="text-xl font-bold">Resume Screener</h1>
//           </div>
//         </nav>
//       </header>
      
//       <div className="hero-section">
//         <div className="hero-content">
//           <h1 className="hero-title">AI-Powered Resume Screening</h1>
//           <p className="hero-subtitle">
//             Automatically analyze and rank candidate resumes based on job requirements.
//             Save time and find the best talent faster.
//           </p>
//           <button className="hero-cta">Get Started</button>
//         </div>
//         <div className="hero-image">
//           <div className="animated-resume-stack">
//             <div className="resume-paper paper-1"></div>
//             <div className="resume-paper paper-2"></div>
//             <div className="resume-paper paper-3"></div>
//           </div>
//         </div>
//       </div>
      
//       <div className="stats-bar">
//         <div className="stat-item">
//           <div className="stat-number">95%</div>
//           <div className="stat-label">Time Saved</div>
//         </div>
//         <div className="stat-divider"></div>
//         <div className="stat-item">
//           <div className="stat-number">80%</div>
//           <div className="stat-label">Hiring Accuracy</div>
//         </div>
//         <div className="stat-divider"></div>
//         <div className="stat-item">
//           <div className="stat-number">1000+</div>
//           <div className="stat-label">Resumes Processed</div>
//         </div>
//       </div>
      
//       <div className="bot-wrapper">
//         {/* This is where the ResumeScreenerBot component is integrated */}
//         <ResumeScreenerBot />
//       </div>
      
//       <footer>
//         <p>&copy; 2025 Resume Screener. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default App;