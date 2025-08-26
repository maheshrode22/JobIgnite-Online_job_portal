import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/Hr/dashboard.css";
import { jwtDecode } from "jwt-decode";

export default function DashboardHome() {
  const metrics = [
    { title: "Open Jobs", count: 12, icon: "bi-briefcase-fill", color: "primary" },
    { title: "Applications", count: 45, icon: "bi-file-earmark-text-fill", color: "info" },
    { title: "Shortlisted", count: 8, icon: "bi-person-check-fill", color: "success" },
    { title: "Interviews", count: 5, icon: "bi-calendar-event-fill", color: "warning" },
    { title: "Offers Made", count: 2, icon: "bi-trophy-fill", color: "danger" },
  ];

  // Get token from localStorage
  const token = localStorage.getItem("hr_token");

  // Decode token and create userData object
  let userData = {
    id: null,
    name: "HR",
    email: "",
    role: "",
  };

  if (token) {
    const decoded = jwtDecode(token);
    userData = {
      id: decoded.id || decoded.hr_id || null,
      name: decoded.name
        ? decoded.name.charAt(0).toUpperCase() + decoded.name.slice(1).toLowerCase()
        : "HR",
      email: decoded.email || "",
      role: decoded.role || "",
    };
  }

  const recentActivities = [
    "John Doe applied for Software Engineer",
    "Jane Smith shortlisted for QA Engineer",
    "Interview scheduled with Rahul for Product Manager",
    "New job posted: Frontend Developer",
  ];

  return (
    <div className="dashboard-content container">
      {/* Welcome Banner */}
      <div className="welcome-banner shadow-lg">
        <h2>
          Welcome <span className="text-danger">{userData.name} Sir</span>
        </h2>
        <p className="mb-0">Manage your jobs, candidates, and interviews efficiently.</p>
        <p>Email: {userData.email}</p>
        <p>Role: {userData.role}</p>
      </div>

      {/* Metrics Section */}
      <div className="row g-4 mt-4">
        {metrics.map((metric, index) => (
          <div key={index} className="col-md-4 col-lg-3">
            <div className={`metric-card border-0 shadow h-100 text-center bg-white rounded-4 p-4`}>
              <div className={`icon-circle bg-${metric.color} text-white mb-3`}>
                <i className={`bi ${metric.icon} fs-3`}></i>
              </div>
              <h3 className="fw-bold">{metric.count}</h3>
              <p className="text-muted">{metric.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="recent-activity mt-5 shadow rounded-4 p-4 bg-white">
        <h4 className="fw-bold mb-3">
          <i className="bi bi-clock-history me-2 text-primary"></i> Recent Activity
        </h4>
        <ul className="list-unstyled">
          {recentActivities.map((activity, index) => (
            <li key={index} className="d-flex align-items-center mb-2">
              <i className="bi bi-check2-circle text-success me-2"></i>
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
