import React, { useState } from "react";
import "../../css/Hr/HRAuth.css";
import { useNavigate } from "react-router-dom";
import SeekerRegister from "./SeekerRegister";
import { loginJobSeeker } from "../../Services/SeekerService";

export default function JobSeekerAuth() {
  const [activeForm, setActiveForm] = useState("login"); // login | register | forgot
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setLoading(true);


    try {
      const response = await loginJobSeeker({
        jobUser: email,
        jobPass: password,
      });


      if (response.data && response.data.success) {
        const user = response.data.user;

        // ✅ Store user details in localStorage

      if (response.data.success) {
        // Store user details in localStorage
        localStorage.setItem("jobSeeker", JSON.stringify(response.data.user));

        const user = response.data.user;

        localStorage.setItem("seekerData", JSON.stringify(user));
        localStorage.setItem("seeker_id", user.seeker_id);

        navigate("/jobSeeker"); // Redirect to dashboard
      } else {
        setErrorMessage(response.data?.message || "Invalid credentials. Try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }

  };

  // ✅ Handle Forgot Password
  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Implement backend API call for reset
    alert("Reset password feature coming soon!");

  };

  return (
    <div className="hrauth-container">
      <div className="hrauth-box mt">
        {/* Heading */}
        <h3>
          {activeForm === "login" && "Seeker Login"}
          {activeForm === "register" && "Seeker Registration"}
          {activeForm === "forgot" && "Reset Password"}

        </h2>

        {/* ✅ Show Error */}
        {errorMessage && <p className="error-text">{errorMessage}</p>}

        {/* ✅ Login Form */}

        </h3>

        {/* Login Form */}

        {activeForm === "login" && (
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>


            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}

            <button type="submit" className="btn btn-primary w-100 mt-2">
              Login

            </button>

            <div className="extra-links text-center">
              <p>
                New Seeker?{" "}
                <span onClick={() => setActiveForm("register")}>Register here</span>
              </p>
              <p>
                <span onClick={() => setActiveForm("forgot")}>Forgot Password?</span>
              </p>
            </div>
          </form>
        )}

        {activeForm === "register" && (
          <SeekerRegister onBack={() => setActiveForm("login")} />
        )}

        {/* ✅ Forgot Password */}
        {activeForm === "forgot" && (

          <form onSubmit={handleForgotPassword}>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter registered email" required />

          <form>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter registered email"
                required
              />

            </div>

            <button type="submit" className="btn btn-primary w-100 mt-2">
              Send Reset Link
            </button>

            <div className="extra-links text-center">
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
