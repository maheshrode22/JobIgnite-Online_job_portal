import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/Hr/sidebar.css";

export default function Sidebar({ isOpen, toggleSidebar, isMobile }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [jobsOpen, setJobsOpen] = useState(false);
  const [sidebarLocked, setSidebarLocked] = useState(true);

  const handleToggleJobs = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setJobsOpen((v) => !v);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.removeItem("hr_token");
    localStorage.removeItem("hr_user");
    navigate("/");
  };

  const toggleSidebarLock = () => {
    setSidebarLocked((prev) => !prev);
  };

  // Determine sidebar class based on state
  const sidebarClass = isMobile 
    ? `hr-sidebar ${isOpen ? "open" : "closed"}`
    : `hr-sidebar ${isOpen ? "open" : "closed"}`;

  return (
    <>
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <aside className={sidebarClass}>
        {/* Logo Section */}
        <div className="sidebar-logo">
          <div className="logo-circle">
            <img src="/src/assets/img/JobIgnite.png" alt="JobIgnite Logo" className="logo-image" />
          </div>
          {!isMobile && (
            <div className="logo-text">
              <span className="job-text">Job</span>
              <span className="ignite-text">Ignite</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          
          <ul className="nav-list">
            {/* Collapse Button in Navigation List */}
            {!isMobile && (
              <li className="nav-item">
                <button className="nav-button collapse-nav-btn" onClick={toggleSidebar}>
                  <i className={`bi ${isOpen ? "bi-lock-fill" : "bi-unlock-fill"}`}></i>
                </button>
              </li>
            )}

            <li
              className={`nav-item ${
                location.pathname.startsWith("/hr/dashboard") ||
                location.pathname === "/hr"
                  ? "active"
                  : ""
              }`}
            >
                          <Link
              to="/hr/dashboard"
              onClick={(e) => {
                if (isMobile) {
                  e.preventDefault();
                  toggleSidebar();
                  setTimeout(() => navigate("/hr/dashboard"), 100);
                }
              }}
            >
                <i className="bi bi-speedometer2"></i>
              </Link>
            </li>

            {/* Manage Jobs */}
            <li className={`nav-item ${
              jobsOpen || 
              location.pathname.startsWith("/hr/addJobs") ||
              location.pathname.startsWith("/hr/viewJob")
                ? "active"
                : ""
            }`}>
              <button className="nav-button" onClick={handleToggleJobs}>
                <i className="bi bi-briefcase"></i>
              </button>
            </li>

            {jobsOpen && (
              <>
                <li
                  className={`nav-item sub-item ${
                    location.pathname.startsWith("/hr/addJobs") ? "active" : ""
                  }`}
                >
                  <Link
                    to="/hr/addJobs"
                    onClick={(e) => {
                      if (isMobile) {
                        e.preventDefault();
                        toggleSidebar();
                        setTimeout(() => navigate("/hr/addJobs"), 100);
                      }
                    }}
                  >
                    <i className="bi bi-plus-circle"></i>
                  </Link>
                </li>
                <li
                  className={`nav-item sub-item ${
                    location.pathname.startsWith("/hr/viewJob") ? "active" : ""
                  }`}
                >
                  <Link
                    to="/hr/viewJob"
                    onClick={(e) => {
                      if (isMobile) {
                        e.preventDefault();
                        toggleSidebar();
                        setTimeout(() => navigate("/hr/viewJob"), 100);
                      }
                    }}
                  >
                    <i className="bi bi-eye"></i>
                  </Link>
                </li>
              </>
            )}

            {/* Applications */}
            <li
              className={`nav-item ${
                location.pathname.startsWith("/hr/Applications")
                  ? "active"
                  : ""
              }`}
            >
              <Link
                to="/hr/Applications"
                onClick={(e) => {
                  if (isMobile) {
                    e.preventDefault();
                    toggleSidebar();
                    setTimeout(() => navigate("/hr/Applications"), 100);
                  }
                }}
              >
                <i className="bi bi-files"></i>
              </Link>
            </li>

            {/* Profile */}
            <li
              className={`nav-item ${
                location.pathname.startsWith("/hr/hrprofile")
                  ? "active"
                  : ""
              }`}
            >
              <Link
                to="/hr/hrprofile"
                onClick={(e) => {
                  if (isMobile) {
                    e.preventDefault();
                    toggleSidebar();
                    setTimeout(() => navigate("/hr/hrprofile"), 100);
                  }
                }}
              >
                <i className="bi bi-person-circle"></i>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="sidebar-bottom">
          <div className="nav-item">
            <Link
              to="/hr/settings"
              onClick={(e) => {
                if (isMobile) {
                  e.preventDefault();
                  toggleSidebar();
                  setTimeout(() => navigate("/hr/settings"), 100);
                }
              }}
            >
              <i className="bi bi-gear"></i>
            </Link>
          </div>
          <div className="nav-item">
            <button className="nav-button logout-btn" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
