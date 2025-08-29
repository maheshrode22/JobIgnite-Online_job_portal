// ✅ Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../css/navbar.css";
import logo1 from "../assets/img/JobIgnite.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  //  Detect HR Dashboard
  const isLoggedIn = location.pathname.startsWith("/hr");

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    const navbarOffset = 80;
    const scrollToElement = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - navbarOffset,
          behavior: "smooth",
        });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToElement, 200);
    } else {
      scrollToElement();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top shadow-sm">
      <div className="container">
        {/* ✅ Logo */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img
            src={logo1}
            alt="Logo"
            className="me-2"
          />
          <span className="brand-text">Job<span className="ignite">Ignite</span></span>
        </Link>

        {/* ✅ Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <i className="bi bi-list"></i>
        </button>

        {/* ✅ Menu */}
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          {!isLoggedIn && (
            <ul className="navbar-nav mx-auto">
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/">
                  <i className="bi bi-house-door me-1"></i> Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <a
                  href="#Reviews-section"
                  className="nav-link"
                  onClick={(e) => handleScrollToSection(e, "Reviews-section")}
                >
                  <i className="bi bi-star me-1"></i> Reviews
                </a>
              </li>
              <li className="nav-item mx-2">
                <a
                  href="#services-section"
                  className="nav-link"
                  onClick={(e) => handleScrollToSection(e, "services-section")}
                >
                  <i className="bi bi-gear me-1"></i> Services
                </a>
              </li>
              <li className="nav-item mx-2">
                <a
                  href="#contact-section"
                  className="nav-link"
                  onClick={(e) => handleScrollToSection(e, "contact-section")}
                >
                  <i className="bi bi-envelope me-1"></i> Contact
                </a>
              </li>
            </ul>
          )}

          {/* ✅ Right Side Login / Logout */}
          <div className="dropdown ms-auto">
            {isLoggedIn ? (
              <button className="btn btn-danger" onClick={() => navigate("/")}>
                <i className="bi bi-box-arrow-right me-1"></i> Logout
              </button>
            ) : (
              <>
                <button
                  className="btn btn-warning fw-bold"
                  onClick={() => setOpen(!open)}
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i> Login
                </button>
                {open && (
                  <ul className="dropdown-menu show">
                    <li>
                      <Link
                        to="/HRAuth"
                        className="dropdown-item"
                        onClick={() => setOpen(false)}
                      >
                        <i className="bi bi-person-badge me-2"></i> HR Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/jobSeekerAuth"
                        className="dropdown-item"
                        onClick={() => setOpen(false)}
                      >
                        <i className="bi bi-person-workspace me-2"></i> Job Seeker Login
                      </Link>

                      <Link to="/AdminLogin"
                            className="dropdown-item"
                            onClick={()=>setOpen(false)}
                      >
                        <i className="bi bi-person-workspace me-2"></i> Admin Login
                      </Link>
                    </li>
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}