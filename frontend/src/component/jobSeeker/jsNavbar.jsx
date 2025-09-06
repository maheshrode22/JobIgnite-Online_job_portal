import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import JobIgniteLogo from "../../assets/img/JobIgnite.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/jobSeeker/jsNavbar.css";  


export default function JSNavbar() {
  const [userData, setUserData] = useState(null);
  const [activeLink, setActiveLink] = useState("");
  const [showOpportunitiesDropdown, setShowOpportunitiesDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          // Token expired - clear and redirect to home
          localStorage.removeItem("token");
          setUserData(null);
          navigate("/");
          return;
        }
        
        setUserData(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
        // Invalid token - clear and redirect to home
        localStorage.removeItem("token");
        setUserData(null);
        navigate("/");
      }
    }
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/browse-jobs")) setActiveLink("jobs");
    else if (path.includes("/participate")) setActiveLink("participate");
    else if (path.includes("/opportunities")) setActiveLink("opportunities");
    else setActiveLink("");
  }, [location]);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/"); // Navigate to home page instead of jobSeeker
  };

  const handleOpportunitiesClick = () => {
    setShowOpportunitiesDropdown(!showOpportunitiesDropdown);
  };

  const handleOpportunityItemClick = (route) => {
    setShowOpportunitiesDropdown(false);
    navigate(route);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom px-3 py-2 shadow-sm">
        <div className="container-fluid">
          {/* Logo */}
          <a
            className="navbar-brand d-flex align-items-center"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <img src={JobIgniteLogo} alt="JobIgnite" height="34" className="me-2" />
            <span className="fw-semibold text-dark">JobIgnite</span>
          </a>

          {/* Hamburger for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links + Right side */}
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <span
                  className={`nav-link ${activeLink === "jobs" ? "active text-primary fw-semibold" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/jobSeeker/browse-jobs")}
                >
                  Jobs
                </span>
              </li>
              <li className="nav-item">
                <span
                  className={`nav-link ${activeLink === "participate" ? "active text-primary fw-semibold" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/jobSeeker/participate")}
                >
                  Participate
                </span>
              </li>
              <li className="nav-item dropdown">
                <span
                  className={`nav-link dropdown-toggle ${activeLink === "opportunities" ? "active text-primary fw-semibold" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={handleOpportunitiesClick}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Opportunities
                </span>
                <ul className={`dropdown-menu ${showOpportunitiesDropdown ? 'show' : ''}`}>
                  <li>
                    <span 
                      className="dropdown-item" 
                      style={{ cursor: "pointer" }}
                      onClick={() => handleOpportunityItemClick("/jobSeeker/recommended-jobs")}
                    >
                      <i className="bi bi-star me-2"></i>Recommended jobs
                    </span>
                  </li>
                  <li>
                    <span 
                      className="dropdown-item" 
                      style={{ cursor: "pointer" }}
                      onClick={() => handleOpportunityItemClick("/jobSeeker/job-invites")}
                    >
                      <i className="bi bi-envelope me-2"></i>Job invites
                    </span>
                  </li>
                  <li>
                    <span 
                      className="dropdown-item" 
                      style={{ cursor: "pointer" }}
                      onClick={() => handleOpportunityItemClick("/jobSeeker/job-alerts")}
                    >
                      <i className="bi bi-bell me-2"></i>Jobs from alerts
                    </span>
                  </li>
                  <li>
                    <span 
                      className="dropdown-item" 
                      style={{ cursor: "pointer" }}
                      onClick={() => handleOpportunityItemClick("/jobSeeker/application-status")}
                    >
                      <i className="bi bi-clipboard-check me-2"></i>Application status
                    </span>
                  </li>
                  <li>
                    <span 
                      className="dropdown-item" 
                      style={{ cursor: "pointer" }}
                      onClick={() => handleOpportunityItemClick("/jobSeeker/saved-jobs")}
                    >
                      <i className="bi bi-bookmark me-2"></i>Saved jobs
                    </span>
                  </li>
                </ul>
              </li>
            </ul>

            {/* Right side */}
            {userData && (
              <ul className="navbar-nav ms-auto align-items-center gap-3">
                {/* Bell */}
                <li className="nav-item">
                  <button className="btn position-relative">
                    <i className="bi bi-bell fs-5"></i>
                   
                  </button>
                </li> 

                {/* Profile */}
                <li
                  className="nav-item"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#profilePanel"
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                      style={{ width: "36px", height: "36px" }}
                    >
                      {getInitials(userData?.name || userData?.fullName)}
                    </div>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      {/* PROFILE OFFCANVAS */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="profilePanel">
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title">Profile</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          {userData ? (
            <>
              {/* User Info */}
              <div className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                  style={{ width: "56px", height: "56px", fontSize: "20px" }}
                >
                  {getInitials(userData?.name || userData?.fullName)}
                </div>
                <div>
                  <h6 className="mb-0">{userData?.name}</h6>
                  <small className="text-muted">{userData?.email}</small>
                  <div>
                    <a
                      href="#"
                      className="text-primary small"
                      onClick={() => navigate("/jobSeeker/seekerProfile")}
                    >
                      View & Update Profile
                    </a>  
                  </div>
                </div>
              </div>

              {/* Profile performance */}
              <div className="d-flex justify-content-around text-center my-4">
                <div>
                  <h5 className="text-danger mb-0">47</h5>
                  <small className="text-muted">Search Appearances</small>
                </div>
                <div>
                  <h5 className="text-danger mb-0">15</h5>
                  <small className="text-muted">Recruiter Actions</small>
                </div>
              </div>

              {/* Links */}
              <ul className="list-group mb-3">
                <li className="list-group-item list-group-item-action">
                  <i className="bi bi-journal-text me-2"></i> Career guidance
                </li>
                <li className="list-group-item list-group-item-action">
                  <i className="bi bi-gear me-2"></i> Settings
                </li>
                <li className="list-group-item list-group-item-action">
                  <i className="bi bi-question-circle me-2"></i> FAQs
                </li>
              </ul>

              {/* Logout */}
              <button
                className="btn btn-outline-danger w-100"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-1"></i> Logout
              </button>
            </>
          ) : (
            <p>Please login to see profile details.</p>
          )}
        </div>
      </div>
    </>
  );
}
