import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../Services/SeekerService";
import "../../css/jobSeeker/browseJobs.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function BrowseJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getAllJobs();
        if (res.data) {
          setJobs(res.data);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  const handleViewJob = (job) => {
    navigate(`/jobSeeker/jobDetail/${job.job_id}`, { state: { job } });
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase())
    );
  });

  return (
    <div className="container">
      {/* Page Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">✨ Explore Latest Jobs</h2>
        <p className="text-muted">
          Find jobs that match your skills and career goals
        </p>
      </div>

      {/* Filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="🔍 Search by job title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="📍 Search by location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      {/* Jobs List */}
      <div className="row g-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div className="col-md-6 col-lg-4" key={job.job_id}>
              <div
                className="card jobcard shadow-sm h-100"
                onClick={() => handleViewJob(job)}
                role="button"
              >
                <div className="card-body d-flex flex-column">
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div
                      className="company-logo rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                      style={{
                        backgroundColor: "#0d6efd",
                        width: "50px",
                        height: "50px",
                        fontSize: "1rem",
                      }}
                    >
                      {job.company?.charAt(0).toUpperCase()}
                    </div>
                    <span className="badge bg-info text-dark">
                      {job.type || "Full Time"}
                    </span>
                  </div>

                  {/* Job Info */}
                  <h6 className="job-title mb-1">{job.title}</h6>
                  <p className="company-name mb-2">{job.company}</p>

                  {/* Details */}
                  <div className="job-details mb-3">
                    <p className="mb-1 detail-text">
                      <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                      {job.location}
                    </p>
                    <p className="mb-1 detail-text">
                      <i className="bi bi-currency-rupee text-success me-2"></i>
                      {job.package ? `${job.package} LPA` : "Not disclosed"}
                    </p>
                  </div>

                  {/* Skills */}
                  {job.skills && job.skills.length > 0 && (
                    <div className="mb-3">
                      <span className="fw-semibold small d-block mb-2">
                        Skills Required:
                      </span>
                      <div className="d-flex flex-wrap gap-2">
                        {job.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="badge skill-badge">
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 3 && (
                          <span className="badge more-badge">
                            +{job.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                    <button
                      className="apply-btn"
                      onClick={(e) => {
                        e.stopPropagation(); // avoid double navigation
                        handleViewJob(job);
                      }}
                    >
                      Apply Now <span className="btn-icon">→</span>
                    </button>
                    <small className="posted-time">
                      <i className="bi bi-clock-history me-1"></i>
                      {job.posted_at
                        ? dayjs(job.posted_at).fromNow()
                        : "Recently Posted"}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5">
            <span style={{ fontSize: "2rem" }}>🔍</span>
            <h5 className="mt-3">No jobs found</h5>
            <p className="text-muted">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
