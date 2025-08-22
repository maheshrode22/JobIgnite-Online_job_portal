import React, { useState } from "react";
import { registerHR } from "../../services/HRService"; // function import
 
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
    console.log(" Sending Data:", hrData);
 
    try {
      const result = await registerHR(hrData);
     
      setMsg(result.data.message || "Registration Successful!");
      alert("Registration successful!");
      onBack(); // login page redirect
    } catch (err) {
      console.error(" Error:", err.response?.data || err.message);
      setMsg(err.response?.data?.message || "Registration Failed!");
    }
  };
 
  return (
    <form onSubmit={handleRegister}>
      <div className="input-group">
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
 
      <div className="input-group">
        <label>Company</label>
        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
      </div>
 
      <div className="input-group">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
 
      <div className="input-group">
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
 
      <div className="input-group">
        <label>Phone</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
 
      <button type="submit" className="auth-btn">Register</button>
 
      {msg && <p>{msg}</p>}
 
      <div className="extra-links">
        <p>
          Already have an account?{" "}
          <span onClick={onBack} style={{ color: "blue", cursor: "pointer" }}>
            Login
          </span>
        </p>
      </div>
    </form>
  );
}
 