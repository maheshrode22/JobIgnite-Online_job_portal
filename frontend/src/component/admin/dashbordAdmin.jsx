import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap Icons
import "../../css/Hr/dashboard.css"; // Keep HR CSS

export default function DashboardAdmin() {
  const metrics = [
    { title: "Total Job Seekers", count: 120, icon: "bi-people-fill", color: "primary" },
    { title: "Total HRs", count: 25, icon: "bi-person-badge-fill", color: "info" },
    { title: "Total Jobs Posted", count: 300, icon: "bi-briefcase-fill", color: "success" },
    { title: "Pending Approvals", count: 5, icon: "bi-exclamation-circle-fill", color: "warning" },
  ];

  const adminData = JSON.parse(localStorage.getItem("adminData")) || { admin_name: "Admin" };
  const rawName = adminData.admin_name;
  const name = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();

  const recentActivities = [
    "New job posted: Frontend Developer",
    "John Doe registered as Job Seeker",
    "HR Jane Smith added new job postings",
    "Pending approvals reviewed",
  ];

  return (
    <div className="dashboard-content container">
      {/* Welcome Banner */}
      <div className="welcome-banner shadow-lg">
        <h2>
          Welcome <span className="text-danger">{name}</span>
        </h2>
        <p className="mb-0">Manage Job Seekers, HRs, Jobs, and system analytics efficiently.</p>
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
