import React, { useState } from "react";
import { registerSeeker } from "../../Services/SeekerService";

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

      // ✅ backend response मध्ये `msg`
      setMsg(result.data.msg || "Registration Successful!");
      alert("Registration successful!");
      onBack(); // Go back to login
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);

      // ✅ error msg देखील backend मध्ये `msg`
      setMsg(err.response?.data?.msg || "Registration Failed!");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <textarea
          className="form-control"
          placeholder="Enter your address"
          rows="2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary w-100 mt-2">
        Register
      </button>

      {msg && <p className="text-center mt-2">{msg}</p>}

      <div className="extra-links text-center">
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
