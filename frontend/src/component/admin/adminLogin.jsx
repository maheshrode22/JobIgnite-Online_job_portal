import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Hr/HRAuth.css";
import { adminLogin } from "../../Services/adminService";

export default function AdminLogin() {
  const [username, setUsername] = useState(""); //  Changed from email to username
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const admindata = await adminLogin({ username, password });
      if (admindata?.data?.token) {
        localStorage.setItem("admin_token", admindata.data.token);
        alert("Login successful!");
        navigate("/admin/dashboardAdmin");
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
  <div className="hrauth-box">
    <h3 className="hrauth-title">Admin Login</h3>

    <form onSubmit={handleLogin}>
      <div className="hrauth-group">
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="hrauth-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {errorMessage && <p className="hrauth-error">{errorMessage}</p>}

      <button type="submit" className="hrauth-btn">
        Login
      </button>
    </form>
  </div>
</div>

  );
}
