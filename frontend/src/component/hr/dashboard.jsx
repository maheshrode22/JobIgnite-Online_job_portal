import React from "react";
import "../../css/Hr/dashboard.css";

export default function DashboardHome() {
  const metrics = [
    { title: "Open Jobs", count: 12, icon: "💼" },
    { title: "Applications", count: 45, icon: "📑" },
    { title: "Shortlisted", count: 8, icon: "✅" },
    { title: "Interviews", count: 5, icon: "📅" },
    { title: "Offers Made", count: 2, icon: "🏆" },
  ];

  const hrData = JSON.parse(localStorage.getItem("hrData"));
  const recentActivities = [
    "John Doe applied for Software Engineer",
    "Jane Smith shortlisted for QA Engineer",
    "Interview scheduled with Rahul for Product Manager",
    "New job posted: Frontend Developer",
  ];
  
 

  return (
    <div className="dashboard-content">
      <div className="welcome-banner">
        <h2>Welcome <span className="text-danger">{hrData.hr_name} Sir</span> </h2>
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
    </div>
  );
}
