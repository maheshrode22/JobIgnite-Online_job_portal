import React, { useState, useEffect } from "react";
import { getJobsByHR } from "../../services/HRService";
import { Button, Modal } from "react-bootstrap";
import "../../css/Hr/viewJob.css";

export default function ViewJob() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [show, setShow] = useState(false);

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

  //open when click update button
  const handleUpdate = (id) => {
    alert("Update job with ID: " + id);
    
  };
// opwn when click delete button
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      alert("Delete job with ID: " + id);
      
    }
  };

  if (loading) return <p className="p-4 text-center text-muted">Loading jobs...</p>;

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">📋 My Posted Jobs</h2>
        <p className="text-muted">Manage, update or delete your posted jobs</p>
      </div>

      {jobs.length === 0 ? (
        <p className="text-dark text-center">No jobs found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle shadow-sm custom-table">
            <thead className="table-primary">
              <tr>
                <th>Sr No</th>
                <th>Job Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Package</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job.job_id}>
                  <td>{index + 1}</td>
                  <td className="fw-bold">{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
                  <td className="text-success fw-semibold">{job.package}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShow(job)}
                    >
                      View
                    </Button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for job details */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Job Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <div className="job-details">
              <h4 className="fw-bold text-primary">{selectedJob.title}</h4>
              <hr />
              <p className="fw-bold text-dark"><strong>Company:</strong> {selectedJob.company}</p>
              <p className="fw-bold text-dark"><strong>Location:</strong> {selectedJob.location}</p>
              <p className="fw-bold text-dark"><strong>Package:</strong> <span className="text-success">{selectedJob.package}</span></p>
              <p className="fw-bold text-dark"><strong>Openings:</strong> {selectedJob.opening}</p>
              <p className="fw-bold text-dark"><strong>Experience Required:</strong> {selectedJob.experience_required}</p>
              <p className="fw-bold text-dark"><strong>Skills:</strong> {selectedJob.skills_required}</p>
              <p className="fw-bold text-dark"><strong>Description:</strong> {selectedJob.description}</p>
              <p className="fw-bold text-dark"><strong>Deadline:</strong> {selectedJob.deadline}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {selectedJob && (
            <>
              <Button
                variant="warning"
                onClick={() => handleUpdate(selectedJob.job_id)}
              >
                Update
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(selectedJob.job_id)}
              >
                Delete
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
