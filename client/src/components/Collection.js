import React from "react";
import "./collection.css";
import collection from "../images/collection.jpg";
import man from "../images/man.jpg";
import women from "../images/women.jpg";
import he from "../images/he.jpg";
import childe from "../images/child.jpg";


export default function Collection() {
  return (
    <div className="collection-page">
      {/* Header Section */}
      <section className="collection-header">
        <img src={collection} alt="hero collection" />
        <div className="text-overlay">
          <h1>Our Collections</h1>
          <p>Explore our exclusive range of fashion and accessories for every style.</p>
        </div>
      </section>


      {/* Collections Grid */}
      <section className="collections">
        <div className="collections-container">
          <div className="collection-card">
            <img src={man} alt="Men Collection" />
            <h3>Men’s Collection</h3>
            <p>Modern and stylish outfits for every occasion.</p>
            <button>Shop Now</button>
          </div>

          <div className="collection-card">
            <img src={he} alt="Accessories" />
            <h3>Accessories</h3>
            <p>Complete your style with our trendy accessories.</p>
            <button>Shop Now</button>
          </div>

          <div className="collection-card">
            <img src={women} alt="Women Collection" />
            <h3>Women’s Collection</h3>
            <p>Elegant and comfortable designs for all seasons.</p>
            <button>Shop Now</button>
          </div>

          <div className="collection-card">
            <img src={childe} alt="Women Collection" />
            <h3>Kid’s Collection</h3>
            <p>Stylish and comfy outfits for every season.</p>
            <button>Shop Now</button>
          </div>
          
        </div>
      </section>

      {/* Promo Section */}
      <section className="promo">
        <h2>New Arrivals Every Week!</h2>
        <p>Stay updated with our latest fashion trends and collections.</p>
      </section>
    </div>
  );
}
