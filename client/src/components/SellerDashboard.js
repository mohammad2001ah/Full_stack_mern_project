import React, { useState, useEffect } from "react";
import "./adminDashboard.css";
import "./sellerDashboard.css";
import { FaBox, FaShoppingCart, FaCog, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../utils/constants";
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
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">Seller Panel</h2>
        <ul className="sidebar-menu">
          <li className={activePage === "dashboard" ? "active" : ""} onClick={() => setActivePage("dashboard")}>
            <FaBox /> Dashboard
          </li>
          <li className={activePage === "products" ? "active" : ""} onClick={() => setActivePage("products")}>
            <FaBox /> My Products
          </li>
          <li className={activePage === "orders" ? "active" : ""} onClick={() => setActivePage("orders")}>
            <FaShoppingCart /> Orders
          </li>
          <li className={activePage === "settings" ? "active" : ""} onClick={() => setActivePage("settings")}>
            <FaCog /> Settings
          </li>
        </ul>
      </aside>

      {/* Overlay (mobile) */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}

      {/* Main Content */}
      <main className="main-content">
        {/* Navbar */}
        <nav className="dashboard-navbar">
          <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            <FaBars />
          </div>
          <h3>Welcome, {user?.name || 'Seller'}</h3>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt style={{ marginRight: "8px" }} />
            Logout
          </button>
        </nav>

        {activePage === "dashboard" && (
          <div className="stats-grid">
            <div className="card">
              <h4>My Products</h4>
              <p>{statsLoading ? "..." : stats.productCount}</p>
            </div>
            <div className="card">
              <h4>Pending Orders</h4>
              <p>{statsLoading ? "..." : stats.pendingOrders}</p>
            </div>
            <div className="card">
              <h4>Completed Orders</h4>
              <p>{statsLoading ? "..." : stats.completedOrders}</p>
            </div>
            <div className="card">
              <h4>Revenue</h4>
              <p>{statsLoading ? "..." : `$${stats.revenue.toLocaleString()}`}</p>
            </div>
          </div>
        )}

        {activePage === "products" && <ProductsManagement />}

      </main>
    </div>
  );
}

