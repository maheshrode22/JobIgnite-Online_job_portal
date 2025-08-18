import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../css/Hr/sidebar.css";

export default function Sidebar({ isOpen, toggleSidebar, isMobile }) {
  const location = useLocation();
  const [jobsOpen, setJobsOpen] = useState(false); // submenu state

  const handleToggleJobs = () => setJobsOpen(!jobsOpen);

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>HR Panel</h2>
          {isMobile && (
            <button className="toggle-btn" onClick={toggleSidebar}>
              ×
            </button>
          )}
        </div>

        <ul className="sidebar-menu">
          <li className={location.pathname === "/hr/dashboard" ? "active" : ""}>
            <Link to="/hr/dashboard">📊 Dashboard</Link>
          </li>

          {/* Manage Jobs with Submenu */}
          <li className={`has-submenu ${jobsOpen ? "open" : ""}`}>
            <div className="submenu-title" onClick={handleToggleJobs}>
              💼 Manage Jobs {jobsOpen ? "▲" : "▼"}
            </div>
            {jobsOpen && (
              <ul className="submenu">
                <li className={location.pathname === "/hr/add-job" ? "active" : ""}>
                  <Link to="/hr/add-job">➕ Add Job</Link>
                </li>
                <li className={location.pathname === "/hr/view-jobs" ? "active" : ""}>
                  <Link to="/hr/view-jobs">👁️ View Jobs</Link>
                </li>
              </ul>
            )}
          </li>

          <li className={location.pathname === "/hr/view-applications" ? "active" : ""}>
            <Link to="/hr/view-applications">📑 Applications</Link>
          </li>
          <li className={location.pathname === "/hr/profile" ? "active" : ""}>
            <Link to="/hr/profile">👤 Profile</Link>
          </li>
          <li className={location.pathname === "/hr/settings" ? "active" : ""}>
            <Link to="/hr/settings">⚙️ Settings</Link>
          </li>
        </ul>
      </div>

      {isMobile && isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
}
