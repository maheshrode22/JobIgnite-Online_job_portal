import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/Hr/dashboard.css";
import { jwtDecode } from "jwt-decode";

export default function DashboardHome() {
  const metrics = [
    { 
      title: "Open Jobs", 
      count: 12, 
      icon: "bi-briefcase-fill", 
      color: "primary",
      trend: "+15%",
      trendUp: true,
      description: "Active job postings"
    },
    { 
      title: "Applications", 
      count: 45, 
      icon: "bi-file-earmark-text-fill", 
      color: "info",
      trend: "+8%",
      trendUp: true,
      description: "Total applications received"
    },
    { 
      title: "Shortlisted", 
      count: 8, 
      icon: "bi-person-check-fill", 
      color: "success",
      trend: "+12%",
      trendUp: true,
      description: "Candidates shortlisted"
    },
    { 
      title: "Interviews", 
      count: 5, 
      icon: "bi-calendar-event-fill", 
      color: "warning",
      trend: "-3%",
      trendUp: false,
      description: "Scheduled interviews"
    },
    { 
      title: "Offers Made", 
      count: 2, 
      icon: "bi-trophy-fill", 
      color: "danger",
      trend: "+25%",
      trendUp: true,
      description: "Offers extended"
    },
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
    {
      action: "John Doe applied for Software Engineer",
      time: "2 hours ago",
      type: "application",
      status: "new"
    },
    {
      action: "Jane Smith shortlisted for QA Engineer",
      time: "4 hours ago",
      type: "shortlist",
      status: "completed"
    },
    {
      action: "Interview scheduled with Rahul for Product Manager",
      time: "1 day ago",
      type: "interview",
      status: "scheduled"
    },
    {
      action: "New job posted: Frontend Developer",
      time: "2 days ago",
      type: "job",
      status: "published"
    },
    {
      action: "Offer accepted by Sarah Johnson",
      time: "3 days ago",
      type: "offer",
      status: "accepted"
    }
  ];

  const quickStats = [
    { label: "This Week", value: "23", change: "+12%" },
    { label: "This Month", value: "156", change: "+8%" },
    { label: "This Year", value: "1,234", change: "+15%" }
  ];

  return (
    <div className="dashboard-container">
      <div className="container-fluid">
        {/* Welcome Banner */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="welcome-banner">
              <div className="row align-items-center">
                <div className="col-lg-8 col-md-7">
                  <div className="welcome-text">
                    <h2>Welcome back, {userData.name}!</h2>
                    <p className="welcome-subtitle">Here's what's happening with your recruitment today.</p>
                    <div className="d-flex gap-3 flex-wrap">
                      <span className="user-email">{userData.email}</span>
                      <span className="user-role">{userData.role}</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-5 text-center">
                  <div className="welcome-illustration">
                    <i className="bi bi-graph-up-arrow"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="row mb-4">
          {quickStats.map((stat, index) => (
            <div key={index} className="col-lg-4 col-md-4 col-sm-12 mb-3">
              <div className="quick-stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Metrics Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="section-header mb-4">
              <h3>Key Metrics</h3>
              <p>Overview of your recruitment performance</p>
            </div>
          </div>
        </div>
        
        <div className="row">
          {metrics.map((metric, index) => (
            <div key={index} className="col-lg-2 col-md-4 col-sm-6 mb-3">
              <div className="metric-card">
                <div className="metric-header">
                  <div className={`icon-circle icon-${metric.color}`}>
                    <i className={`bi ${metric.icon}`}></i>
                  </div>
                  <div className={`trend-indicator ${metric.trendUp ? 'trend-up' : 'trend-down'}`}>
                    <i className={`bi ${metric.trendUp ? 'bi-arrow-up' : 'bi-arrow-down'}`}></i>
                    <span>{metric.trend}</span>
                  </div>
                </div>
                <div className="metric-content">
                  <div className="metric-number">{metric.count}</div>
                  <div className="metric-title">{metric.title}</div>
                  <div className="metric-description">{metric.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="section-header mb-4">
              <h3>Recent Activity</h3>
              <p>Latest updates from your recruitment pipeline</p>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-12">
            <div className="activity-list">
              {recentActivities.map((activity, index) => (
                <div key={index} className={`activity-item activity-${activity.type} mb-3`}>
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <div className="activity-icon">
                        <i className={`bi ${getActivityIcon(activity.type)}`}></i>
                      </div>
                    </div>
                    <div className="col">
                      <div className="activity-content">
                        <div className="activity-text">{activity.action}</div>
                        <div className="activity-time">{activity.time}</div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className={`activity-status status-${activity.status}`}>
                        <span>{activity.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get activity icons
function getActivityIcon(type) {
  const icons = {
    application: 'bi-file-earmark-plus',
    shortlist: 'bi-person-check',
    interview: 'bi-calendar-event',
    job: 'bi-briefcase',
    offer: 'bi-trophy'
  };
  return icons[type] || 'bi-info-circle';
}