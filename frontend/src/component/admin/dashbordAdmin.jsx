import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/Hr/dashboard.css";
import { getDashboardStats, getRecentActivities } from "../../services/adminService";

export default function DashboardAdmin() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(true);

  const adminData =
    JSON.parse(localStorage.getItem("adminData")) || { admin_name: "Admin" };
  const rawName = adminData.admin_name;
  const name =
    rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        if (res.success) {
          const data = res.data;
          setMetrics([
            {
              title: "Total Job Seekers",
              count: data.totalJobSeekers,
              icon: "bi-people-fill",
              color: "primary",
            },
            {
              title: "Total HRs",
              count: data.totalHRs,
              icon: "bi-person-badge-fill",
              color: "info",
            },
            {
              title: "Total Jobs Posted",
              count: data.totalJobs,
              icon: "bi-briefcase-fill",
              color: "success",
            },
            {
              title: "Pending Approvals",
              count: data.pendingApprovals,
              icon: "bi-exclamation-circle-fill",
              color: "warning",
            },
          ]);
        }
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchActivities = async () => {
      try {
        const data = await getRecentActivities();
        setRecentActivities(data.success ? data.activities : []);
      } catch (err) {
        console.error("Error fetching recent activities:", err);
      } finally {
        setLoadingActivities(false);
      }
    };

    fetchStats();
    fetchActivities();
  }, []);

  return (
    <div className="dashboard-content container">
      {/* Welcome Banner */}
      <div className="welcome-banner shadow-lg">
        <h2>
          Welcome <span className="text-danger">{name}</span>
        </h2>
        <p className="mb-0">
          Manage Job Seekers, HRs, Jobs, and system analytics efficiently.
        </p>
      </div>

      {/* Metrics Section */}
      <div className="row g-4 mt-4">
        {loading ? (
          <p>Loading metrics...</p>
        ) : (
          metrics.map((metric, index) => (
            <div key={index} className="col-md-4 col-lg-3">
              <div className="metric-card border-0 shadow h-100 text-center bg-white rounded-4 p-4">
                <div
                  className={`icon-circle bg-${metric.color} text-white mb-3`}
                >
                  <i className={`bi ${metric.icon} fs-3`}></i>
                </div>
                <h3 className="fw-bold">{metric.count}</h3>
                <p className="text-muted">{metric.title}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Recent Activity */}
      <div className="recent-activity mt-5 shadow rounded-4 p-4 bg-white">
        <h4 className="mb-3">Recent Activities</h4>
        <ul className="list-unstyled">
          {loadingActivities ? (
            <li>Loading activities...</li>
          ) : recentActivities.length > 0 ? (
            recentActivities.map((activity, index) => (
              <li
                key={activity.id || index}
                className="mb-3 d-flex align-items-start"
              >
                <i className="bi bi-circle-fill text-primary me-2 mt-1"></i>
                <div>
                  <div>{activity.message}</div>
                  {activity.createdAt && (
                    <small className="text-muted">
                      {new Date(activity.createdAt).toLocaleString()}
                    </small>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li>No recent activities</li>
          )}
        </ul>
      </div>
    </div>
  );
}
