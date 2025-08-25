import React from "react";
import "../../css/Hr/hrNavbar.css";

export default function AdminNavbar({ toggleSidebar }) {
  return (
    <nav className="hrnavbar">
      
      <button
        className="hrhamburger"
        onClick={toggleSidebar}
        aria-label="Open sidebar"
      >
        ☰
      </button>

      <div className="hrnavbar-title">Admin Dashboard</div>

      <div className="hrnavbar-actions">
        <button className="hrnav-btn" title="Notifications">🔔</button>
      </div>
    </nav>
  );
}
