import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container-fluid py-5">
        <div className="row text-center text-md-start align-items-start">

          {/* About */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">My STORE</h5>
            <p>
              High-quality products with style and functionality. 
              Our mission is to deliver the best shopping experience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links list-unstyled">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/collection">Collection</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">Follow Us</h5>
            <div className="social-icons d-flex justify-content-center justify-content-md-start">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </div>

        </div>

        <hr className="my-4" />
        <p className="text-center mb-0">&copy; 2025 My STORE. All rights reserved.</p>
      </div>
    </footer>
  );
}
