import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import './home.css';
import home from '../images/home.jpg';
import fastImg from '../images/fast.jpg';
import qualityImg from '../images/quality.jpg';
import supportImg from '../images/support.jpg';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${home})` }}
        role="banner"
      >
        <div className="hero-overlay">
          <h1>Welcome to My Store</h1>
          <p>Your one-stop shop for the best products at unbeatable prices!</p>
          <button
            className="shop-now-btn"
            onClick={() => navigate(ROUTES.COLLECTION)}
            aria-label="Shop now"
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
            <img src={fastImg} alt="Fast delivery service" className="feature-image" loading="lazy" />
            <h3>Fast Delivery</h3>
            <p>Get your products delivered in record time.</p>
          </div>
          <div className="feature-card">
            <img src={qualityImg} alt="High quality products" className="feature-image" loading="lazy" />
            <h3>High Quality</h3>
            <p>We offer only the best quality products.</p>
          </div>
          <div className="feature-card">
            <img src={supportImg} alt="24/7 customer support" className="feature-image" loading="lazy" />
            <h3>24/7 Support</h3>
            <p>Our team is here to help you anytime, anywhere.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
