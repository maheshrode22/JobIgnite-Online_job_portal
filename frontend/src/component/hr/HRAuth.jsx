import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HRRegister from "./HRRegister";
import { hrLogin } from "../../services/HRService";
import "../../css/Hr/HRAuth.css";

export default function HRAuth() {
  const [activeForm, setActiveForm] = useState("login");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const hrData = await hrLogin(email, password);
      localStorage.setItem("hrData", JSON.stringify(hrData));
      localStorage.setItem("hr_id", hrData.hr_id);

      alert("Login successful ");
      navigate("/hr");
    } catch (err) {
      alert(err.message || "Something went wrong ");
    }
  };

  return (
    <div className="hrauth-container">
      <div className="hrauth-box shadow-lg mt">
        <h3 className="mb-4 text-primary fw-bold text-center">
          <i className="bi bi-person-badge-fill me-2"></i>
          {activeForm === "login" && "HR Login"}
          {activeForm === "register" && "HR Registration"}
          {activeForm === "forgot" && "Reset Password"}
        </h3>

        {/* Login Form */}
        {activeForm === "login" && (
          <form onSubmit={handleLogin}>
            <div className="mb-3 text-start">
              <label className="form-label">
                <i className="bi bi-envelope-fill me-1"></i>Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">
                <i className="bi bi-lock-fill me-1"></i>Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              <i className="bi bi-box-arrow-in-right me-2"></i>Login
            </button>

            <div className="extra-links text-center">
              <p>
                New HR?{" "}
                <span
                  className="text-primary fw-bold"
                  onClick={() => setActiveForm("register")}
                >
                  Register here
                </span>
              </p>
              <p>
                <span
                  className="text-danger fw-semibold"
                  onClick={() => setActiveForm("forgot")}
                >
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
            <div className="mb-3 text-start">
              <label className="form-label">
                <i className="bi bi-envelope-fill me-1"></i>Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter registered email"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              <i className="bi bi-send-check-fill me-2"></i>Send Reset Link
            </button>

            <div className="extra-links text-center mt-3">
              <p>
                Back to{" "}
                <span
                  className="text-primary fw-bold"
                  onClick={() => setActiveForm("login")}
                >
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
