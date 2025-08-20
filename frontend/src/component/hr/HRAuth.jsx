import React, { useState } from "react";
import "../../css/Hr/HRAuth.css";
import { useNavigate } from "react-router-dom";
import HRRegister from "./HRRegister";

export default function HRAuth() {
  const [activeForm, setActiveForm] = useState("login"); // login | register | forgot
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // here you can add API call for login before navigation
    navigate("/hr");
  };

  return (
    <div className="hrauth-container">
      <div className="hrauth-box">
        {/* Heading */}
        <h2>
          {activeForm === "login" && "HR Login"}
          {activeForm === "register" && "HR Registration"}
          {activeForm === "forgot" && "Reset Password"}
        </h2>

        {/* Login Form */}
        {activeForm === "login" && (
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter email" required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Enter password" required />
            </div>

            <button type="submit" className="auth-btn">Login</button>

            <div className="extra-links">
              <p>
                New HR?{" "}
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
          <HRRegister onBack={() => setActiveForm("login")} />
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
