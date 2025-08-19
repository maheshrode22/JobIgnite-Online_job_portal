import React, { useState } from "react";
import "../../css/Hr/HRAuth.css";

import { Navigate,useNavigate } from "react-router-dom";
export default function HRAuth() {
  const [activeForm, setActiveForm] = useState("login"); // login | register | forgot
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    // You can also do your login validation here
    navigate("/hr"); // Navigate to home page
  };
  const navigate = useNavigate();

  return (
    <div className="hrauth-container">
      <div className="hrauth-box">
        <h2>
          {activeForm === "login" && "HR Login"}
          {activeForm === "register" && "HR Registration"}
          {activeForm === "forgot" && "Reset Password"}
        </h2>

        {/* ✅ Login Form */}
        {activeForm === "login" && (
            //
          <form onSubmit={handleSubmit} >
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter email" required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Enter password" required />
            </div>

            <button type="submit" className="auth-btn" >Login</button>

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

        {/* ✅ Register Form */}
        {activeForm === "register" && (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter full name" required />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter email" required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Enter password" required />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Re-enter password" required />
            </div>

            <button type="submit" className="auth-btn">Register</button>

            <div className="extra-links">
              <p>
                Already Registered?{" "}
                <span onClick={() => setActiveForm("login")}>Login करा</span>
              </p>
            </div>
          </form>
        )}

        {/* ✅ Forgot Password Form */}
        {activeForm === "forgot" && (
          <form onSubmit={handleSubmit}>
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
