import React from "react";
import "../../css/jobSeeker/jsNavbar.css";

export default function JSNavbar({ toggleSidebar }) {
  return (
    <nav className="jsnavbar">
      {/* Hamburger (only visible on mobile) */}
      <button
        className="jshamburger"
        onClick={toggleSidebar}
        aria-label="Open sidebar"
      >
        ☰
      </button>

      <div className="jsnavbar-title">Jobseeker Dashboard</div>

      <div className="jsnavbar-actions">
        <button className="jsnav-btn" title="Notifications">🔔</button>
      </div>
    </nav>
  );
}
