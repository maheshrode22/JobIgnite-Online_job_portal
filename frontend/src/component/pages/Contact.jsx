import React, { useState } from "react";
import "../../css/contact.css";
import contactIllustration from "../../assets/img/homeHero.jpg"; // add your image

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-container">
      <h2 className="contact-heading">Contact Us</h2>

      <div className="contact-wrapper">
        {/* Left Side */}
        <div className="contact-left">
          <img
            src={contactIllustration}
            alt="Contact Illustration"
            className="contact-img"
          />
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>
              Have a question or want to collaborate? Fill out the form and
              our team will reach out to you shortly. We love connecting with
              talented job seekers and innovative companies!
            </p>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="contact-card">
          {submitted && (
            <p className="success-message">✅ Thanks for contacting us!</p>
          )}
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
