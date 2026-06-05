import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Layout & Global Components
import Header from "./components/Header";
import Footer from "./components/Footer"; 
import CustomCursor from "./components/CustomCursor";

// Route Components
import HomePage from "./components/HomePage";
import LoginPage from "./components/Loginpage";
import SignupPage from "./components/SignupPage";
import GetStarted from "./components/GetStarted";
import ResumeScreenerBot from "./components/ResumeScreenerBot";
import ToolsPage from "./components/ToolsPage";
import AboutUsPage from "./components/AboutUsPage";
import HelpPage from "./components/HelpPage";
import ProfilePage from "./components/ProfilePage"; 

// ----------------------------------------------------------------------
// Scroll Restoration Utility
// Premium sites never preserve scroll position across route changes.
// ----------------------------------------------------------------------
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function AppLayout() {
  const location = useLocation();
  
  // Several redesigned components (Login, Signup, Profile, Workspace) 
  // now incorporate their own specialized headers/footers for layout 
  // storytelling purposes. We omit the global ones on these routes.
  const standaloneRoutes = [
    "/login", 
    "/signup", 
    "/resume-screener-bot", 
    "/profile", 
    "/get-started"
  ];

  const isStandalone = standaloneRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0f172a] font-sans selection:bg-zinc-200 selection:text-zinc-900 flex flex-col relative">
      
      {/* ----------------------------------------------------------------------
          GLOBAL PREMIUM STYLES
      ---------------------------------------------------------------------- */}
      <style dangerouslySetInnerHTML={{ __html: `
        html, body {
          background-color: #FAFAFA;
          color: #0f172a;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          scroll-behavior: smooth;
        }
        
        /* Base typography adjustments for an editorial feel */
        h1, h2, h3, h4, h5, h6 {
          letter-spacing: -0.02em;
        }
        
        /* Premium custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #FAFAFA; 
        }
        ::-webkit-scrollbar-thumb {
          background: #D4D4D8; 
          border-radius: 10px;
          border: 2px solid #FAFAFA;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #A1A1AA; 
        }
      `}} />

      <ScrollToTop />
      <CustomCursor />
      
      {/* Global Header */}
      {!isStandalone && <Header />}
      
      {/* Dynamic Route Viewport */}
      <main className={!isStandalone ? "pt-24 sm:pt-28 flex-grow flex flex-col w-full" : "flex-grow flex flex-col w-full"}>
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/resume-screener-bot" element={<ResumeScreenerBot />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      {/* Global Footer */}
      {!isStandalone && <Footer />}
      
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}