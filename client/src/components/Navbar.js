import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../utils/constants';
import './navbar.css';

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" role="navigation" aria-label="Main navigation">
      <div className="container-fluid">
        {/* Logo */}
        <NavLink className="navbar-brand" to={ROUTES.HOME} aria-label="My Store Home">
          My STORE
        </NavLink>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links + Icons */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          {/* Links */}
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to={ROUTES.HOME}>
                HOME
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={ROUTES.COLLECTION}>
                COLLECTION
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={ROUTES.ABOUT}>
                ABOUT
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={ROUTES.CONTACT}>
                CONTACT
              </NavLink>
            </li>
          </ul>

          {/* Search Icon */}
          <div className="d-flex search mx-2" style={{ cursor: 'pointer' }} role="button" aria-label="Search" tabIndex={0}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>

          {/* Cart Icon */}
          <NavLink to={ROUTES.CART} className="d-flex cart mx-2" aria-label="Shopping cart">
            <FontAwesomeIcon icon={faShoppingCart} />
          </NavLink>

          {/* User Dropdown */}
          <div className="dropdown">
            <div
              className="d-flex user mx-2 my-2"
              style={{ cursor: 'pointer' }}
              data-bs-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              aria-label="User menu"
              tabIndex={0}
            >
              <FontAwesomeIcon icon={faUser} />
            </div>
            <ul className="dropdown-menu dropdown-menu-end" style={{ cursor: 'pointer', marginTop: '10px' }}>
              {isAuthenticated ? (
                <>
                  <li>
                    <span className="dropdown-item-text">
                      <small>Hello, {user?.name || 'User'}</small>
                    </span>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={() => navigate(ROUTES.PROFILE)}>
                      My Profile
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => navigate(ROUTES.ORDERS)}>
                      Orders
                    </button>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button className="dropdown-item" onClick={() => navigate(ROUTES.LOGIN)}>
                      Login
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => navigate(ROUTES.SIGNUP)}>
                      Sign Up
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
