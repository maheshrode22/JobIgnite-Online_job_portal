import React from "react";
import "../../css/Reviews.css";
import person1 from "../../assets/img/boy1.jpg";
import person2 from "../../assets/img/girl.jpg";
import person3 from "../../assets/img/boy4.jpg";

export default function Reviews() {
  const reviews = [
    {
      img: person1,
      name: "Amit Sharma",
      role: "Software Developer",
      text: "I quickly found a role that was a perfect fit and got the job within a few weeks. It truly helped me land my dream role.",
    },
    {
      img: person2,
      name: "Neha Patil",
      role: "Graphic Designer",
      text: "Its clean design and responsive recruiters made the process so much easier. I've now landed an amazing position and couldn't be happier.",
    },
    {
      img: person3,
      name: "Rohit Kumar",
      role: "Data Analyst",
      text: "I got multiple interview calls within a week. Highly recommended!",
    },
  ];

  // Duplicate reviews to make seamless loop
  const allReviews = [...reviews, ...reviews];

  return (
    <div className="Reviews-section" id="Reviews-section">
      <h2>What Job Seekers Say</h2>
      <div className="Reviews-slider">
        {allReviews.map((review, i) => (
          <div className="review-box" key={i}>
            <div className="review-left">
              <img src={review.img} alt={review.name} />
              <h3>{review.name}</h3>
              <h4>{review.role}</h4>
            </div>
            <div className="review-right">{review.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
