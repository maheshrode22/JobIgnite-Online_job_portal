import React, { useState, useEffect } from "react";
import Sidebar from "../hr/sidebar"; // your existing sidebar
import Navbar from "../Navbar";       // your existing navbar
import "../../css/Hr/HrDashboard.css";

export default function HrDashboard() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="hr-dashboard">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      {/* Main content */}
      <div className="main-content">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="dashboard-content">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

// ------------------- Dashboard Content -------------------
const Dashboard = () => {
  const metrics = [
    { title: "Open Jobs", count: 12, icon: "💼" },
    { title: "Applications", count: 45, icon: "📑" },
    { title: "Shortlisted", count: 8, icon: "✅" },
    { title: "Interviews", count: 5, icon: "📅" },
    { title: "Offers Made", count: 2, icon: "🏆" },
  ];

  const recentActivities = [
    "John Doe applied for Software Engineer",
    "Jane Smith shortlisted for QA Engineer",
    "Interview scheduled with Rahul for Product Manager",
    "New job posted: Frontend Developer",
  ];

  return (
    <>
      <div className="welcome-banner">
        <h2>Welcome, HR Name!</h2>
        <p>Manage your jobs, candidates, and interviews efficiently.</p>
      </div>

      <div className="metrics-cards">
        {metrics.map((metric, index) => (
          <div key={index} className="card">
            <div className="card-icon">{metric.icon}</div>
            <h3>{metric.count}</h3>
            <p>{metric.title}</p>
          </div>
        ))}
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul>
          {recentActivities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
