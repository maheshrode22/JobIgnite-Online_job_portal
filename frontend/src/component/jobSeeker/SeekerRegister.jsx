import React, { useState } from "react";
import { registerSeeker } from "../../Services/SeekerService"; // Create a service similar to HRService

export default function SeekerRegister({ onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const seekerData = { name, email, password, phone, address };
    console.log("Sending Seeker Data:", seekerData);

    try {
      const result = await registerSeeker(seekerData);
      setMsg(result.data.message || "Registration Successful!");
      alert("Registration successful!");
      onBack(); // Redirect to login page
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setMsg(err.response?.data?.message || "Registration Failed!");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="input-group">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Address</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></input>
      </div>

      <button type="submit" className="auth-btn">
        Register
      </button>

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
