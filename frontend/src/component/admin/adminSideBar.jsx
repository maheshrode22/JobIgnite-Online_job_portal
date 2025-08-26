import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/Hr/sidebar.css";

export default function AdminSidebar({ isOpen, toggleSidebar, isMobile }) {
  const location = useLocation();

  // State for submenus
  const [adminOpen, setAdminOpen] = useState(false);
  const [seekerOpen, setSeekerOpen] = useState(false);
  const [jobOpen, setJobOpen] = useState(false);

  const handleLogout = () => {
    // Remove token and admin data
    localStorage.removeItem("admindToken");
    // Force redirect to login page
    window.location.href = "/";
  };

  return (
    <>
      {/* Overlay for Mobile */}
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        {/* Header */}
        <div className="sidebar-header">
          <h2>
            <i className="bi bi-shield-fill-check"></i> Admin Panel
          </h2>
          {isMobile && (
            <button className="toggle-btn" onClick={toggleSidebar}>
              ×
            </button>
          )}
        </div>

        {/* Menu Items */}
        <ul className="sidebar-menu">
          {/* Dashboard */}
          <li className={location.pathname.startsWith("/admin/dashboardAdmin") ? "active" : ""}>
            <Link to="/admin/dashboardAdmin" onClick={isMobile ? toggleSidebar : undefined}>
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </Link>
          </li>

          {/* HR Management */}
          <li className={`has-submenu ${adminOpen ? "open" : ""}`}>
            <button className="submenu-title" onClick={() => setAdminOpen(prev => !prev)}>
              <i className="bi bi-person-badge-fill me-2"></i> HR Management
              <i className={`bi ${adminOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
            </button>
            {adminOpen && (
              <ul className="submenu">
                <li className={location.pathname.startsWith("/admin/viewHR") ? "active" : ""}>
                  <Link to="/admin/viewHr" onClick={isMobile ? toggleSidebar : undefined}>
                    <i className="bi bi-eye me-2"></i> View HR
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Job Seeker Management */}
          <li className={`has-submenu ${seekerOpen ? "open" : ""}`}>
            <button className="submenu-title" onClick={() => setSeekerOpen(prev => !prev)}>
              <i className="bi bi-people-fill me-2"></i> Job Seeker Management
              <i className={`bi ${seekerOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
            </button>
            {seekerOpen && (
              <ul className="submenu">
                <li className={location.pathname.startsWith("/admin/viewSeeker") ? "active" : ""}>
                  <Link to="/admin/viewSeeker" onClick={isMobile ? toggleSidebar : undefined}>
                    <i className="bi bi-eye me-2"></i> View Seekers
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Job Management */}
          <li className={`has-submenu ${jobOpen ? "open" : ""}`}>
            <button className="submenu-title" onClick={() => setJobOpen(prev => !prev)}>
              <i className="bi bi-briefcase-fill me-2"></i> Job Management
              <i className={`bi ${jobOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
            </button>
            {jobOpen && (
              <ul className="submenu">
                <li className={location.pathname.startsWith("/admin/viewJobs") ? "active" : ""}>
                  <Link to="/admin/viewJobs" onClick={isMobile ? toggleSidebar : undefined}>
                    <i className="bi bi-eye me-2"></i> View Jobs
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Reports */}
          <li className={location.pathname.startsWith("/admin/reports") ? "active" : ""}>
            <Link to="/admin/reports" onClick={isMobile ? toggleSidebar : undefined}>
              <i className="bi bi-bar-chart-fill me-2"></i> Reports
            </Link>
          </li>

          {/* Profile */}
          <li className={location.pathname.startsWith("/admin/profile") ? "active" : ""}>
            <Link to="/admin/profile" onClick={isMobile ? toggleSidebar : undefined}>
              <i className="bi bi-person-circle me-2"></i> Profile
            </Link>
          </li>

          {/* Settings */}
          <li className={location.pathname.startsWith("/admin/settings") ? "active" : ""}>
            <Link to="/admin/settings" onClick={isMobile ? toggleSidebar : undefined}>
              <i className="bi bi-gear-fill me-2"></i> Settings
            </Link>
          </li>
        </ul>

        {/* Footer */}
        <div className="sidebar-footer">
          <button className="logout-btn btn btn-danger w-100" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
