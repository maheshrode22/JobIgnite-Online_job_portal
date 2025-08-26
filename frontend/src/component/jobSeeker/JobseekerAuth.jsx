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

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert("Reset password feature coming soon!");
  };

  return (
    <div className="hrauth-container">
      <div className="hrauth-box mt">
        <h3>
          {activeForm === "login" && "Seeker Login"}
          {activeForm === "register" && "Seeker Registration"}
          {activeForm === "forgot" && "Reset Password"}
        </h3>

        {errorMessage && <p className="error-text">{errorMessage}</p>}

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

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="extra-links text-center mt-2">
              <p>
                New Seeker?{" "}
                <span className="text-primary" onClick={() => setActiveForm("register")}>
                  Register here
                </span>
              </p>
              <p>
                <span className="text-danger" onClick={() => setActiveForm("forgot")}>
                  Forgot Password?
                </span>
              </p>
            </div>
          </form>
        )}

        {/* Register Form */}
        {activeForm === "register" && <SeekerRegister onBack={() => setActiveForm("login")} />}

        {/* Forgot Password */}
        {activeForm === "forgot" && (
          <form onSubmit={handleForgotPassword}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter registered email"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Send Reset Link
            </button>

            <div className="extra-links text-center mt-2">
              <p>
                Back to{" "}
                <span className="text-primary" onClick={() => setActiveForm("login")}>
                  Login
                </span>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
