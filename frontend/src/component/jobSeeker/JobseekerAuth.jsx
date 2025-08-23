import React, { useState } from "react";
import "../../css/Hr/HRAuth.css";
import { useNavigate } from "react-router-dom";
import SeekerRegister from "./SeekerRegister";
import { loginJobSeeker } from "../../Services/SeekerService";

export default function JobSeekerAuth() {
  const [activeForm, setActiveForm] = useState("login"); // login | register | forgot
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();


    try {
      const response = await loginJobSeeker({
        jobUser: email,
        jobPass: password,
      });

      if (response.data.success) {
        // ✅ Store user details in localStorage
        const user = response.data.user;
        localStorage.setItem("seekerData", JSON.stringify(user));
        localStorage.setItem("seeker_id", user.seeker_id);

        navigate("/jobSeeker"); // Redirect to Job Seeker Dashboard
      } else {
        alert(response.data.message || "Invalid credentials. Try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }


  };

  return (
    <div className="hrauth-container">
      <div className="hrauth-box">
        {/* Heading */}
        <h2>
          {activeForm === "login" && "Seeker Login"}
          {activeForm === "register" && "Seeker Registration"}
          {activeForm === "forgot" && "Reset Password"}
        </h2>

        {/*  Login Form */}
        {activeForm === "login" && (
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="auth-btn">Login</button>

            <div className="extra-links">
              <p>
                New Seeker?{" "}
                <span onClick={() => setActiveForm("register")}>
                  Register here
                </span>
              </p>
              <p>
                <span onClick={() => setActiveForm("forgot")}>
                  Forgot Password?
                </span>
              </p>
            </div>
          </form>
        )}

        {/*  Register Form */}
        {activeForm === "register" && (
          <SeekerRegister onBack={() => setActiveForm("login")} />
        )}

        {/* Forgot Password */}
        {activeForm === "forgot" && (
          <form>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter registered email" required />
            </div>

            <button type="submit" className="auth-btn">Send Reset Link</button>

            <div className="extra-links">
              <p>
                Back to{" "}
                <span onClick={() => setActiveForm("login")}>Login</span>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
