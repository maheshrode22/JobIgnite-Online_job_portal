import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../css/jobSeeker/jobseekerside.css";

export default function JSSidebar({ isOpen, toggleSidebar, isMobile }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <aside className={`jssidebar ${isOpen ? "open" : "closed"}`}>
      {/* Header */}
      <div className="jssidebar-header">
        <h2>Jobseeker Dashboard</h2>
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
      <ul className="jssidebar-menu">
        <li className={location.pathname === "/jobSeeker/browse-jobs" ? "active" : ""}>
          <Link
            to="/jobSeeker/browse-jobs"
            onClick={isMobile ? toggleSidebar : undefined}
          >
            🔍 Browse Jobs
          </Link>
        </li>

        <li className={location.pathname === "/jobSeeker/applied-jobs" ? "active" : ""}>
          <Link
            to="/js/applied-jobs"
            onClick={isMobile ? toggleSidebar : undefined}
          >
            📑 Applied Jobs
          </Link>
        </li>

        <li
          className={location.pathname === "/jobSeeker/shortlisted-jobs" ? "active" : ""}
        >
          <Link
            to="/jobSeeker/shortlisted-jobs"
            onClick={isMobile ? toggleSidebar : undefined}
          >
            ⭐ Shortlisted Jobs
          </Link>
        </li>

        <li className={location.pathname === "/jobSeeker/profile" ? "active" : ""}>
          <Link to="/jobSeeker/profile" onClick={isMobile ? toggleSidebar : undefined}>
            👤 Profile
          </Link>
        </li>

        <li className={location.pathname === "/jobSeeker/settings" ? "active" : ""}>
          <Link
            to="/jobSeeker/settings"
            onClick={isMobile ? toggleSidebar : undefined}
          >
            ⚙️ Settings
          </Link>
        </li>
      </ul>

      {/* Footer */}
      <div className="jssidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
