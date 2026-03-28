import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faShoppingCart,
  faMinus,
  faPlus,
  faTruck,
  faShieldAlt,
  faUndo,
  faSpinner,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../utils/constants';
import './productDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/products/shop/${id}`);
        setProduct(response.data);
        // Set defaults
        if (response.data.sizes?.length) setSelectedSize(response.data.sizes[0]);
        if (response.data.colors?.length) setSelectedColor(response.data.colors[0]);
      } catch (err) {
        setError(err.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      return;
    }
    setAddingToCart(true);
    const result = await addToCart(product._id, quantity);
    if (result.success) {
      showToast(`${product.name} added to cart! 🛒`, 'success');
    } else {
      showToast(result.message, 'error');
    }
    setAddingToCart(false);
  };

  // Loading
  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="detail-loading">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error || !product) {
    return (
      <div className="product-detail-page">
        <div className="detail-error">
          <h2>Product Not Found</h2>
          <p>{error || 'The product you are looking for does not exist.'}</p>
          <button onClick={() => navigate('/shop')} className="back-to-shop-btn">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      {/* Toast */}
      {toast && (
        <div className={`shop-toast ${toast.type}`} role="alert">
          {toast.message}
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="detail-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <span className="current">{product.category}</span>
        <span>/</span>
        <span className="current">{product.name}</span>
      </nav>

      <div className="detail-content">
        {/* Image Section */}
        <div className="detail-image-section">
          <div className="detail-image-container">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="detail-main-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/600x700/343834/ffffff?text=${encodeURIComponent(product.name)}`;
                }}
              />
            ) : (
              <div className="detail-image-placeholder">
                <span>{product.name.charAt(0)}</span>
              </div>
            )}
            <span className="detail-category-badge">{product.category}</span>
          </div>
        </div>

        {/* Info Section */}
        <div className="detail-info-section">
          <div className="detail-top-info">
            <span className="detail-category-tag">{product.category}</span>
            {product.stock <= 5 && product.stock > 0 && (
              <span className="detail-low-stock">Only {product.stock} left!</span>
            )}
            {product.stock === 0 && (
              <span className="detail-out-of-stock">Out of Stock</span>
            )}
          </div>

          <h1 className="detail-name">{product.name}</h1>

          <div className="detail-price-row">
            <span className="detail-price">${product.price.toFixed(2)}</span>
            {product.seller && (
              <span className="detail-seller">
                by {product.seller.name || 'My Store'}
              </span>
            )}
          </div>

          <p className="detail-description">{product.description}</p>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="detail-option-group">
              <label className="option-label">Size</label>
              <div className="option-buttons">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`option-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="detail-option-group">
              <label className="option-label">Color</label>
              <div className="option-buttons">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`option-btn color-btn ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
                    aria-pressed={selectedColor === color}
                  >
                    {color}
                    {selectedColor === color && (
                      <FontAwesomeIcon icon={faCheck} className="check-icon" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="detail-option-group">
            <label className="option-label">Quantity</label>
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
                aria-label="Increase quantity"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            className="detail-add-to-cart"
            onClick={handleAddToCart}
            disabled={product.stock === 0 || addingToCart}
          >
            {addingToCart ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin /> Adding...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faShoppingCart} />
                {product.stock === 0 ? 'Out of Stock' : `Add to Cart — $${(product.price * quantity).toFixed(2)}`}
              </>
            )}
          </button>

          {/* Trust Badges */}
          <div className="detail-trust-badges">
            <div className="trust-badge">
              <FontAwesomeIcon icon={faTruck} />
              <span>Free Shipping</span>
            </div>
            <div className="trust-badge">
              <FontAwesomeIcon icon={faShieldAlt} />
              <span>Secure Payment</span>
            </div>
            <div className="trust-badge">
              <FontAwesomeIcon icon={faUndo} />
              <span>30-Day Returns</span>
            </div>
          </div>

          {/* Product Details */}
          <div className="detail-extra-info">
            <h3>Product Details</h3>
            <ul>
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Available Sizes:</strong> {product.sizes?.join(', ')}</li>
              <li><strong>Available Colors:</strong> {product.colors?.join(', ')}</li>
              <li><strong>In Stock:</strong> {product.stock} units</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back to Shop */}
      <div className="detail-back-section">
        <button onClick={() => navigate('/shop')} className="back-to-shop-btn">
          <FontAwesomeIcon icon={faArrowLeft} /> Continue Shopping
        </button>
      </div>
    </div>
  );
}
