import React from "react";
import "../../css/services.css";

export default function Services() {
  return (
    <>
        <div className="Services-section">
          <h2>Our Services</h2>
          <div className="Services-container">
            <div className="service-box">
                <h3>Job Search</h3>
                <p>Browse and apply for jobs easily.</p>
            </div>

             <div className="service-box">
                <h3>Recruitment Services</h3>
                <p>Employers can post jobs and hire.</p>
            </div>

             <div className="service-box">
                <h3>Interview Scheduler</h3>
                <p>Schedule interviews with companies.</p>
            </div>

             <div className="service-box">
                <h3>Career Guidance</h3>
                <p>Tips and counseling for career growth.</p>
              </div>

              <div className="service-box">
                  <h3>Job Alerts</h3>
                  <p>Get notified about new job opportunities.</p>
              </div>

               <div className="service-box">
                  <h3>Skill Assessment</h3>
                  <p>Test your skills and improve them.</p>
              </div>

              <div className="service-box">
                <h3>Career Blog</h3>
                <p>Read tips and guidance from experts.</p>
              </div>

              <div className="service-box">
                <h3>Skill Development</h3>
                <p>Online courses to improve employability.</p>
              </div>
          </div>
        </div>
    </>
  );
}
