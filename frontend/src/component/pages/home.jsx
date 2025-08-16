import React from "react";
import Slide from "../slide";
import Reviews from "./Reviews";
import Contact from "./Contact";
import Services from "./Service";

function Home() {
  return (
    <div>
      <Slide/>
      <div id="Reviews-section">
            <Reviews />
      </div>

      <div id="services-section">
            <Services />
      </div>

      <div id="contact-section">
          <Contact />
      </div>

    </div>
  );
}

export default Home;