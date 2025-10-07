import React from "react";
import "./home.css";
import home from "../images/home.jpg";
import fastImg from "../images/fast.jpg";
import qualityImg from "../images/quality.jpg";
import supportImg from "../images/support.jpg";

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${home})` }}
      >
        <div className="hero-overlay">
          <h1>Welcome to My Store</h1>
          <p>Your one-stop shop for the best products at unbeatable prices!</p>
          <button
            className="shop-now-btn"
            onClick={() => window.location.href = "/login"}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Shop With Us?</h2>
        <div className="features-container">
          <div className="feature-card">
            <img src={fastImg} alt="Fast Delivery" className="feature-image" />
            <h3>Fast Delivery</h3>
            <p>Get your products delivered in record time.</p>
          </div>
          <div className="feature-card">
            <img src={qualityImg} alt="High Quality" className="feature-image" />
            <h3>High Quality</h3>
            <p>We offer only the best quality products.</p>
          </div>
          <div className="feature-card">
            <img src={supportImg} alt="24/7 Support" className="feature-image" />
            <h3>24/7 Support</h3>
            <p>Our team is here to help you anytime, anywhere.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
