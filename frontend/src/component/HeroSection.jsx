// src/components/HeroSection.jsx
import React from "react";
import { FaSearch } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(to bottom, #f7f7fc, #fff)",
      }}
    >
      <div className="container text-center">
        <h1 className="fw-bold">Find your dream job now</h1>
        <p className="text-muted">1 lakh+ jobs for you to explore</p>

        {/* Search Bar */}
        <div
          className="d-flex align-items-center mx-auto mt-4 shadow rounded-pill px-3 py-2"
          style={{ maxWidth: "900px", backgroundColor: "#fff" }}
        >
          <FaSearch className="text-muted me-2" size={50} />
          <input
            type="text"
            className="form-control border-0"
            placeholder="Enter skills / designations / companies"
            style={{ boxShadow: "none" }}
          />

          <select
            className="form-select border-0"
            style={{ maxWidth: "200px", boxShadow: "none" }}
          >
            <option>Select experience</option>
            <option>0-1 years</option>
            <option>1-3 years</option>
            <option>3+ years</option>
          </select>

          <input
            type="text"
            className="form-control border-0"
            placeholder="Enter location"
            style={{ boxShadow: "none" }}
          />

          <button className="btn btn-primary rounded-pill px-4">Search</button>
        </div>
      </div>
    </section>
  );
}
