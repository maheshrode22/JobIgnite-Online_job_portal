import React from "react";
import "../../css/services.css";

export default function Services() {
  const services = [
    {
      title: "Job Search",
      description: "Browse and apply for jobs easily."
    },
    {
      title: "Recruitment Services",
      description: "Employers can post jobs and hire."
    },
    {
      title: "Interview Scheduler",
      description: "Schedule interviews with companies."
    },
    {
      title: "Career Guidance",
      description: "Tips and counseling for career growth."
    },
    {
      title: "Job Alerts",
      description: "Get notified about new job opportunities."
    },
    {
      title: "Skill Assessment",
      description: "Test your skills and improve them."
    },
    {
      title: "Career Blog",
      description: "Read tips and guidance from experts."
    },
    {
      title: "Skill Development",
      description: "Online courses to improve employability."
    },
  ];

  return (
    <div className="Services-section" id="services-section">
      <h2>Our Services</h2>
      <div className="Services-container">
        {services.map((service, i) => (
          <div className="service-box" key={i}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
