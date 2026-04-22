import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MinimalHeader from "./MinimalHeader";
import "./style.css";

function GetStartedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("resurank-user"));
    const loggedIn = localStorage.getItem("resurank-logged-in");

    if (user && loggedIn === "true") {
      // User is already logged in
      navigate("/resume-screener-bot");
    } else if (user) {
      // User has signed up but not logged in
      navigate("/login");
    } else {
      // New user
      navigate("/signup");
    }
  }, [navigate]);

  return (
    <>
      <MinimalHeader />
      <div className="get-started-wrapper">
        <p>Redirecting...</p>
      </div>
    </>
  );
}

export default GetStartedPage;
