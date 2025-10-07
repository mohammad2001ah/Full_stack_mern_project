import { NavLink } from "react-router-dom";
import "../components/about.css";
import mystore from "../images/mystore.png";
export default function About() {
  return (
    <div>
      <div className="about-section py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* الصورة */}
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img
                src={mystore}
                alt="About My STORE"
                className="img-fluid rounded shadow"
              />
            </div>

            {/* النص */}
            <div className="col-lg-6">
              <h2 className="mb-3">About <span className="my">My STORE</span></h2>
              <p className="mb-4">
                Welcome to My STORE! We provide high-quality products that
                combine style and functionality. Our mission is to deliver the
                best shopping experience to our customers with a wide range of
                collections.
              </p>
              <NavLink to="/collection" className="about">
                Shop Our Collection
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
