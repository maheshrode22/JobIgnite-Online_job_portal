import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Hr/HRAuth.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const hrData = await adminLoginService({ email, password });

      // Save HR data in localStorage
      localStorage.setItem("hrData", JSON.stringify(hrData.data));
      localStorage.setItem("hr_id", hrData.data.hr_id);

      alert("Login successful!");
      navigate("/hr"); // Redirect to HR dashboard
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="hrauth-container">
      <div className="hrauth-box shadow-lg mt">
        <h3 className="mb-4 text-primary fw-bold text-center">
          <i className="bi bi-person-badge-fill me-2"></i>Admin Login
        </h3>

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMessage && (
            <p className="text-danger fw-semibold">{errorMessage}</p>
          )}

          <button type="submit" className="btn btn-primary w-100 mb-3">
            <i className="bi bi-box-arrow-in-right me-2"></i>Login
          </button>
        </form>
      </div>
    </div>
  );
}
