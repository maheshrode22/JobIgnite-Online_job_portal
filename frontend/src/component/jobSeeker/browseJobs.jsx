import React from "react";
import { useNavigate } from "react-router-dom"; // import navigate
import "../../css/jobSeeker/browseJobs.css";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions",
    location: "Pune, India",
    type: "Full-time",
    opening: "2",
    experience_required: "1-3 years",
    package: "5-7 LPA",
    skills_required: "React, JS, HTML, CSS",
    description: "Develop and maintain web applications using React...",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "CodeCraft",
    location: "Mumbai, India",
    type: "Part-time",
    opening: "1",
    experience_required: "2-4 years",
    package: "6-8 LPA",
    skills_required: "Node.js, Express, SQL",
    description: "Build and maintain backend APIs and services...",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignPro",
    location: "Bangalore, India",
    type: "Internship",
    opening: "1",
    experience_required: "Fresher",
    package: "10k/month",
    skills_required: "Figma, Adobe XD, Photoshop",
    description: "Design and improve user interfaces and experiences...",
  },
   
];

export default function BrowseJobs() {
  const navigate = useNavigate();

  const handleViewJob = (job) => {
          navigate(`/jobSeeker/jobDetail/${job.id}`, { state: { job } });
  };

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
              <button
                className="viewjob-btn"
                onClick={() => handleViewJob(job)} // navigate with job data
              >
                View Job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
