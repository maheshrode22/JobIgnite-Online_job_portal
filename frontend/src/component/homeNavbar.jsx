import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../css/homeNavbar.css";
import logo from "../assets/img/JobIgnite.png";

export default function HomeNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

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
    <nav className="homeNavBar fixed-top">
      <div className="navbar-container">
        {/* Logo */}
        <Link className="homeNavBar-logo" to="/">
          <img src={logo} alt="Logo" />
          <span className="brand-text">
            Job<span className="ignite">Ignite</span>
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="homeNavBar-toggler"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className="bi bi-list"></i>
        </button>

        {/* Menu */}
        <div className={`homeNavBar-menu ${menuOpen ? "show" : ""}`}>
          {!isLoggedIn && (
            <ul className="homeNavBar-nav">
              <li>
                <Link className="homeNavBar-link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#Reviews-section"
                  className="homeNavBar-link"
                  onClick={(e) => handleScrollToSection(e, "Reviews-section")}
                >
                  Reviews
                </a>
              </li>
              <li>
                <a
                  href="#services-section"
                  className="homeNavBar-link"
                  onClick={(e) => handleScrollToSection(e, "services-section")}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact-section"
                  className="homeNavBar-link"
                  onClick={(e) => handleScrollToSection(e, "contact-section")}
                >
                  Contact
                </a>
              </li>
            </ul>
          )}

          {/* Login / Logout */}
          <div className="homeNavBar-actions">
            {isLoggedIn ? (
              <button className="btn logout" onClick={() => navigate("/")}>
                Logout
              </button>
            ) : (
              <>
                <button
                  className="btn login"
                  onClick={() => setLoginOpen(!loginOpen)}
                >
                  Login
                </button>
                <ul className={`homeNavBar-dropdown ${loginOpen ? "show" : ""}`}>
                  <li>
                    <Link
                      to="/HRAuth"
                      className="dropdown-item"
                      onClick={() => setLoginOpen(false)}
                    >
                      HR Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/jobSeekerAuth"
                      className="dropdown-item"
                      onClick={() => setLoginOpen(false)}
                    >
                      Job Seeker Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/AdminLogin"
                      className="dropdown-item"
                      onClick={() => setLoginOpen(false)}
                    >
                      Admin Login
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
