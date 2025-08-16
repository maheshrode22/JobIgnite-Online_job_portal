import React from "react";
import "../../css/Reviews.css";

export default function Reviews() {
  return (
    <div className="Reviews-section" id="reviews-section">
      <h2>What Job Seekers Say</h2>
      <div className="Reviews-container">
        <div className="review-box">
          <h3>Amit Sharma</h3>
          <h4>Software Developer</h4>
          <p>"I was lost in a sea of generic job listings for months. This platform's targeted opportunities changed everything. I quickly found a role that was a perfect fit and got the job within a few weeks. It truly helped me land my dream role."</p>
        </div>

        <div className="review-box">
          <h3>Neha Patil</h3>
          <h4>Graphic Designer</h4>
          <p>"The job search was overwhelming until I found this site. Its clean design and responsive recruiters made the process so much easier. I've now landed an amazing position and couldn't be happier."</p>
        </div>

        <div className="review-box">
          <h3>Rohit Kumar</h3>
          <h4>Data Analyst</h4>
          <p>I got multiple interview calls within a week. Highly recommended!</p>
        </div>
      </div>
    </div>
  );
}
