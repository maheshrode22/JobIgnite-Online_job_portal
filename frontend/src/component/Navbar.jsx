import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo1 from "../assets/img/JobIgnite.png";
import "../css/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect Dashboard (HR/Admin/Jobseeker)
  const isLoggedIn =
    location.pathname.startsWith("/hr") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/jobSeeker");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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

    // Close mobile menu if open
    setMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToElement, 200);
    } else {
      scrollToElement();
    }
  };

  const handleLogout = () => {
    // Clear any stored tokens or user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate("/");
  };

  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/" onClick={handleNavLinkClick}>
          <img src={logo1} alt="JobIgnite Logo" className="logo-img me-2" />
          <span className="brand-text">
            Job<span className="ignite">Ignite</span>
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Links */}
        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="mainNavbar">
          {!isLoggedIn && (
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleNavLinkClick}>
                  <i className="bi bi-house-door me-1"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <a
                  href="#Reviews-section"
                  className="nav-link"
                  onClick={(e) => handleScrollToSection(e, "Reviews-section")}
                >
                  <i className="bi bi-star me-1"></i> Reviews
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#services-section"
                  className="nav-link"
                  onClick={(e) => handleScrollToSection(e, "services-section")}
                >
                  <i className="bi bi-gear me-1"></i> Services
                </a>
              </li>
              <li className="nav-item">
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

          {/* Right Side Buttons */}
          <div className="d-flex ms-auto">
            {isLoggedIn ? (
              <button
                className="btn btn-danger"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-1"></i> Logout
              </button>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-warning fw-bold dropdown-toggle"
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i> Login
                </button>
                {dropdownOpen && (
                  <ul className="dropdown-menu dropdown-menu-end show">
                    <li>
                      <Link
                        to="/HRAuth"
                        className="dropdown-item"
                        onClick={() => {
                          setDropdownOpen(false);
                          handleNavLinkClick();
                        }}
                      >
                        <i className="bi bi-person-badge me-2"></i> HR Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/jobSeekerAuth"
                        className="dropdown-item"
                        onClick={() => {
                          setDropdownOpen(false);
                          handleNavLinkClick();
                        }}
                      >
                        <i className="bi bi-person-workspace me-2"></i> Job Seeker Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/AdminLogin"
                        className="dropdown-item"
                        onClick={() => {
                          setDropdownOpen(false);
                          handleNavLinkClick();
                        }}
                      >
                        <i className="bi bi-shield-lock me-2"></i> Admin Login
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
