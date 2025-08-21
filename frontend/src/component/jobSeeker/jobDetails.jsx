// JobDetails.js
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../css/jobSeeker/jobDetails.css";


export default function JobDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  const handleEdit = () => {
    navigate(`/jobSeeker/edit-job/${id}`, { state: { job } });
  };

  const handleDelete = () => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (confirm) {
      console.log("Deleting job with ID:", id);
      navigate("/jobSeeker/browse-jobs");
    }
  };

  if (!job) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow-sm">
          <h3>No Job Data Found (ID: {id})</h3>
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
        <h2 className="card-title mb-3">{job.title}</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Company:</strong> {job.company}
          </li>
          <li className="list-group-item">
            <strong>Location:</strong> {job.location}
          </li>
          <li className="list-group-item">
            <strong>Type:</strong> {job.type}
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
        </ul>

        <div className="mt-4 d-flex justify-content-center gap-3 button-group">
          <button className="backjob" onClick={() => navigate("/jobSeeker/browse-jobs")}>
          Back
          </button>
          <button className="custom-btn btn-info" onClick={handleEdit}>
          Edit
          </button>
          <button className="custom-btn btn-danger" onClick={handleDelete}>
          Delete
          </button>
        </div>

      </div>
    </div>
  );
}
