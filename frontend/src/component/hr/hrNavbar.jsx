import React from "react";
import "../../css/Hr/hrNavbar.css";

export default function HrNavbar({ toggleSidebar }) {
  return (
    <nav className="navbar">
      {/* Hamburger (only visible on mobile) */}
      <button
        className="hamburger"
        onClick={toggleSidebar}
        aria-label="Open sidebar"
      >
        ☰
      </button>

      <div className="navbar-title">HR Dashboard</div>

      <div className="navbar-actions">
        <button className="nav-btn" title="Notifications">🔔</button>
      </div>
    </nav>
  );
}