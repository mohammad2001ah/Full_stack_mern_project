import React, { useState, useEffect } from "react";
import "./adminDashboard.css";
import "./sellerDashboard.css";
import { FaBox, FaShoppingCart, FaCog, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES, API_ENDPOINTS } from "../utils/constants";
import api from "../utils/api";
import ProductsManagement from "./ProductsManagement";

export default function SellerDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState({
    productCount: 0,
    pendingOrders: 0,
    completedOrders: 0,
    revenue: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  const navigate = useNavigate();
  const { logout, isSeller, loading, isAuthenticated, user } = useAuth();

  // Redirect non-seller users
  useEffect(() => {
    if (!loading && (!isAuthenticated || !isSeller())) {
      navigate(ROUTES.LOGIN);
    }
  }, [loading, isAuthenticated, isSeller, navigate]);

  // Fetch stats when dashboard is active
  useEffect(() => {
    if (activePage === "dashboard" && isAuthenticated) {
      fetchStats();
    }
  }, [activePage, isAuthenticated]);

  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const res = await api.get(API_ENDPOINTS.SELLER.STATS);
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching seller stats:", err);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  // Show nothing while checking auth
  if (loading) {
    return <div className="dashboard-container"><p>Loading...</p></div>;
  }

  return (
    <div className="dashboard-container seller-dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`} id="seller-sidebar" data-testid="testid-seller-sidebar">
        <h2 className="sidebar-title">Seller Panel</h2>
        <ul className="sidebar-menu">
          <li id="nav-dash" className={activePage === "dashboard" ? "active" : ""} onClick={() => setActivePage("dashboard")}>
            <FaBox /> Dashboard
          </li>
          <li id="nav-products" className={activePage === "products" ? "active" : ""} onClick={() => setActivePage("products")}>
            <FaBox /> My Products
          </li>
          <li id="nav-orders" className={activePage === "orders" ? "active" : ""} onClick={() => setActivePage("orders")}>
            <FaShoppingCart /> Orders
          </li>
          <li id="nav-settings" className={activePage === "settings" ? "active" : ""} onClick={() => setActivePage("settings")}>
            <FaCog /> Settings
          </li>
        </ul>
      </aside>

      {/* Overlay (mobile) */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}

      {/* Main Content */}
      <main className="main-content">
        {/* Navbar */}
        <nav className="dashboard-navbar" id="seller-nav">
          <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)} id="sidebar-toggle">
            <FaBars />
          </div>
          <h3 id="seller-welcome">Welcome, {user?.name || 'Seller'}</h3>
          <button className="logout-btn" onClick={handleLogout} id="seller-logout-btn" data-testid="testid-logout-btn">
            <FaSignOutAlt style={{ marginRight: "8px" }} />
            Logout
          </button>
        </nav>

        {activePage === "dashboard" && (
          <div className="stats-grid" id="seller-stats-grid">
            <div className="card test-stat-card" id="stat-products">
              <h4>My Products</h4>
              <p id="stat-products-count">{statsLoading ? "..." : stats.productCount}</p>
            </div>
            <div className="card test-stat-card" id="stat-pending">
              <h4>Pending Orders</h4>
              <p id="stat-pending-count">{statsLoading ? "..." : stats.pendingOrders}</p>
            </div>
            <div className="card test-stat-card" id="stat-completed">
              <h4>Completed Orders</h4>
              <p id="stat-completed-count">{statsLoading ? "..." : stats.completedOrders}</p>
            </div>
            <div className="card test-stat-card" id="stat-revenue">
              <h4>Revenue</h4>
              <p id="stat-revenue-amount">{statsLoading ? "..." : `$${stats.revenue.toLocaleString()}`}</p>
            </div>
          </div>
        )}

        {activePage === "products" && <ProductsManagement />}

      </main>
    </div>
  );
}

