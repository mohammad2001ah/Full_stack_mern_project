import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Calculate derived values
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => {
    const price = item.product?.price || 0;
    return total + price * item.quantity;
  }, 0);

  // Fetch cart from server
  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);
    try {
      const response = await api.get(API_ENDPOINTS.CART.GET);
      setCartItems(response.data.items || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch cart');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch cart when user authenticates
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated, fetchCart]);

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      return { success: false, message: 'Please log in to add items to cart' };
    }

    try {
      const response = await api.post(API_ENDPOINTS.CART.ADD, {
        productId,
        quantity,
      });
      setCartItems(response.data.cart.items || []);
      return { success: true, message: response.data.message };
    } catch (err) {
      return { success: false, message: err.message || 'Failed to add item' };
    }
  };

  // Update item quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await api.put(API_ENDPOINTS.CART.UPDATE, {
        productId,
        quantity,
      });
      setCartItems(response.data.cart.items || []);
      return { success: true, message: response.data.message };
    } catch (err) {
      return {
        success: false,
        message: err.message || 'Failed to update quantity',
      };
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const response = await api.delete(API_ENDPOINTS.CART.REMOVE(productId));
      setCartItems(response.data.cart.items || []);
      return { success: true, message: response.data.message };
    } catch (err) {
      return {
        success: false,
        message: err.message || 'Failed to remove item',
      };
    }
  };

  // Clear cart locally (e.g. on logout)
  const clearLocalCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    loading,
    error,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearLocalCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
