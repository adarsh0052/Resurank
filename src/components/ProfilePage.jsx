import React, { useState } from "react";
import MinimalHeader from "./MinimalHeader";
import "./style.css";

function ProfilePage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [preferredTitles, setPreferredTitles] = useState("");
  const [industry, setIndustry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      name,
      company,
      role,
      preferredTitles,
      industry,
    };

    // Store in localStorage (or send to backend)
    localStorage.setItem("resurank-profile", JSON.stringify(profileData));

    alert("Profile saved successfully!");
  };

  return (
    <>
      <MinimalHeader />
      <div className="profile-wrapper">
        <div className="profile-card">
          <h2 className="profile-title">Complete Your Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="input-field">
              <label>Company / Organization</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company name (optional)"
              />
            </div>

            <div className="input-field">
              <label>Your Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Recruiter, Manager"
              />
            </div>

            <div className="input-field">
              <label>Preferred Job Titles</label>
              <input
                type="text"
                value={preferredTitles}
                onChange={(e) => setPreferredTitles(e.target.value)}
                placeholder="e.g. Software Engineer, Data Analyst"
              />
            </div>

            <div className="input-field">
              <label>Industry</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Tech, Finance, Healthcare"
              />
            </div>

            <button type="submit" className="profile-btn">Save Profile</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
