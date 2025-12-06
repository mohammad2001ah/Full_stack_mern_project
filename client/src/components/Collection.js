import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import './collection.css';
import collection from '../images/collection.jpg';
import man from '../images/man.jpg';
import women from '../images/women.jpg';
import he from '../images/he.jpg';
import child from '../images/child.jpg';

export default function Collection() {
  const navigate = useNavigate();

  const handleShopNow = (category) => {
    // Navigate to collection page with category filter
    // TODO: Implement category filtering
    navigate(ROUTES.COLLECTION);
  };

  return (
    <div className="collection-page">
      {/* Header Section */}
      <section className="collection-header" role="banner">
        <img src={collection} alt="Our exclusive fashion collections" loading="lazy" />
        <div className="text-overlay">
          <h1>Our Collections</h1>
          <p>Explore our exclusive range of fashion and accessories for every style.</p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="collections" aria-label="Product collections">
        <div className="collections-container">
          <article className="collection-card">
            <img src={man} alt="Men's fashion collection" loading="lazy" />
            <h3>Men's Collection</h3>
            <p>Modern and stylish outfits for every occasion.</p>
            <button onClick={() => handleShopNow('men')} aria-label="Shop men's collection">
              Shop Now
            </button>
          </article>

          <article className="collection-card">
            <img src={he} alt="Accessories collection" loading="lazy" />
            <h3>Accessories</h3>
            <p>Complete your style with our trendy accessories.</p>
            <button onClick={() => handleShopNow('accessories')} aria-label="Shop accessories">
              Shop Now
            </button>
          </article>

          <article className="collection-card">
            <img src={women} alt="Women's fashion collection" loading="lazy" />
            <h3>Women's Collection</h3>
            <p>Elegant and comfortable designs for all seasons.</p>
            <button onClick={() => handleShopNow('women')} aria-label="Shop women's collection">
              Shop Now
            </button>
          </article>

          <article className="collection-card">
            <img src={child} alt="Kids fashion collection" loading="lazy" />
            <h3>Kid's Collection</h3>
            <p>Stylish and comfy outfits for every season.</p>
            <button onClick={() => handleShopNow('kids')} aria-label="Shop kids collection">
              Shop Now
            </button>
          </article>
        </div>
      </section>

      {/* Promo Section */}
      <section className="promo" aria-label="Promotional banner">
        <h2>New Arrivals Every Week!</h2>
        <p>Stay updated with our latest fashion trends and collections.</p>
      </section>
    </div>
  );
}
