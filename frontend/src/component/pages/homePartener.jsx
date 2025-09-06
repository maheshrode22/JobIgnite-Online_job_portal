import React from "react";
import "../../css/homePartener.css";

// Import partner logos
import partner1 from "../../assets/img/comp1.jpg";
import partner2 from "../../assets/img/comp2.jpg";
import partner3 from "../../assets/img/comp3.jpg";
import partner4 from "../../assets/img/comp4.jpg";
import partner5 from "../../assets/img/comp5.jpg";

export default function HomePartners() {
  const partners = [partner1, partner2, partner3, partner4, partner5];

  return (
    <div className="partners-section">
      <h2>Our Partners</h2>
      <div className="partners-slider-wrapper">
        <div className="partners-slider">
          {partners.map((logo, index) => (
            <div className="partner-box" key={index}>
              <img src={logo} alt={`Partner ${index + 1}`} />
            </div>
          ))}
          {partners.map((logo, index) => (
            <div className="partner-box" key={index + partners.length}>
              <img src={logo} alt={`Partner ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
