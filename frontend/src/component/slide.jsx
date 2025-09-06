import React from "react";
import "../css/slide.css";
import sideImage from "../assets/img/job.jpg"; // Right-side image

function Slide() {
  return (
    <section className="hero-section-white">
      <div className="hero-content-white">
        {/* Left content */}
        <div className="hero-left">
          <h1 className="slide-heading-black">
            Find The Most Exciting Startup Jobs
          </h1>
          <p className="slide-para-black">
            Join the best startups and make an impact on the future.
          </p>
          <a href="/jobSeekerAuth" className="btn-slide-orange">
            Browse Jobs
          </a>
        </div>

        {/* Right Image */}
        <div className="hero-right">
          <img src={sideImage} alt="Hero Side" className="hero-img" />
        </div>
      </div>
    </section>
  );
}

export default Slide;
