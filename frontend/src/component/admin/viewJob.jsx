import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../Services/SeekerService"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap-icons/font/bootstrap-icons.css"; // ✅ Icons

export default function ViewJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getAllJobs();
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleViewJob = (job) => {
    navigate(`/jobSeeker/viewJobDetails/${job.job_id}`, { state: { job } });
  };

  return (
    <div className="job-container container my-5">
      <h2 className="text-center mb-4 fw-bold text-primary">Browse Jobs</h2>
      <div className="row g-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.job_id} className="col-12 col-md-6 col-lg-4">
              <div className="job-card h-100 shadow-sm border-0 rounded-3">
                <div className="job-card-body d-flex flex-column">
                  <h5 className="job-title text-dark fw-bold mb-3">
                    <i className="bi bi-briefcase me-2"></i> {job.title}
                  </h5>
                  <p className="job-info mb-2">
                    <i className="bi bi-building me-2 text-primary"></i>
                    <strong>Company:</strong> {job.company}
                  </p>
                  <p className="job-info mb-2">
                    <i className="bi bi-geo-alt me-2 text-success"></i>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p className="job-info mb-3">
                    <i className="bi bi-currency-dollar me-2 text-warning"></i>
                    <strong>Package:</strong> {job.package}
                  </p>
                  <div className="mt-auto">
                    <button
                      className="btn btn-outline-primary w-100"
                      onClick={() => handleViewJob(job)}
                    >
                      <i className="bi bi-eye me-2"></i> View Job
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No jobs found</p>
        )}
      </div>
    </div>
  );
}
