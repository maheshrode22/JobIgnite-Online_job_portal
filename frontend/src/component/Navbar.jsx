  import React, { useState } from "react";
  import { Link, useNavigate, useLocation } from "react-router-dom";
  import "../css/navbar.css";
  import logo1 from "../assets/img/logo1.jpg";

  export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if user is on HR dashboard
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

    const [open, setOpen] = useState(false);

    return (
      <nav className="navbar navbar-expand-lg navbar-dark">
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

          {/* Mobile Toggle (optional if using Bootstrap) */}
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
            {!isLoggedIn && (
              <ul className="navbar-nav mx-auto">
                <li className="nav-item mx-3">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <a
                    href="#Reviews-section"
                    className="nav-link"
                    onClick={(e) => handleScrollToSection(e, "Reviews-section")}
                  >
                    Reviews
                  </a>
                </li>
                <li className="nav-item mx-3">
                  <a
                    href="#services-section"
                    className="nav-link"
                    onClick={(e) => handleScrollToSection(e, "services-section")}
                  >
                    Services
                  </a>
                </li>
                <li className="nav-item mx-3">
                  <a
                    href="#contact-section"
                    className="nav-link"
                    onClick={(e) => handleScrollToSection(e, "contact-section")}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            )}

            {/* Login / Logout Button on Right */}
            {/* <div className="ms-auto"> 
            <button className="btn btn-primary" onClick={() => navigate(isLoggedIn ? "/" : "/LoginForm")} > {isLoggedIn ? "Logout" : "Login"} 
            </button> </div> */}
            {/* Dropdown Login / Logout */}
            <div className="dropdown ms-auto">
              {isLoggedIn ? (
                <button
                  className="btn btn-danger"
                  onClick={() => navigate("/")}
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => setOpen(!open)}
                  >
                    Login ▼
                  </button>
                  {open && (
                    <ul className="dropdown-menu show" style={{ display: "block" }}>
                      <li>
                        <Link to="/HRAuth" className="dropdown-item" onClick={() => setOpen(false)}>
                          HR Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/jobSeekerAuth" className="dropdown-item" onClick={() => setOpen(false)}>
                          Job Seeker Login
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
