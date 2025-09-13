import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../Services/SeekerService"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/admin/viewJobs.css";

export default function ViewJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await getAllJobs();
        console.log("Jobs data:", res.data); // Debug log
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleViewJob = (job) => {
    console.log("Viewing job:", job); // Debug log
    navigate(/Admin/viewJobDetails/, { state: { job } });
  };

  // Get current date
  const getCurrentDate = () => {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return now.toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="container my-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger text-center">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="job-management-container">
      {/* Header Section */}
      <div className="header-section">
        <h1 className="main-title">Job Management Center</h1>
        <p className="date-text">{getCurrentDate()}</p>
        <p className="tagline">Managing Job Opportunities with Precision</p>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-header">
          <h2 className="content-title">Jobs Awaiting Review</h2>
        </div>

        {jobs.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Openings</th>
                  <th>Experience</th>
                  <th>Package</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <tr key={job.job_id} className={index % 2 !== 0 ? "table-light" : ""}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="job-title-cell">
                        <i className="bi bi-briefcase me-2 text-primary"></i>
                        {job.title}
                      </div>
                    </td>
                    <td>
                      <div className="company-cell">
                        <i className="bi bi-building me-2 text-primary"></i>
                        {job.company}
                      </div>
                    </td>
                    <td>
                      <div className="location-cell">
                        <i className="bi bi-geo-alt me-2 text-success"></i>
                        {job.location}
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-info">{job.opening}</span>
                    </td>
                    <td>
                      <span className="experience-badge">{job.experience_required}</span>
                    </td>
                    <td>
                      <span className="package-badge text-success fw-bold">{job.package}</span>
                    </td>
                    <td>
                      <span className="deadline-badge">
                        {new Date(job.deadline).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-success">Active</span>
                    </td>
                    <td className="text-center">
                      <div className="dropdown">
                        <button
                          className="btn btn-primary dropdown-toggle action-btn"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          View Details
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button 
                              className="dropdown-item" 
                              onClick={() => handleViewJob(job)}
                            >
                              <i className="bi bi-eye me-2"></i>View Full Details
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item">
                              <i className="bi bi-pencil me-2"></i>Edit Job
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item text-danger">
                              <i className="bi bi-trash me-2"></i>Delete Job
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="text-center py-5">
              <i className="bi bi-inbox display-1 text-muted mb-3"></i>
              <h4 className="text-muted">No jobs found</h4>
              <p className="text-muted">There are no jobs available at the moment.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
