// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate, useLocation} from "react-router-dom";
import "../css/navbar.css";
import logo1 from "../assets/img/logo1.jpg";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    const navbarOffset = 80; // adjust to your navbar height

    const scrollToElement = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - navbarOffset,
          behavior: "smooth",
        });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToElement, 200); // wait for page to render
    } else {
      scrollToElement();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img
            src={logo1}
            alt="Logo"
            className="me-2"
            style={{ borderRadius: "90%", width: "120px", height: "50px" }}
          />
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item mx-5">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item mx-5">
              <a
                href="#Reviews-section"
                className="nav-link"
                onClick={(e) => handleScrollToSection(e, "Reviews-section")}
              >
                Reviews
              </a>
            </li>
            <li className="nav-item mx-5">
              <a
                href="#services-section"
                className="nav-link"
                onClick={(e) => handleScrollToSection(e, "services-section")}
              >
                Services
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#contact-section"
                className="nav-link"
                onClick={(e) => handleScrollToSection(e, "contact-section")}
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Login */}
          <button
      className="btn btn-primary ms-lg-3"
      onClick={() => navigate("/AdminLogin")}
    >
      Login
    </button>
        </div>
      </div>
    </nav>
  );
}
