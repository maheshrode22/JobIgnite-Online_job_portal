import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/jobSeeker/jobDetails.css";

export default function ViewJobDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get job object from navigation state
  const job = location.state?.job;

  if (!job) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow-sm">
          <h3>No Job Data Found</h3>
          <button
            className="btn btn-primary btn-sm mt-3"
            onClick={() => navigate("/jobSeeker/browse-jobs")}
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-sm p-4 bg-white">
        <h2 className="card-title mb-3 text-primary">Job Title: {job.title}</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Company:</strong> {job.company_name || job.company}
          </li>
          <li className="list-group-item">
            <strong>Location:</strong> {job.location}
          </li>
          <li className="list-group-item">
            <strong>Openings:</strong> {job.opening}
          </li>
          <li className="list-group-item">
            <strong>Experience Required:</strong> {job.experience_required}
          </li>
          <li className="list-group-item">
            <strong>Package:</strong> {job.package}
          </li>
          <li className="list-group-item">
            <strong>Skills:</strong> {job.skills_required}
          </li>
          <li className="list-group-item">
            <strong>Description:</strong> {job.description}
          </li>
          <li className="list-group-item">
            <strong>Deadline:</strong> {job.deadline}
          </li>
        </ul>

        <div className="mt-4 text-center">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/jobSeeker/browse-jobs")}
          >
            Back to Jobs
          </button>
        </div>
      </div>
    </div>
  );
}
