import React from "react";
import "../../css/Hr/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">HR Panel</h2>

      <ul className="sidebar-menu">
        <li>📊 Dashboard</li>
        <li>💼 Manage Jobs</li>
        <li>📑 Applications</li>
        <li>👤 Profile</li>
        <li>⚙️ Settings</li>
      </ul>
    </div>
  );
}
