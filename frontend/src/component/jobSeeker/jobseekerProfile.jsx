import React, { useState } from "react";
import { PencilSquare } from "react-bootstrap-icons"; // bootstrap icons

export default function SeekerProfile() {
  const [profile] = useState({
    name: "Mahesh Sugreev Rode",
    email: "maheshrode22@gmail.com",
    phone: "+91 8459525501",
    degree: "Bachelor Of Technology (B.Tech/B.E)",
    specialization: "Computers",
    graduationYear: "2025",
    location: "Pune",
    resume: "Mahesh_Rode_Resume.docx",
    profileSummary:
      "Software Engineer with a B.Tech in Computers, skilled in Java, React Js, and Node Js. Proficient in Frontend Development and Web Technologies. Seeking to leverage expertise in a dynamic tech environment for impactful contributions.",
    skills: ["Java", "CSS", "TailwindCSS", "MySQL", "JavaScript", "Node Js", "HTML", "NoSQL", "React Js"],
    education: [
      {
        degree: "Bachelor Of Technology (B.Tech/B.E)",
        field: "Computers",
        college: "MIT College of Railway Engineering & Research, MAEER",
        year: "2025",
      },
      {
        degree: "Diploma",
        field: "Computer Science",
        college: "Padmashri Dr Vithalrao Vikhe Patil College of Engineering, Ahmednagar",
        year: "2022",
      },
    ],
    jobPreferences: {
      role: "Software Engineer, React Js Developer",
      location: "Mumbai, Pune, Other India, Bengaluru",
    },
  });

  return (
    <div className="container my-4 seeker-profile">
      {/* Header */}
      <div className="card p-3 mb-3 d-flex flex-md-row align-items-center justify-content-between">
        <div>
          <h4 className="fw-bold mb-1">{profile.name}</h4>
          <p className="mb-0 small">
            {profile.degree} • {profile.specialization} • {profile.graduationYear}
          </p>
          <p className="text-muted small mb-0">{profile.location}</p>
        </div>
        <button className="btn btn-outline-primary btn-sm mt-3 mt-md-0">
          Recruiter’s View
        </button>
      </div>

      {/* Profile Summary */}
      <div className="card p-3 mb-3">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="fw-semibold">Profile Summary</h5>
            <p className="mb-0">{profile.profileSummary}</p>
          </div>
          <button className="btn btn-light btn-sm">
            <PencilSquare />
          </button>
        </div>
      </div>

      {/* Resume */}
      <div className="card p-3 mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="fw-semibold">Resume</h5>
            <a href="/" className="text-decoration-none text-primary">
              {profile.resume}
            </a>
          </div>
          <button className="btn btn-light btn-sm">
            <PencilSquare />
          </button>
        </div>
      </div>

      {/* Skills */}
      <div className="card p-3 mb-3">
        <h5 className="fw-semibold">Skills</h5>
        <div className="d-flex flex-wrap gap-2">
          {profile.skills.map((skill, i) => (
            <span key={i} className="badge bg-light text-dark border">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="card p-3 mb-3">
        <h5 className="fw-semibold">Education</h5>
        {profile.education.map((edu, i) => (
          <div key={i} className="mb-2">
            <p className="fw-medium mb-0">{edu.degree} • {edu.field}</p>
            <small className="text-muted">{edu.college} • {edu.year}</small>
          </div>
        ))}
      </div>

      {/* Job Preferences */}
      <div className="card p-3 mb-3">
        <h5 className="fw-semibold">Job Preferences</h5>
        <p className="mb-1">Preferred Role: {profile.jobPreferences.role}</p>
        <p className="mb-0">Preferred Location: {profile.jobPreferences.location}</p>
      </div>
    </div>
  );
}
