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

  const routesWithOwnHeader = [
    "/login",
    "/signup",
    "/resume-screener-bot",
    "/profile",
    "/get-started",
  ];

  const routesWithoutFooter = [
    "/login",
    "/signup",
    "/resume-screener-bot",
    "/profile",
    "/get-started",
  ];

  const hideHeader = routesWithOwnHeader.includes(location.pathname);
  const hideFooter = routesWithoutFooter.includes(location.pathname);
  const isHome = location.pathname === "/";

  return (
    <div className="relative flex min-h-screen flex-col bg-[#F6F1E8] font-sans text-[#0f172a] selection:bg-zinc-200 selection:text-zinc-900">
      <ScrollToTop />
      <CustomCursor />

      {!hideHeader && <Header />}

      <main
        className={
          !hideHeader && !isHome
            ? "flex w-full flex-grow flex-col pt-24 sm:pt-28"
            : "flex w-full flex-grow flex-col"
        }
      >
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

      {!hideFooter && <Footer />}
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