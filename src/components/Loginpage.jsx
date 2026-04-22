// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import MinimalHeader from "./MinimalHeader";
// import "./style.css";

// function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Simulated login logic — replace with real API
//       if (email && password) {
//         // Simulating token
//         const fakeToken = "resurank-auth-token-123";

//         // Store token and email in localStorage
//         localStorage.setItem("authToken", fakeToken);
//         localStorage.setItem("lastEnteredEmail", email);
//         localStorage.setItem("resurank-logged-in", "true");


//         // Navigate to resume screening bot
//         navigate("/resume-screener-bot");
//       } else {
//         alert("Please enter valid credentials.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//     }
//   };

//   return (
//     <>
//       <MinimalHeader />
//       <div className="login-wrapper">
//         {/* Left: Content */}
//         <div className="login-left">
//           <h2>Welcome Back to ResuRank 👋</h2>
//           <p>
//             Quickly access your profile, track your previous applications, and
//             get started with your job screening.
//           </p>
//           <ul>
//             <li>✅ Easy access to your profile</li>
//             <li>✅ Review and edit previous submissions</li>
//             <li>✅ Start screening resumes right away</li>
//           </ul>
//         </div>

//         {/* Right: Login form */}
//         <div className="login-right">
//           <div className="login-card">
//             <h1 className="login-title" style={{ textAlign: 'center', marginBottom: '1rem'  }}>Log In</h1>
//             <form onSubmit={handleSubmit}>
//               <div className="input-field">
//                 <label htmlFor="email" className="label">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="input"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="input-field">
//                 <label htmlFor="password" className="label">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   className="input"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <div className="forgot-password">
//                   <a href="/forgot-password">Forgot Password?</a>
//                 </div>
//               </div>

//               <button type="submit" className="login-btn">
//                 Log In
//               </button>
//             </form>

//             <div className="redirect-links">
//               <span className="redirect-text">Don't have an account?</span>
//               <a href="/signup" className="signup-link">
//                 Sign Up
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default LoginPage;


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./style.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simulated login logic — replace with real API
      if (email && password) {
        // Simulating token
        const fakeToken = "resurank-auth-token-123";

        // Store token and email in localStorage
        localStorage.setItem("authToken", fakeToken);
        localStorage.setItem("lastEnteredEmail", email);
        localStorage.setItem("resurank-logged-in", "true");

        // Navigate to resume screening bot
        navigate("/resume-screener-bot");
      } else {
        alert("Please enter valid credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <>
      <Header />
      <div className="login-wrapper">
        {/* Left: Content */}
        <div className="login-left">
          <h2>Welcome Back to ResuRank 👋</h2>
          <p>
            Quickly access your profile, track your previous applications, and
            get started with your job screening.
          </p>
          <ul>
            <li>✅ Easy access to your profile</li>
            <li>✅ Review and edit previous submissions</li>
            <li>✅ Start screening resumes right away</li>
          </ul>
        </div>

        {/* Right: Login form */}
        <div className="login-right">
          <div className="login-card">
            <h1 className="login-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>Log In</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="forgot-password">
                  <a href="/forgot-password">Forgot Password?</a>
                </div>
              </div>

              <button type="submit" className="login-btn">
                Log In
              </button>
            </form>

            <div className="redirect-links">
              <span className="redirect-text">Don't have an account?</span>
              <a href="/signup" className="signup-link">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;