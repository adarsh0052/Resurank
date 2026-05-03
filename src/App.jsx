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

