import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/admin/dashboardAdmin.css";
import { getDashboardStats, getRecentActivities } from "../../Services/adminService";
import { 
  FaUsers, 
  FaUserTie, 
  FaBriefcase, 
  FaExclamationTriangle,
  FaChartLine,
  FaChartPie,
  FaCalendarAlt,
  FaBell,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaSpinner
} from "react-icons/fa";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

export default function DashboardAdmin() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);

  const adminData = JSON.parse(localStorage.getItem("adminData")) || { admin_name: "Admin" };
  const rawName = adminData.admin_name;
  const name = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();

  // Chart colors
  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

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
              icon: FaUsers,
              color: "primary",
              change: "+12%",
              trend: "up"
            },
            {
              title: "Total HRs",
              count: data.totalHRs,
              icon: FaUserTie,
              color: "info",
              change: "+8%",
              trend: "up"
            },
            {
              title: "Total Jobs Posted",
              count: data.totalJobs,
              icon: FaBriefcase,
              color: "success",
              change: "+15%",
              trend: "up"
            },
            {
              title: "Pending Approvals",
              count: data.pendingApprovals,
              icon: FaExclamationTriangle,
              color: "warning",
              change: "-5%",
              trend: "down"
            },
          ]);

          // Generate sample chart data
          setChartData([
            { name: 'Jan', jobSeekers: 120, jobs: 45, applications: 89 },
            { name: 'Feb', jobSeekers: 150, jobs: 52, applications: 95 },
            { name: 'Mar', jobSeekers: 180, jobs: 48, applications: 110 },
            { name: 'Apr', jobSeekers: 200, jobs: 65, applications: 125 },
            { name: 'May', jobSeekers: 220, jobs: 70, applications: 140 },
            { name: 'Jun', jobSeekers: 250, jobs: 75, applications: 155 }
          ]);

          setPieData([
            { name: 'Active Jobs', value: data.totalJobs, color: '#6366f1' },
            { name: 'Pending Jobs', value: data.pendingApprovals, color: '#f59e0b' },
            { name: 'Completed', value: Math.floor(data.totalJobs * 0.3), color: '#10b981' }
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-admin-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <div className="welcome-content">
            <h1 className="welcome-title">
              Welcome back, <span className="text-gradient">{name}</span>!
            </h1>
            <p className="welcome-subtitle">
              Here's what's happening with your job portal today.
            </p>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline-light btn-sm">
              <FaBell className="me-2" />
              Notifications
            </button>
            <button className="btn btn-primary btn-sm">
              <FaEye className="me-2" />
              View Reports
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="metrics-section">
        <div className="row g-4">
          {loading ? (
            <div className="col-12 text-center">
              <FaSpinner className="fa-spin me-2" />
              Loading metrics...
            </div>
          ) : (
            metrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div key={index} className="col-xl-3 col-lg-6 col-md-6">
                  <div className={`metric-card metric-${metric.color}`}>
                    <div className="metric-icon">
                      <IconComponent />
                    </div>
                    <div className="metric-content">
                      <h3 className="metric-count">{metric.count}</h3>
                      <p className="metric-title">{metric.title}</p>
                      <div className="metric-trend">
                        {metric.trend === 'up' ? (
                          <FaArrowUp className="text-success me-1" />
                        ) : (
                          <FaArrowDown className="text-danger me-1" />
                        )}
                        <span className={metric.trend === 'up' ? 'text-success' : 'text-danger'}>
                          {metric.change}
                        </span>
                        <span className="text-muted ms-1">vs last month</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="row g-4">
          {/* Line Chart */}
          <div className="col-xl-8 col-lg-7">
            <div className="chart-card">
              <div className="chart-header">
                <h5 className="chart-title">
                  <FaChartLine className="me-2" />
                  Growth Analytics
                </h5>
                <div className="chart-actions">
                  <select className="form-select form-select-sm">
                    <option>Last 6 months</option>
                    <option>Last year</option>
                    <option>All time</option>
                  </select>
                </div>
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorJobSeekers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="jobSeekers" 
                      stroke="#6366f1" 
                      fillOpacity={1} 
                      fill="url(#colorJobSeekers)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="jobs" 
                      stroke="#10b981" 
                      fillOpacity={1} 
                      fill="url(#colorJobs)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="col-xl-4 col-lg-5">
            <div className="chart-card">
              <div className="chart-header">
                <h5 className="chart-title">
                  <FaChartPie className="me-2" />
                  Job Distribution
                </h5>
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="activities-section">
        <div className="row">
          <div className="col-12">
            <div className="activity-card">
              <div className="activity-header">
                <h5 className="activity-title">
                  <FaCalendarAlt className="me-2" />
                  Recent Activities
                </h5>
                <button className="btn btn-outline-primary btn-sm">
                  View All
                </button>
              </div>
              <div className="activity-content">
                {loadingActivities ? (
                  <div className="text-center py-4">
                    <FaSpinner className="fa-spin me-2" />
                    Loading activities...
                  </div>
                ) : recentActivities.length > 0 ? (
                  <div className="activity-list">
                    {recentActivities.map((activity, index) => (
                      <div key={activity.id || index} className="activity-item">
                        <div className="activity-icon">
                          <div className="activity-dot"></div>
                        </div>
                        <div className="activity-details">
                          <p className="activity-message">{activity.message}</p>
                          {activity.createdAt && (
                            <small className="activity-time">
                              {new Date(activity.createdAt).toLocaleString()}
                            </small>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted">
                    No recent activities
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
