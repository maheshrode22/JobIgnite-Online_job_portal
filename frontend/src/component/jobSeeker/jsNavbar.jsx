import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import JobIgniteLogo from "../../assets/img/JobIgnite.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/jobSeeker/jsNavbar.css";

export default function JSNavbar() {
  const [userData, setUserData] = useState(null);
  const [activeLink, setActiveLink] = useState("");
  const [showOpportunitiesDropdown, setShowOpportunitiesDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          localStorage.removeItem("token");
          setUserData(null);
          navigate("/");
          return;
        }

        setUserData(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
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
    navigate("/");
  };

  const handleOpportunitiesClick = () => {
    setShowOpportunitiesDropdown(!showOpportunitiesDropdown);
  };

  const handleOpportunityItemClick = (route) => {
    setShowOpportunitiesDropdown(false);
    setIsMobileMenuOpen(false);
    navigate(route);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setShowOpportunitiesDropdown(false);
  };

  const handleNavClick = (route) => {
    setIsMobileMenuOpen(false);
    navigate(route);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="jsNavBar fixed-top">
        <div className="navbar-container">
          {/* Logo */}
          <div
            className="jsNavBar-logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <img src={JobIgniteLogo} alt="JobIgnite" />
            <span className="brand-text">
              Job<span className="ignite">Ignite</span>
            </span>
          </div>

          {/* Hamburger Menu Toggle */}
          <button
            className="menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <i className={`bi ${isMobileMenuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
          </button>

          {/* Menu */}
          <div className={`jsNavBar-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <ul className="jsNavBar-nav">
              <li>
                <span
                  className={`jsNavBar-link ${activeLink === "jobs" ? "active" : ""
                    }`}
                  onClick={() => handleNavClick("/jobSeeker/browse-jobs")}
                >
                  Jobs
                </span>
              </li>
              <li>
                <span
                  className={`jsNavBar-link ${activeLink === "participate" ? "active" : ""
                    }`}
                  onClick={() => handleNavClick("/jobSeeker/participate")}
                >
                  Participate
                </span>
              </li>
              <li className="nav-item dropdown">
                <span
                  className={`jsNavBar-link ${activeLink === "opportunities" ? "active" : ""
                    }`}
                  onClick={handleOpportunitiesClick}
                  style={{ cursor: "pointer" }}
                >
                  Opportunities <i className="bi bi-caret-down-fill ms-1"></i>
                </span>
                <ul
                  className={`jsNavBar-dropdown ${showOpportunitiesDropdown ? "show" : ""
                    }`}
                >
                  <li onClick={() => handleOpportunityItemClick("/jobSeeker/recommended-jobs")}>
                    <i className="bi bi-star me-2"></i>Recommended jobs
                  </li>
                  <li onClick={() => handleOpportunityItemClick("/jobSeeker/job-invites")}>
                    <i className="bi bi-envelope me-2"></i>Job invites
                  </li>
                  <li onClick={() => handleOpportunityItemClick("/jobSeeker/job-alerts")}>
                    <i className="bi bi-bell me-2"></i>Jobs from alerts
                  </li>
                  <li onClick={() => handleOpportunityItemClick("/jobSeeker/application-status")}>
                    <i className="bi bi-clipboard-check me-2"></i>Application status
                  </li>
                  <li onClick={() => handleOpportunityItemClick("/jobSeeker/saved-jobs")}>
                    <i className="bi bi-bookmark me-2"></i>Saved jobs
                  </li>
                </ul>
              </li>
            </ul>

            {/* Right side */}
            {userData && (
              <div className="navbar-icons">
                <button className="icon-btn">
                  <i className="bi bi-bell fs-5"></i>
                </button>


                <div className="profile-avatar me-3 position-relative profile-avatar " data-bs-toggle="offcanvas"
                  data-bs-target="#profilePanel">
                  {userData.profile_image ? (
                    <img
                      src={userData.profile_image.startsWith('http') ? userData.profile_image : `http://localhost:3000/uploads/profile_images/${userData.profile_image}`}
                      alt="Profile"
                      className="rounded-circle"
                      width="80"
                      height="80"
                    />
                  ) : (
                    <PersonFill size={60} className="text-muted" />
                  )}

                </div>


              </div>
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
              <div className="d-flex align-items-center mb-3">
                {/* <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                  style={{ width: "56px", height: "56px", fontSize: "20px" }}
                >
                  {getInitials(userData?.name || userData?.fullName)}
                </div>
                 */}


                <div className="profile-avatar me-3 position-relative">
                  {userData.profile_image ? (
                    <img
                      src={userData.profile_image.startsWith('http') ? userData.profile_image : `http://localhost:3000/uploads/profile_images/${userData.profile_image}`}
                      alt="Profile"
                      className="rounded-circle"
                      width="80"
                      height="80"
                    />
                  ) : (
                    <PersonFill size={60} className="text-muted" />
                  )}

                </div>

                <div>
                  <h6 className="mb-0">{userData?.name}</h6>
                  <small className="text-muted">{userData?.email}</small>
                  <div>
                    <span
                      className="text-primary small"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/jobSeeker/seekerProfile")}
                    >
                      View & Update Profile
                    </span>
                  </div>
                </div>
              </div>



              <ul className="list-group mb-3">
                <li className="list-group-item list-group-item-action">
                  <i className="bi bi-journal-text me-2"></i> Career guidance
                </li>
                <li className="list-group-item list-group-item-action" onClick={()=>{navigate("/jobSeeker/helpPass")}}>
                  <i className="bi bi-gear me-2"></i> Settings
                </li>
                <li className="list-group-item list-group-item-action">
                  <i className="bi bi-question-circle me-2"></i> FAQs
                </li>
              </ul>

              <button
                className="btn btn-outline-danger w-100 text-danger"
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
