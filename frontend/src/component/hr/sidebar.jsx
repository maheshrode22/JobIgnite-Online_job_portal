import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css"; // ✅
import "../../css/Hr/sidebar.css";

export default function Sidebar({ isOpen, toggleSidebar, isMobile }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [jobsOpen, setJobsOpen] = useState(false);

  const handleToggleJobs = () => setJobsOpen((v) => !v);

  const handleLogout = () => {
    localStorage.removeItem("hr_token");
    localStorage.removeItem("hr_user");
    navigate("/");
  };

  return (
    <>
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        {/* Header */}
        <div className="sidebar-header">
          <h2><i className="bi bi-briefcase-fill"></i> HR Panel</h2>
          {isMobile && (
            <button
              className="toggle-btn"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
            >
              ×
            </button>
          )}
        </div>

        {/* Menu */}
        <ul className="sidebar-menu">
          <li
            className={
              location.pathname.startsWith("/hr/dashboard") ||
              location.pathname === "/hr"
                ? "active"
                : ""
            }
          >
            <Link
              to="/hr/dashboard"
              onClick={isMobile ? toggleSidebar : undefined}
            >
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </Link>
          </li>

          <li className={`has-submenu ${jobsOpen ? "open" : ""}`}>
            <button className="submenu-title" onClick={handleToggleJobs}>
              <i className="bi bi-briefcase me-2"></i> Manage Jobs{" "}
              <i className={`bi ${jobsOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
            </button>
            {jobsOpen && (
              <ul className="submenu">
                <li
                  className={
                    location.pathname.startsWith("/hr/addJobs") ? "active" : ""
                  }
                >
                  <Link
                    to="/hr/addJobs"
                    onClick={isMobile ? toggleSidebar : undefined}
                  >
                    <i className="bi bi-plus-circle me-2"></i> Add Job
                  </Link>
                </li>
                <li
                  className={
                    location.pathname.startsWith("/hr/viewJob") ? "active" : ""
                  }
                >
                  <Link
                    to="/hr/viewJob"
                    onClick={isMobile ? toggleSidebar : undefined}
                  >
                    <i className="bi bi-eye me-2"></i> View Jobs
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li
            className={
              location.pathname.startsWith("/hr/Applications")
                ? "active"
                : ""
            }
          >
            <Link
              to="/hr/Applications"
              onClick={isMobile ? toggleSidebar : undefined}
            >
              <i className="bi bi-files me-2"></i> Applications
            </Link>
          </li>

          <li
            className={
              location.pathname.startsWith("/hr/hrprofile") ? "active" : ""
            }
          >
            <Link
              to="/hr/hrprofile"
              onClick={isMobile ? toggleSidebar : undefined}
            >
              <i className="bi bi-person-circle me-2"></i> Profile
            </Link>
          </li>

          <li
            className={
              location.pathname.startsWith("/hr/settings") ? "active" : ""
            }
          >
            <Link
              to="/hr/settings"
              onClick={isMobile ? toggleSidebar : undefined}
            >
              <i className="bi bi-gear-fill me-2"></i> Settings
            </Link>
          </li>
        </ul>

        {/* Footer */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
