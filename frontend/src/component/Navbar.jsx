// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css"
import logo1 from "../assets/img/logo1.jpg";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container">
        {/* Brand Logo & Title - Left */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img
            src={logo1} // optional: logo image path
            
            className="me-2"
            style={{ borderRadius: "90%", width: "120px", height: "50px" }}
          />
       
        </Link>
    
        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Centered Menu Items */}
          <ul className="navbar-nav mx-auto">
            <li className="nav-item mx-5">
              
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item mx-5">
              <Link className="nav-link" to="/About">About</Link>
            </li>
            <li className="nav-item mx-5">
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>

          {/* Login Button - Right */}
          <button
            className="btn btn-primary ms-lg-3"
            onClick={() => navigate("/LoginForm")}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
