import React, { useState } from "react";
import { registerHR } from "../../Services/HRService"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/Hr/HRRegister.css";

export default function HRRegister({ onBack }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const hrData = { name, company, email, password, phone };

    try {
      const result = await registerHR(hrData);
      setMsg(result.data.message || "Registration Successful!");
      alert("Registration successful!");
      onBack(); 
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setMsg(err.response?.data?.message || "Registration Failed!");
    }
  };

  return (
   
     <div className="mt">
       
        <p className="text-muted text-center mb-4">
          Create your HR account to post jobs and manage applicants
        </p>

        <form onSubmit={handleRegister}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                <i className="bi bi-person me-2"></i> Name
              </label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                <i className="bi bi-telephone me-2"></i> Phone
              </label>
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-buildings me-2"></i> Company
            </label>
            <input
              type="text"
              className="form-control"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Enter company name"
              required
            />
          </div>

          <div className="mt-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-envelope me-2"></i> Email
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="mt-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-lock me-2"></i> Password
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-4">
            <i className="bi bi-check-circle me-2"></i> Register
          </button>

          {msg && <p className="text-center mt-3 text-danger fw-semibold">{msg}</p>}

          <div className="text-center mt-3">
            <p>
              Already have an account?{" "}
              <span className="text-primary fw-bold login-link" onClick={onBack}>
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    
  );
}