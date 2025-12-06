import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import './about.css';
import mystore from '../images/mystore.png';

export default function About() {
  return (
    <section className="about-section py-5" aria-labelledby="about-heading">
      <div className="container">
        <div className="row align-items-center">
          {/* Image */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <img
              src={mystore}
              alt="About My STORE - Our company overview"
              className="img-fluid rounded shadow"
              loading="lazy"
            />
          </div>

          {/* Text */}
          <div className="col-lg-6">
            <h2 id="about-heading" className="mb-3">
              About <span className="my">My STORE</span>
            </h2>
            <p className="mb-4">
              Welcome to My STORE! We provide high-quality products that
              combine style and functionality. Our mission is to deliver the
              best shopping experience to our customers with a wide range of
              collections.
            </p>
            <NavLink to={ROUTES.COLLECTION} className="about">
              Shop Our Collection
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
