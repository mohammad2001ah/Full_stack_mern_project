import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from './common/Button';
import Input from './common/Input';
import './home.css';
import './collection.css';
import './about.css';
import './contact.css';
import home from '../images/home.jpg';
import fastImg from '../images/fast.jpg';
import qualityImg from '../images/quality.jpg';
import supportImg from '../images/support.jpg';
import collection from '../images/collection.jpg';
import man from '../images/man.jpg';
import women from '../images/women.jpg';
import he from '../images/he.jpg';
import child from '../images/child.jpg';
import mystore from '../images/mystore.png';

export default function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleShopNow = (category) => {
    navigate(ROUTES.COLLECTION);
  };

  const [cartAlert, setCartAlert] = React.useState(null);

  const handleAddToCart = async (productId, productName) => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      return;
    }
    if (!productId) {
      setCartAlert({ message: 'This is a demo item — add real products from the admin panel!', type: 'info' });
      setTimeout(() => setCartAlert(null), 3000);
      return;
    }
    const result = await addToCart(productId, 1);
    if (result.success) {
      setCartAlert({ message: `${productName} added to cart!`, type: 'success' });
    } else {
      setCartAlert({ message: result.message, type: 'error' });
    }
    setTimeout(() => setCartAlert(null), 3000);
  };

  const [contactForm, setContactForm] = React.useState({
    name: '',
    email: '',
    message: '',
  });
  const [contactStatus, setContactStatus] = React.useState({ type: '', message: '' });
  const [contactLoading, setContactLoading] = React.useState(false);

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    setContactStatus({ type: '', message: '' });

    setTimeout(() => {
      setContactLoading(false);
      setContactStatus({
        type: 'success',
        message: 'Thank you for contacting us! We will get back to you soon.',
      });
      setContactForm({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="home-page">
      {/* Cart Alert Toast */}
      {cartAlert && (
        <div className={`cart-alert ${cartAlert.type}`} role="alert" style={{
          position: 'fixed', top: '80px', right: '20px', padding: '12px 24px',
          borderRadius: '6px', color: '#fff', fontWeight: 500, zIndex: 1070,
          boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
          backgroundColor: cartAlert.type === 'success' ? '#28a745' : cartAlert.type === 'error' ? '#dc3545' : '#17a2b8',
          animation: 'cartAlertSlide 0.3s ease-out',
        }}>
          {cartAlert.message}
        </div>
      )}

      {/* ===== Hero Section ===== */}
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
            onClick={() => {
              document.getElementById('collections-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Shop now"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* ===== Features Section ===== */}
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

      {/* ===== Collections Section ===== */}
      <section id="collections-section" className="home-collections-section">
        <div className="collection-header" role="banner">
          <img src={collection} alt="Our exclusive fashion collections" loading="lazy" />
          <div className="text-overlay">
            <h2>Our Collections</h2>
            <p>Explore our exclusive range of fashion and accessories for every style.</p>
          </div>
        </div>

        <div className="collections" aria-label="Product collections">
          <div className="collections-container">
            <article className="collection-card">
              <img src={man} alt="Men's fashion collection" loading="lazy" />
              <h3>Men's Collection</h3>
              <p>Modern and stylish outfits for every occasion.</p>
              <div className="collection-card-actions">
                <button onClick={() => handleShopNow('men')} aria-label="Shop men's collection">
                  Shop Now
                </button>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(null, "Men's Collection")} aria-label="Add men's collection to cart">
                  🛒 Add to Cart
                </button>
              </div>
            </article>

            <article className="collection-card">
              <img src={he} alt="Accessories collection" loading="lazy" />
              <h3>Accessories</h3>
              <p>Complete your style with our trendy accessories.</p>
              <div className="collection-card-actions">
                <button onClick={() => handleShopNow('accessories')} aria-label="Shop accessories">
                  Shop Now
                </button>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(null, 'Accessories')} aria-label="Add accessories to cart">
                  🛒 Add to Cart
                </button>
              </div>
            </article>

            <article className="collection-card">
              <img src={women} alt="Women's fashion collection" loading="lazy" />
              <h3>Women's Collection</h3>
              <p>Elegant and comfortable designs for all seasons.</p>
              <div className="collection-card-actions">
                <button onClick={() => handleShopNow('women')} aria-label="Shop women's collection">
                  Shop Now
                </button>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(null, "Women's Collection")} aria-label="Add women's collection to cart">
                  🛒 Add to Cart
                </button>
              </div>
            </article>

            <article className="collection-card">
              <img src={child} alt="Kids fashion collection" loading="lazy" />
              <h3>Kid's Collection</h3>
              <p>Stylish and comfy outfits for every season.</p>
              <div className="collection-card-actions">
                <button onClick={() => handleShopNow('kids')} aria-label="Shop kids collection">
                  Shop Now
                </button>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(null, "Kid's Collection")} aria-label="Add kids collection to cart">
                  🛒 Add to Cart
                </button>
              </div>
            </article>
          </div>
        </div>

        <div className="promo" aria-label="Promotional banner">
          <h2>New Arrivals Every Week!</h2>
          <p>Stay updated with our latest fashion trends and collections.</p>
        </div>
      </section>

      {/* ===== About Section ===== */}
      <section id="about-section" className="about-section py-5" aria-labelledby="about-heading">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img
                src={mystore}
                alt="About My STORE - Our company overview"
                className="img-fluid rounded shadow"
                loading="lazy"
              />
            </div>
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

      {/* ===== Contact Section ===== */}
      <section id="contact-section" className="contact-page">
        <h2>Contact Us</h2>
        <p>Feel free to reach out for any questions or support.</p>

        {contactStatus.message && (
          <div className={`alert alert-${contactStatus.type === 'success' ? 'success' : 'danger'}`} role="alert">
            {contactStatus.message}
          </div>
        )}

        <form className="contact-form" onSubmit={handleContactSubmit}>
          <Input
            label="Your Name"
            type="text"
            name="name"
            value={contactForm.name}
            onChange={handleContactChange}
            placeholder="Enter your name"
            required
            autoComplete="name"
          />

          <Input
            label="Your Email"
            type="email"
            name="email"
            value={contactForm.email}
            onChange={handleContactChange}
            placeholder="Enter your email"
            required
            autoComplete="email"
          />

          <div className="input-wrapper">
            <label htmlFor="home-message" className="input-label">
              Your Message<span className="input-required" aria-label="required">*</span>
            </label>
            <textarea
              id="home-message"
              name="message"
              value={contactForm.message}
              onChange={handleContactChange}
              placeholder="Enter your message"
              rows="5"
              required
              className="input-field"
              aria-label="Your message"
            />
          </div>

          <Button type="submit" variant="primary" fullWidth loading={contactLoading}>
            {contactLoading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </section>
    </div>
  );
}
