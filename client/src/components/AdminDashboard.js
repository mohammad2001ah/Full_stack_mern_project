import React, { useState, useEffect } from "react";
import "./adminDashboard.css";
import { FaUser, FaBox, FaShoppingCart, FaCog, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../utils/constants";
import UsersManagement from "./UsersManagement";
import ProductsManagement from "./ProductsManagement";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, isAdmin, loading, isAuthenticated } = useAuth();

  // Redirect non-admin users
  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin())) {
      navigate(ROUTES.LOGIN);
    }
  }, [loading, isAuthenticated, isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  // Show nothing while checking auth
  if (loading) {
    return <div className="dashboard-container"><p>Loading...</p></div>;
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`} id="admin-sidebar" data-testid="testid-admin-sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-menu">
          <li id="admin-nav-dash" onClick={() => setActivePage("dashboard")}>
            <FaBox /> Dashboard
          </li>
          <li id="admin-nav-users" onClick={() => setActivePage("users")}>
            <FaUser /> Users
          </li>
          <li id="admin-nav-products" onClick={() => setActivePage("products")}>
            <FaBox /> Products
          </li>
          <li id="admin-nav-orders" onClick={() => setActivePage("orders")}>
            <FaShoppingCart /> Orders
          </li>
          <li id="admin-nav-settings" onClick={() => setActivePage("settings")}>
            <FaCog /> Settings
          </li>
        </ul>
      </aside>

      {/* Overlay (mobile) */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}

      {/* Main Content */}
      <main className="main-content">
        {/* Navbar */}
        <nav className="dashboard-navbar" id="admin-nav">
          <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)} id="admin-sidebar-toggle">
            <FaBars />
          </div>
          <h3 id="admin-welcome">Welcome, Admin</h3>
          <button className="logout-btn" onClick={handleLogout} id="admin-logout-btn" data-testid="testid-admin-logout">
            <FaSignOutAlt style={{ marginRight: "8px" }} />
            Logout
          </button>
        </nav>

        {activePage === "dashboard" && (
          <div className="stats-grid">
            <div className="card test-admin-stat" id="admin-stat-users">
              <h4>Total Users</h4>
              <p id="admin-users-count">124</p>
            </div>
            <div className="card test-admin-stat" id="admin-stat-products">
              <h4>Total Products</h4>
              <p id="admin-products-count">58</p>
            </div>
            <div className="card test-admin-stat" id="admin-stat-orders">
              <h4>Total Orders</h4>
              <p id="admin-orders-count">34</p>
            </div>
            <div className="card test-admin-stat" id="admin-stat-revenue">
              <h4>Revenue</h4>
              <p id="admin-revenue-amount">$3,200</p>
            </div>
          </div>
        )}

        {activePage === "users" && <UsersManagement />}
        {activePage === "products" && <ProductsManagement />}

      </main>
    </div>
  );
}
