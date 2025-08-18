import React, { useState, useEffect } from "react";
import Sidebar from "../hr/sidebar";
import Navbar from "../Navbar";
import "../../css/Hr/HrDashboard.css";

export default function HrDashboard() {
  const [activePage, setActivePage] = useState("dashboard"); // default
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
      if (mobile) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Dummy content for each page
  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardContent />;
      case "view-jobs":
        return <ViewJobs />;
      case "applications":
        return <Applications />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Settings />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="hr-dashboard">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
        setActivePage={setActivePage}
        activePage={activePage}
      />
      <div className="main-content">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="dashboard-content">{renderContent()}</div>
      </div>
    </div>
  );
}

// ------------------- Content Components -------------------
const DashboardContent = () => {
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

const ViewJobs = () => <h2>View Jobs Page Content</h2>;
const Applications = () => <h2>Applications Page Content</h2>;
const Profile = () => <h2>Profile Page Content</h2>;
const Settings = () => <h2>Settings Page Content</h2>;
