import React from "react";
import "../../css/jobSeeker/browseJobs.css";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions",
    location: "Pune, India",
    type: "Full-time",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "CodeCraft",
    location: "Mumbai, India",
    type: "Part-time",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignPro",
    location: "Bangalore, India",
    type: "Internship",
  },
];

export default function BrowseJobs() {
  return (
    <div className="browsejobs-container">
      <h2>Browse Jobs</h2>
      <div className="jobcards-container">
        {jobs.map((job) => (
          <div key={job.id} className="jobcard">
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Type:</strong> {job.type}</p>
            <div className="job-actions">
              <button className="apply-btn">Apply Job</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
