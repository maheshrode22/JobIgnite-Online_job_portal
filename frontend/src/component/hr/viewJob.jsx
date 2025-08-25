import React, { useState, useEffect } from "react";
import { getJobsByHR, deleteJob } from "../../services/HRService";
import { Button, Modal, Badge } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/Hr/viewJob.css";

export default function ViewJob() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [show, setShow] = useState(false);

  // 🔹 Search + Pagination
  const [searchJob, setSearchJob] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const hr_id = localStorage.getItem("hr_id");
    if (!hr_id) return;

    getJobsByHR(hr_id)
      .then((result) => {
        setJobs(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (job) => {
    setSelectedJob(job);
    setShow(true);
  };

  const handleUpdate = (id) => {
    alert("Update job with ID: " + id);
  };

  // 🔹 Delete job
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

  // 🔹 Filter by job title
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchJob.toLowerCase())
  );

  // 🔹 Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  if (loading)
    return <p className="p-4 text-center text-muted">Loading jobs...</p>;

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">
          <i className="bi bi-briefcase-fill me-2"></i> My Posted Jobs
        </h2>
        <p className="text-muted">Manage, update or delete your posted jobs</p>
      </div>

      {/* 🔹 Search Box */}
      <div className="row justify-content-end mb-3">
        <div className="col-12 col-md-6 col-lg-4">
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

      {/* Jobs Table / Card View */}
      {jobs.length === 0 ? (
        <p className="text-dark text-center">
          <i className="bi bi-emoji-frown text-danger fs-4"></i> No jobs found.
        </p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle shadow-sm custom-table">
            <thead className="table-primary">
              <tr>
                <th>Sr No</th>
                <th><i className="bi bi-card-text me-1"></i> Title</th>
                <th><i className="bi bi-building me-1"></i> Company</th>
                <th><i className="bi bi-geo-alt-fill me-1"></i> Location</th>
                <th><i className="bi bi-cash-coin me-1"></i> Package</th>
                <th><i className="bi bi-gear-fill me-1"></i> Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentJobs.map((job, index) => (
                <tr key={job.job_id}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td className="fw-bold">{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
                  <td>
                    <Badge bg="success">{job.package}</Badge>
                  </td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShow(job)}
                    >
                      <i className="bi bi-eye-fill"></i> View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔹 Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <nav>
            <ul className="pagination flex-wrap">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <i className="bi bi-arrow-left-circle"></i> Prev
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
                >
                  Next <i className="bi bi-arrow-right-circle"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* 🔹 Modal for job details */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <i className="bi bi-info-circle-fill me-2"></i> Job Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <div className="job-details">
              <h4 className="fw-bold text-primary mb-3">
                <i className="bi bi-briefcase-fill me-2"></i>
                {selectedJob.title}
              </h4>
              <p>
                <i className="bi bi-building text-primary me-2"></i>
                <strong>Company:</strong> {selectedJob.company}
              </p>
              <p>
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                <strong>Location:</strong> {selectedJob.location}
              </p>
              <p>
                <i className="bi bi-cash-coin text-success me-2"></i>
                <strong>Package:</strong> {selectedJob.package}
              </p>
              <p>
                <i className="bi bi-people-fill text-info me-2"></i>
                <strong>Openings:</strong> {selectedJob.opening}
              </p>
              <p>
                <i className="bi bi-award-fill text-warning me-2"></i>
                <strong>Experience:</strong> {selectedJob.experience_required}
              </p>
              <p>
                <i className="bi bi-lightbulb-fill text-primary me-2"></i>
                <strong>Skills:</strong> {selectedJob.skills_required}
              </p>
              <p>
                <i className="bi bi-file-earmark-text-fill text-secondary me-2"></i>
                <strong>Description:</strong> {selectedJob.description}
              </p>
              <p>
                <i className="bi bi-calendar-event-fill text-danger me-2"></i>
                <strong>Deadline:</strong> {selectedJob.deadline}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="flex-wrap">
          <Button variant="secondary" onClick={handleClose}>
            <i className="bi bi-x-circle"></i> Close
          </Button>
          {selectedJob && (
            <>
              <Button
                variant="warning"
                onClick={() => handleUpdate(selectedJob.job_id)}
              >
                <i className="bi bi-pencil-square"></i> Update
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(selectedJob.job_id)}
              >
                <i className="bi bi-trash-fill"></i> Delete
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
