import React from "react";
import "./contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>Feel free to reach out for any questions or support.</p>

      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows="5" required></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
