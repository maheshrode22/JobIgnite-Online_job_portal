import React, { useEffect, useState } from "react";
import { getSeekerApplications } from "../../Services/SeekerService";

export default function AppliedHistory() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const seekerId = localStorage.getItem("seeker_id");

  useEffect(() => {
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

    if (seekerId) fetchApplications();
  }, [seekerId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-3">My Applications</h2>
      {applications.length === 0 ? (
        <p className="text-center text-muted">You have not applied for any jobs yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Status</th>
                <th>Applied On</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={index}>
                  <td>{app.title}</td>
                  <td>{app.company}</td>
                  <td>
                    <span
                      className={`badge ${
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
