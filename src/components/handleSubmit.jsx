import { useNavigate } from "react-router-dom"; // already present or add this at the top

const navigate = useNavigate(); // place this inside your SignupPage component

const handleSubmit = (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // ✅ Save user data to localStorage
  const userData = {
    name,
    email,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem("resurank-user", JSON.stringify(userData));

  console.log("Signed up and saved:", userData);

  // 🚀 Redirect directly to bot page
  navigate("/resume-screener-bot");
};
