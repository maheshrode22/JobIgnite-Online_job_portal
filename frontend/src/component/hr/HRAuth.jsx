import React, { useState } from "react";
import "../../css/Hr/HRAuth.css";
import { useNavigate } from "react-router-dom";
import HRRegister from "./HRRegister";
import { hrLogin } from "../../services/HRService";
 
export default function HRAuth() {
  const [activeForm, setActiveForm] = useState("login");
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
 
    try {
      const hrData = await hrLogin(email, password); //  service  API call
 
      // HR data localStorage save
      localStorage.setItem("hrData", JSON.stringify(hrData));
      localStorage.setItem("hr_id", hrData.hr_id);
 
      alert("Login successful ✅");
      navigate("/hr");
    } catch (err) {
      // backend कडून आलेला message show होईल
      alert(err.message || "Something went wrong ");
    }
  };
 
  return (
    <div className="hrauth-container">
      <div className="hrauth-box">
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
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                required
              />
            </div>
 
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
            </div>
 
            <button type="submit" className="auth-btn">
              Login
            </button>
 
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
 
        {/* Register Form */}
        {activeForm === "register" && (
          <HRRegister onBack={() => setActiveForm("login")} />
        )}
 
        {/* Forgot Password */}
        {activeForm === "forgot" && (
          <form>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter registered email"
                required
              />
            </div>
 
            <button type="submit" className="auth-btn">
              Send Reset Link
            </button>
 
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
 
 