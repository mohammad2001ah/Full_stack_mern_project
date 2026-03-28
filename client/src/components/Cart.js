import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../utils/constants';
import './cart.css';

export default function Cart() {
  const { cartItems, cartCount, cartTotal, loading, error, updateQuantity, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const result = await updateQuantity(productId, newQuantity);
    if (!result.success) {
      showAlert(result.message, 'error');
    }
  };

  const handleRemove = async (productId, productName) => {
    const result = await removeFromCart(productId);
    if (result.success) {
      showAlert(`${productName} removed from cart`);
    } else {
      showAlert(result.message, 'error');
    }
  };

  // Not logged in
  if (!isAuthenticated) {
    return (
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>Please log in</h2>
          <p>You need to be logged in to view your cart.</p>
          <Link to={ROUTES.LOGIN} className="shop-link">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        <div className="cart-loading">
          <div className="spinner" style={{ margin: '0 auto' }}></div>
          <p style={{ marginTop: '16px' }}>Loading your cart...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        <div className="cart-error">
          <p>⚠️ {error}</p>
        </div>
      </div>
    );
  }

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop" className="shop-link">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})</h1>

      {/* Alert Toast */}
      {alert && (
        <div className={`cart-alert ${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}

      {/* Cart Items */}
      <div className="cart-items">
        {cartItems.map((item) => {
          const product = item.product;
          if (!product) return null;

          const subtotal = (product.price * item.quantity).toFixed(2);

          return (
            <div className="cart-item" key={product._id}>
              <div className="cart-item-info">
                <p className="cart-item-name">{product.name}</p>
                <p className="cart-item-price">${product.price.toFixed(2)} each</p>
              </div>

              <div className="cart-quantity">
                <button
                  onClick={() => handleUpdateQuantity(product._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span aria-label="Quantity">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(product._id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>

              <div className="cart-item-subtotal">${subtotal}</div>

              <button
                className="cart-remove-btn"
                onClick={() => handleRemove(product._id, product.name)}
                aria-label={`Remove ${product.name} from cart`}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Cart Summary */}
      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>Items ({cartCount})</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="cart-summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="cart-summary-row total">
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <button className="checkout-btn" aria-label="Proceed to checkout">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
