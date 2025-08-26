import React, { useState } from "react";
import "../../css/Hr/HRAuth.css";
import { adminLogin } from "../../Services/adminService";

export default function AdminLogin() {
  const [username, setUsername] = useState(""); // ✅ Changed from email to username
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {

      // Placeholder: integrate real admin login service here
      throw new Error("Admin login service not implemented");
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage(err.message || "Invalid credentials");
    }

  const admindata = await adminLogin({ username, password });

  if (admindata.data.token) {
    localStorage.setItem("admindToken", admindata.data.token);
    alert("Login successful!");
    navigate("/admin");
  } else {
    setErrorMessage("Invalid credentials");
  }
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
          {/* ✅ Username Field */}
          <div className="mb-3 text-start">
            <label className="form-label">
              <i className="bi bi-person-fill me-1"></i>Username
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* ✅ Password Field */}
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
