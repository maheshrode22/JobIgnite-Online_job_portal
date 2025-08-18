import React from "react";
import "../../css/Reviews.css";

export default function Reviews() {
  const reviews = [
    {
      name: "Amit Sharma",
      role: "Software Developer",
      text: `"I was lost in a sea of generic job listings for months. This platform's targeted opportunities changed everything. I quickly found a role that was a perfect fit and got the job within a few weeks. It truly helped me land my dream role."`,
    },
    {
      name: "Neha Patil",
      role: "Graphic Designer",
      text: `"The job search was overwhelming until I found this site. Its clean design and responsive recruiters made the process so much easier. I've now landed an amazing position and couldn't be happier."`,
    },
    {
      name: "Rohit Kumar",
      role: "Data Analyst",
      text: `"I got multiple interview calls within a week. Highly recommended!"`,
    },
  ];

  return (
    <div className="Reviews-section" id="reviews-section">
      <h2>What Job Seekers Say</h2>
      <div className="Reviews-container">
        {reviews.map((review, i) => (
          <div className="review-box" key={i}>
            <h3>{review.name}</h3>
            <h4>{review.role}</h4>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
