// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Header from "./Header";
// import Footer from "./Footer";

// import MinimalHeader from "./MinimalHeader";
// import "./style.css";

// function SignupPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     console.log("Signing up with:", { name, email, password });

//     // Simulate success and redirect
//     setTimeout(() => {
//       navigate("/get-started");
//     }, 500);
//   };

//   return (
//     <>
//       <MinimalHeader />
//       <div className="signup-wrapper">
//         {/* Left: Content */}
//         <div className="signup-left">
//           <h2>Welcome to ResuRank 👋</h2>
//           <p>Discover the easiest way to screen resumes, rank candidates, and hire faster.</p>
//           <ul>
//             <li style={{  
//     fontSize: '1.3rem' 
//   }}>✅ Upload resumes in bulk</li>
//             <li   style={{  
//     fontSize: '1.3rem' 
//   }}>✅ Match with job descriptions</li>
//             <li style={{  
//     fontSize: '1.3rem' 
//   }}>✅ Save hours of manual work</li>
//           </ul>
//         </div>

//         {/* Right: Sign up form */}
//         <div className="signup-right">
//           <div className="login-card">
//             <h2 className="login-title"  style={{ textAlign: 'center'  }}>Sign Up</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="input-field">
//                 <label htmlFor="name" className="label">Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   className="input"
//                   placeholder="Enter your name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="input-field">
//                 <label htmlFor="email" className="label">Email</label>
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
//                 <label htmlFor="password" className="label">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   className="input"
//                   placeholder="Create a password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="input-field">
//                 <label htmlFor="confirmPassword" className="label">Confirm Password</label>
//                 <input
//                   type="password"
//                   id="confirmPassword"
//                   className="input"
//                   placeholder="Confirm your password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <button type="submit" className="login-btn">Sign Up</button>
//             </form>

//             <div className="redirect-links">
//               <span className="redirect-text">Already have an account?</span>
//               <Link to="/login" className="signup-link">Log In</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default SignupPage;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./style.css";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Signing up with:", { name, email, password });

    // Simulate success and redirect
    setTimeout(() => {
      navigate("/get-started");
    }, 500);
  };

  return (
    <>
      <Header />
      <div className="signup-wrapper">
        {/* Left: Content */}
        <div className="signup-left">
          <h2>Welcome to ResuRank 👋</h2>
          <p>Discover the easiest way to screen resumes, rank candidates, and hire faster.</p>
          <ul>
            <li style={{  
    fontSize: '1.3rem' 
  }}>✅ Upload resumes in bulk</li>
            <li style={{  
    fontSize: '1.3rem' 
  }}>✅ Match with job descriptions</li>
            <li style={{  
    fontSize: '1.3rem' 
  }}>✅ Save hours of manual work</li>
          </ul>
        </div>

        {/* Right: Sign up form */}
        <div className="signup-right">
          <div className="login-card">
            <h2 className="login-title" style={{ textAlign: 'center' }}>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <label htmlFor="name" className="label">Name</label>
                <input
                  type="text"
                  id="name"
                  className="input"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="email" className="label">Email</label>
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
                <label htmlFor="password" className="label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="input"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="input"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="login-btn">Sign Up</button>
            </form>

            <div className="redirect-links">
              <span className="redirect-text">Already have an account?</span>
              <Link to="/login" className="signup-link">Log In</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignupPage;