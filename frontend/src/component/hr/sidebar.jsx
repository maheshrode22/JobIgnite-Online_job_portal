import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../css/Hr/sidebar.css";

export default function Sidebar({ isOpen, toggleSidebar, isMobile }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [jobsOpen, setJobsOpen] = useState(false);

  const handleToggleJobs = () => setJobsOpen((v) => !v);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Header */}
      <div className="sidebar-header">
        <h2>HR Dashboard</h2>
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
        <li className={location.pathname === "/hr/dashboard" ? "active" : ""}>
          <Link
            to="/hr/dashboard"
            onClick={isMobile ? toggleSidebar : undefined}
          >
            📊 Dashboard
          </Link>
        </li>

        <li className={`has-submenu ${jobsOpen ? "open" : ""}`}>
          <button className="submenu-title" onClick={handleToggleJobs}>
            💼 Manage Jobs {jobsOpen ? "▲" : "▼"}
          </button>
          {jobsOpen && (
            <ul className="submenu">
              <li
                className={location.pathname === "/hr/add-job" ? "active" : ""}
              >
                <Link
                  to="/hr/addJobs"
                  onClick={isMobile ? toggleSidebar : undefined}
                >
                  ➕ Add Job
                </Link>
              </li>
              <li
                className={
                  location.pathname === "/hr/view-jobs" ? "active" : ""
                }
              >
                <Link
                  to="/hr/view-jobs"
                  onClick={isMobile ? toggleSidebar : undefined}
                >
                  👁️ View Jobs
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={
            location.pathname === "/hr/view-applications" ? "active" : ""
          }
        >
          <Link
            to="/hr/view-applications"
            onClick={isMobile ? toggleSidebar : undefined}
          >
            📑 Applications
          </Link>
        </li>

        <li className={location.pathname === "/hr/hrprofile" ? "active" : ""}>
          <Link to="/hr/hrprofile" onClick={isMobile ? toggleSidebar : undefined}>
            👤 Profile
          </Link>
        </li>

        <li className={location.pathname === "/hr/settings" ? "active" : ""}>
          <Link
            to="/hr/settings"
            onClick={isMobile ? toggleSidebar : undefined}
          >
            ⚙️ Settings
          </Link>
        </li>
      </ul>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
