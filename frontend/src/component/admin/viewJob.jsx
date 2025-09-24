import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../Services/SeekerService"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap-icons/font/bootstrap-icons.css";

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
    navigate(`/Admin/viewJobDetails/${job.job_id}`, { state: { job } });
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
    <div className="">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center mb-1 fw-bold text-primary">
            <i className="bi bi-briefcase-fill me-2"></i>
            All Jobs
          </h2>
          <p className="text-center text-muted">Total Jobs: {jobs.length}</p>
        </div>
      </div>
      
      <div className="row g-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.job_id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0 rounded-3">
                <div className="card-body d-flex flex-column">
                  <div className="mb-3">
                    <h5 className="card-title text-dark fw-bold mb-2">
                      <i className="bi bi-briefcase me-2 text-primary"></i>
                      {job.title}
                    </h5>
                    <span className="badge bg-primary mb-2">Job ID: {job.job_id}</span>
                  </div>
                  
                  <div className="job-details mb-3">
                    <p className="mb-2">
                      <i className="bi bi-building me-2 text-primary"></i>
                      <strong>Company:</strong> {job.company}
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-geo-alt me-2 text-success"></i>
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-people me-2 text-info"></i>
                      <strong>Openings:</strong> {job.opening}
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-clock me-2 text-warning"></i>
                      <strong>Experience:</strong> {job.experience_required}
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-currency-dollar me-2 text-success"></i>
                      <strong>Package:</strong> {job.package}
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-calendar me-2 text-danger"></i>
                      <strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => handleViewJob(job)}
                    >
                      <i className="bi bi-eye me-2"></i> View Full Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
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
