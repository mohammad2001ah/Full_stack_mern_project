import React, { useState } from "react";
import "./adminDashboard.css";
import { FaUser, FaBox, FaShoppingCart, FaCog, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UsersManagement from "./UsersManagement"; // صفحة إدارة المستخدمين
import ProductsManagement from "./ProductsManagement"; // صفحة إدارة المنتجات

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard"); // الصفحة الحالية
  const [isOpen, setIsOpen] = useState(false); // للتحكم بفتح القائمة الجانبية
  const navigate = useNavigate();

  // تسجيل الخروج
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-menu">
          <li onClick={() => setActivePage("dashboard")}>
            <FaBox /> Dashboard
          </li>
          <li onClick={() => setActivePage("users")}>
            <FaUser /> Users
          </li>
          <li onClick={() => setActivePage("products")}>
            <FaBox /> Products
          </li>
          <li onClick={() => setActivePage("orders")}>
            <FaShoppingCart /> Orders
          </li>
          <li onClick={() => setActivePage("settings")}>
            <FaCog /> Settings
          </li>
        </ul>
      </aside>

      {/* Overlay (للجوال) */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}

      {/* Main Content */}
      <main className="main-content">
        {/* Navbar */}
        <nav className="dashboard-navbar">
          <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            <FaBars />
          </div>
          <h3>Welcome, Admin</h3>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt style={{ marginRight: "8px" }} />
            Logout
          </button>
        </nav>

        {/* محتوى الصفحة حسب activePage */}
        {activePage === "dashboard" && (
          <div className="stats-grid">
            <div className="card">
              <h4>Total Users</h4>
              <p>124</p>
            </div>
            <div className="card">
              <h4>Total Products</h4>
              <p>58</p>
            </div>
            <div className="card">
              <h4>Total Orders</h4>
              <p>34</p>
            </div>
            <div className="card">
              <h4>Revenue</h4>
              <p>$3,200</p>
            </div>
          </div>
        )}

        {activePage === "users" && <UsersManagement />}
        {activePage === "products" && <ProductsManagement />}

      </main>
    </div>
  );
}
