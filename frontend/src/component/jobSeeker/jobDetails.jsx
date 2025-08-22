import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../css/jobSeeker/jobDetails.css";

export default function JobDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  const [applied, setApplied] = useState(false); // track apply success

  const handleApply = () => {
    setApplied(true);
    // You can add API call here to submit application
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
          <li className="list-group-item"><strong>Company:</strong> {job.company}</li>
          <li className="list-group-item"><strong>Location:</strong> {job.location}</li>
          <li className="list-group-item"><strong>Type:</strong> {job.type}</li>
          <li className="list-group-item"><strong>Openings:</strong> {job.opening}</li>
          <li className="list-group-item"><strong>Experience Required:</strong> {job.experience_required}</li>
          <li className="list-group-item"><strong>Package:</strong> {job.package}</li>
          <li className="list-group-item"><strong>Skills:</strong> {job.skills_required}</li>
          <li className="list-group-item"><strong>Description:</strong> {job.description}</li>
        </ul>

        {/* Buttons */}
        <div className="mt-4 d-flex justify-content-center gap-3 button-group">
          <button
            className="backjob"
            onClick={() => navigate("/jobSeeker/browse-jobs")}
          >
            Back Job
          </button>

          <button
            className="applyjob"
            onClick={handleApply}
            disabled={applied} // disable after applying
          >
            {applied ? "Applied" : "Apply"}
          </button>
        </div>

        {/* Success Message */}
        {applied && (
          <div className="text-center mt-3">
            <div className="alert alert-success" role="alert">
              Job Applied Successfully!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
