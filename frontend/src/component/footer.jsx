import React from "react";
import "../css/footer.css";
import logo1 from "../assets/img/logo2.jpg";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About Us / Logo */}
        <div className="footer-column">
          <Link className="footer-logo" to="/">
            <img
              src={logo1}
              alt="JobIgnite Logo"
              className="logo-img"
            />
          </Link>
          <p className="footer-text">
            JobIgnite is your trusted platform for job search, recruitment services, career guidance, and skill development.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* About Us */}
        <div className="footer-column">
          <h5 className="footer-title">About Us</h5>
          <p className="footer-info">
            JobIgnite helps job seekers find the right opportunities and provides employers with recruitment solutions. We also provide career guidance and skill development courses to enhance employability.
          </p>
        </div>

        {/* Contact Info */}
        <div className="footer-column">
          <h5 className="footer-title">Contact Info</h5>
          <p className="footer-info"><strong>Address:</strong> Sr No 129/3, Dangat Park, Opposite CNG Pump, Warje Malwadi, Pune 411058</p>
          <p className="footer-info"><strong>Phone:</strong> +91 8459525501</p>
          <p className="footer-info"><strong>Email:</strong> JobIgnite@gmail.com</p>
        </div>

        {/* Important Links */}
        <div className="footer-column">
          <h5 className="footer-title">Important Links</h5>
          <ul className="footer-links">
            <li><Link to="/" className="link">Home</Link></li>
            <li><Link to="/jobs" className="link">Find a Job</Link></li>
            <li><Link to="/about" className="link">About Us</Link></li>
            <li><Link to="/contact" className="link">Contact Us</Link></li>
            <li><Link to="/login" className="link">Login</Link></li>
          </ul>
        </div>

      </div>

      <hr className="footer-hr" />

      <p className="footer-bottom">
        All trademarks are the property of their respective owners. <br />
        All rights reserved © 2025 JobIgnite (India) Ltd.
      </p>
    </footer>
  );
}

export default Footer;
