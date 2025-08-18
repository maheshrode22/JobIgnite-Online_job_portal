import React from "react";
import Sidebar from "../hr/sidebar"; 
import Navbar from "../Navbar"; // Import your Navbar
import "../../css/Hr/HrDashboard.css"; 

export default function HrDashboard() {
  return (
    <div className="hr-dashboard">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="main-content">
        {/* Navbar with Logout */}
        <Navbar />

        <div className="dashboard-content">
          <h2>Welcome to HR Dashboard</h2>
          <p>Select an option from the sidebar to get started.</p>
        </div>
      </div>
    </div>
  );
}
