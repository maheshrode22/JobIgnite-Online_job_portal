import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HelpPass (){
  const [role, setRole] = useState(""); // "hr" or "jobseeker"
  const [mode, setMode] = useState("change"); // "change" or "forgot"
  const [userId, setUserId] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log("Change password:", { role, userId, oldPassword, newPassword });
    alert(`${role} password updated successfully!`);
  };

  // Forgot Password
  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log("Forgot password for:", { role, email });
    alert(`Reset link/OTP sent to ${email}`);
  };

 return(
  <div className="container mt-5">
  <h2 className="mb-4">Password Management</h2>

  {/* Role Selection */}
  <div className="mb-4">
    <label className="form-label">Select Role</label>
    <select
      className="form-select"
      value={role}
      onChange={(e) => setRole(e.target.value)}
    >
      <option value="">-- Choose Role --</option>
      <option value="hr">HR</option>
      <option value="jobseeker">Job Seeker</option>
    </select>
  </div>

  {/* Show options only if role is selected */}
  {role && (
    <>
      {/* Mode Selection */}
      <div className="mb-3">
        <button
          className={`btn ${mode === "change" ? "btn-primary" : "btn-outline-primary"} me-2`}
          onClick={() => setMode("change")}
        >
          Change Password
        </button>
        <button
          className={`btn ${mode === "forgot" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setMode("forgot")}
        >
          Forgot Password
        </button>
      </div>

      {/* Change Password Form */}
      {mode === "change" && (
        <form onSubmit={handleChangePassword}>
          <div className="mb-3">
            <label>User ID / Email</label>
            <input
              type="text"
              className="form-control"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Old Password</label>
            <input
              type="password"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Update Password
          </button>
        </form>
      )}

      {/* Forgot Password Form */}
      {mode === "forgot" && (
        <form onSubmit={handleForgotPassword}>
          <div className="mb-3">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Send Reset Link
          </button>
        </form>
      )}
    </>
  )}
</div>

 )


};

