import React from "react";
import "../../css/Hr/hrNavbar.css";

export default function HrNavbar({ toggleSidebar }) {
  return (
    <nav className="hrnavbar">
      
      <button
        className="hrhamburger"
        onClick={toggleSidebar}
        aria-label="Open sidebar"
      >
        ☰
      </button>

      <div className="hrnavbar-title">HR Dashboard</div>

      <div className="hrnavbar-actions">
        <button className="hrnav-btn" title="Notifications">🔔</button>
      </div>
    </nav>
  );
}
