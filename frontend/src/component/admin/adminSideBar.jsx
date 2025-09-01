import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/admin/adminSidebar.css";

export default function AdminSidebar({ isOpen, toggleSidebar, isMobile }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarLocked, setSidebarLocked] = useState(true);

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/");
  };

  const toggleSidebarLock = () => {
    setSidebarLocked((prev) => !prev);
  };

  // Determine sidebar class based on state
  const sidebarClass = isMobile 
    ? `admin-sidebar ${isOpen ? "open" : "closed"}`
    : `admin-sidebar ${isOpen ? "open" : "closed"}`;

  return (
    <>
      {/* Overlay for Mobile */}
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <aside className={sidebarClass}>
        {/* Logo Section */}
        <div className="sidebar-logo">
          <div className="logo-circle">
            <i className="bi bi-shield-fill-check"></i>
          </div>
          {!isMobile && (
            <div className="logo-text">
              <span className="admin-text">Admin</span>
              <span className="panel-text">Panel</span>
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

            {/* Dashboard */}
            <li className={`nav-item ${
              location.pathname.startsWith("/admin/dashboardAdmin") ||
              location.pathname === "/admin"
                ? "active"
                : ""
            }`}>
              <Link
                to="/admin/dashboardAdmin"
                onClick={(e) => {
                  if (isMobile) {
                    e.preventDefault();
                    toggleSidebar();
                    setTimeout(() => navigate("/admin/dashboardAdmin"), 100);
                  }
                }}
              >
                <i className="bi bi-speedometer2"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            {/* HR Management */}
            <li className={`nav-item ${
              location.pathname.startsWith("/admin/viewHr")
                ? "active"
                : ""
            }`}>
              <Link
                to="/admin/viewHr"
                onClick={(e) => {
                  if (isMobile) {
                    e.preventDefault();
                    toggleSidebar();
                    setTimeout(() => navigate("/admin/viewHr"), 100);
                  }
                }}
              >
                <i className="bi bi-person-badge-fill"></i>
                <span>HR Management</span>
              </Link>
            </li>

            {/* Job Seeker Management */}
            <li className={`nav-item ${
              location.pathname.startsWith("/admin/viewSeeker")
                ? "active"
                : ""
            }`}>
              <Link
                to="/admin/viewSeeker"
                onClick={(e) => {
                  if (isMobile) {
                    e.preventDefault();
                    toggleSidebar();
                    setTimeout(() => navigate("/admin/viewSeeker"), 100);
                  }
                }}
              >
                <i className="bi bi-people-fill"></i>
                <span>Job Seekers</span>
              </Link>
            </li>

            {/* Job Management */}
            <li className={`nav-item ${
              location.pathname.startsWith("/admin/viewJobs")
                ? "active"
                : ""
            }`}>
              <Link
                to="/admin/viewJobs"
                onClick={(e) => {
                  if (isMobile) {
                    e.preventDefault();
                    toggleSidebar();
                    setTimeout(() => navigate("/admin/viewJobs"), 100);
                  }
                }}
              >
                <i className="bi bi-briefcase-fill"></i>
                <span>Job Management</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="sidebar-bottom">
          <div className="nav-item">
            <button className="nav-button logout-btn" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
