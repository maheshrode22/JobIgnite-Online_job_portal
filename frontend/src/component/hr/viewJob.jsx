import React, { useState, useEffect } from "react";
import { getJobsByHR, deleteJob } from "../../Services/HRService";
import { Button, Modal, Badge } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/Hr/viewJob.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


export default function ViewJob() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [show, setShow] = useState(false);

  // Search + Pagination
  const [searchJob, setSearchJob] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // derive hr_id from token
    const token = localStorage.getItem("hr_token");
    let hr_id = null;
    try {
      if (token) {
        const decoded = jwtDecode(token);
        hr_id = decoded?.hr_id || decoded?.id || null;
      }
    } catch (err) {
      console.error("Invalid HR token", err);
    }
    if (!hr_id) {
      setLoading(false);
      return;
    }

    getJobsByHR(hr_id)
      .then((result) => {
        console.log("API response:", result.data); // Debug log
        setJobs(Array.isArray(result.data) ? result.data : (result.data?.jobs || []));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (job) => {
    console.log("=== VIEW JOB MODAL DEBUG ===");
    console.log("Job data in modal:", job);
    console.log("Package value:", job.package);
    console.log("Package type:", typeof job.package);
    console.log("All job keys:", Object.keys(job));
    console.log("=== END VIEW DEBUG ===");
    setSelectedJob(job);
    setShow(true);
  };

  
  const navigate = useNavigate();

const handleUpdate = () => {
  if (!selectedJob) return;
  navigate(`/hr/update-form/${selectedJob.job_id}`, { state: { job: selectedJob } });
  setShow(false); // modal बंद कर
};

  
  

  // Delete job
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const res = await deleteJob(id);

        if (res.data.msg === "delete suceesfull") {
          alert("Job deleted successfully ");
          setShow(false);
          setJobs(jobs.filter((job) => job.job_id !== id));
        } else {
          alert("Failed to delete job : " + res.data.msg);
        }
      } catch (err) {
        console.error("Error deleting job:", err);
        alert("Something went wrong while deleting ");
      }
    }
  };

  // Filter by job title
  const filteredJobs = jobs.filter((job) =>
    (job.title || job.job_title || "").toLowerCase().includes(searchJob.toLowerCase())
  );

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">Loading jobs...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">
              <i className="bi bi-briefcase-fill me-2"></i> My Posted Jobs
            </h2>
            <p className="text-muted">Manage, update or delete your posted jobs</p>
          </div>

          {/* Search and Stats */}
          <div className="row align-items-center mb-4">
            <div className="col-12 col-md-6 mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <span className="badge bg-primary me-2 fs-6">
                  {filteredJobs.length}
                </span>
                <span className="text-muted">Total Jobs Posted</span>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-primary text-white">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Job Title..."
                  value={searchJob}
                  onChange={(e) => setSearchJob(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Jobs Table */}
          {jobs.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-emoji-frown display-4 text-danger d-block mb-3"></i>
              <h5>No jobs found</h5>
              <p className="text-muted">Start by posting your first job</p>
            </div>
          ) : (
            <div className="card shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-primary">
                      <tr>
                        <th className="text-center" style={{width: '80px'}}>#</th>
                        <th>
                          <i className="bi bi-card-text me-2"></i>Title
                        </th>
                        <th className="d-none d-md-table-cell">
                          <i className="bi bi-building me-2"></i>Company
                        </th>
                        <th className="d-none d-lg-table-cell">
                          <i className="bi bi-geo-alt-fill me-2"></i>Location
                        </th>
                        <th>
                          <i className="bi bi-cash-coin me-2"></i>Package
                        </th>
                        <th className="text-center" style={{width: '120px'}}>
                          <i className="bi bi-gear-fill me-2"></i>Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentJobs.map((job, index) => (
                        <tr key={job.job_id}>
                          <td className="text-center fw-bold">
                            {indexOfFirst + index + 1}
                          </td>
                          <td>
                            <div className="fw-bold">{job.title || job.job_title}</div>
                            <small className="text-muted d-md-none">
                              {job.company}
                            </small>
                          </td>
                          <td className="d-none d-md-table-cell">{job.company}</td>
                          <td className="d-none d-lg-table-cell">{job.location}</td>
                          <td>
                            <Badge bg="success" className="fs-6">
                              {job.package ? job.package.replace(/[^0-9.]/g, '') : 'N/A'}
                            </Badge>
                          </td>
                          <td className="text-center">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleShow(job)}
                              className="btn-sm"
                            >
                              <i className="bi bi-eye-fill me-1"></i>
                              <span className="d-none d-sm-inline">View</span>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <nav aria-label="Jobs pagination">
                <ul className="pagination pagination-sm">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <i className="bi bi-chevron-left"></i>
                      <span className="d-none d-sm-inline ms-1">Previous</span>
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <span className="d-none d-sm-inline me-1">Next</span>
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}

          {/* Modal for job details */}
          <Modal show={show} onHide={handleClose} centered size="lg" className="custom-job-modal">
            <Modal.Header closeButton className="bg-gradient text-white">
              <Modal.Title>
                <i className="bi bi-info-circle-fill me-2"></i> Job Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedJob && (
                <div className="job-details-container">
                  <h3 className="fw-bold text-primary mb-4 text-center">
                    <i className="bi bi-briefcase-fill me-2"></i>
                    {selectedJob.title || selectedJob.job_title}
                  </h3>

                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <div className="detail-card">
                        <i className="bi bi-building text-primary me-2"></i>
                        <strong>Company:</strong> {selectedJob.company}
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="detail-card">
                        <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                        <strong>Location:</strong> {selectedJob.location}
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="detail-card">
                        <i className="bi bi-cash-coin text-success me-2"></i>
                        <strong>Package:</strong> {selectedJob.package ? selectedJob.package.replace(/[^0-9.]/g, '') : 'Not specified'} LPA
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="detail-card">
                        <i className="bi bi-people-fill text-info me-2"></i>
                        <strong>Openings:</strong> {selectedJob.opening}
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="detail-card">
                        <i className="bi bi-award-fill text-warning me-2"></i>
                        <strong>Experience:</strong> {selectedJob.experience_required} yrs
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="detail-card">
                        <i className="bi bi-lightbulb-fill text-purple me-2"></i>
                        <strong>Skills:</strong> {selectedJob.skills_required}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="detail-card">
                        <i className="bi bi-file-earmark-text-fill text-secondary me-2"></i>
                        <strong>Description:</strong> {selectedJob.description}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="detail-card deadline">
                        <i className="bi bi-calendar-event-fill text-danger me-2"></i>
                        <strong>Deadline:</strong> {new Date(selectedJob.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between flex-wrap gap-2">
              <Button variant="outline-secondary" onClick={handleClose}>
                <i className="bi bi-x-circle me-1"></i> Close
              </Button>
              {selectedJob && (
                <div className="d-flex gap-2">
                  <Button variant="warning" onClick={() => handleUpdate()}>
                    <i className="bi bi-pencil-square me-1"></i> Update
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(selectedJob.job_id)}>
                    <i className="bi bi-trash-fill me-1"></i> Delete
                  </Button>
                </div>
              )}
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
