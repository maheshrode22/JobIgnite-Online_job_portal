import React, { useEffect, useState } from "react";
import { getSeekerApplications } from "../../Services/SeekerService";
import { jwtDecode } from "jwt-decode";
import "../../css/jobSeeker/AppliedHistory.css"; // custom css file

export default function AppliedHistory() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    let seekerId = null;
    if (token) {
      try {
        const decoded = jwtDecode(token);
        seekerId = decoded?.seeker_id || decoded?.id; 
      } catch (err) {
        console.error("Invalid token:", err);
        setError("Invalid session. Please login again.");
        setLoading(false);
        return;
      }
    }

    const fetchApplications = async () => {
      try {
        const response = await getSeekerApplications(seekerId);
        setApplications(response.data || []);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    if (seekerId) {
      fetchApplications();
    } else {
      setError("No valid user. Please login again.");
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center loader-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="container mt-4">
      <div className="history-header text-center mb-4">
        <h2 className="fw-bold text-primary">📄 My Applications</h2>
        <p className="text-muted">Track the jobs you have applied for</p>
      </div>

      {applications.length === 0 ? (
        <div className="alert alert-info text-center shadow-sm">
          <i className="bi bi-info-circle me-2"></i>
          You have not applied for any jobs yet.
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded-3">
          <table className="table table-hover align-middle">
            <thead className="table-primary text-center">
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Status</th>
                <th>Applied On</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={index} className="text-center">
                  <td className="fw-semibold">{app.title}</td>
                  <td>{app.company}</td>
                  <td>
                    <span
                      className={`badge px-3 py-2 rounded-pill 
                        ${
                        app.status === "Pending"
                          ? "bg-warning text-dark"
                          : app.status === "Accepted"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>{new Date(app.applied_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
