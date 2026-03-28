import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import { API_ENDPOINTS, STORAGE_KEYS, USER_ROLES } from '../utils/constants';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
        const storedRole = localStorage.getItem(STORAGE_KEYS.ROLE);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setRole(storedRole);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await api.post(API_ENDPOINTS.USERS.LOGIN, {
        email,
        password,
      });

      const { token: newToken, user: newUser, role: newRole } = response.data;

      // Store in localStorage
      localStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      localStorage.setItem(STORAGE_KEYS.ROLE, newRole);

      // Update state
      setToken(newToken);
      setUser(newUser);
      setRole(newRole);
      setIsAuthenticated(true);

      return { success: true, role: newRole, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Login failed. Please try again.',
      };
    }
  };

  // Register function
  const register = async (name, email, password, role = 'customer') => {
    try {
      const response = await api.post(API_ENDPOINTS.USERS.CREATE, {
        name,
        email,
        password,
        role,
      });

      return {
        success: true,
        message: response.data.message || 'Registration successful!',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Registration failed. Please try again.',
      };
    }
  };

  // Logout function
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ROLE);

    // Clear state
    setToken(null);
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  // Check if user is admin
  const isAdmin = () => {
    return role === USER_ROLES.ADMIN;
  };

  // Check if user is seller
  const isSeller = () => {
    return role === USER_ROLES.SELLER;
  };

  // Update user profile
  const updateProfile = async (userId, updates) => {
    try {
      const response = await api.put(
        API_ENDPOINTS.USERS.UPDATE(userId),
        updates
      );

      // Update stored user data
      const updatedUser = { ...user, ...updates };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      setUser(updatedUser);

      return {
        success: true,
        message: response.data.message || 'Profile updated successfully!',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to update profile.',
      };
    }
  };

  const value = {
    user,
    token,
    role,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    isAdmin,
    isSeller,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
