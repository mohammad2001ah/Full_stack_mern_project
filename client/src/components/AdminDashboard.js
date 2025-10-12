import React, { useState } from "react";
import "./adminDashboard.css";
import { FaUser, FaBox, FaShoppingCart, FaCog, FaBars } from "react-icons/fa";

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-menu">
          <li><FaUser /> Users</li>
          <li><FaBox /> Products</li>
          <li><FaShoppingCart /> Orders</li>
          <li><FaCog /> Settings</li>
        </ul>
      </aside>

      {/* Overlay for small screens */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}

      {/* Main content */}
      <main className="main-content">
        {/* Navbar */}
        <nav className="dashboard-navbar">
          <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            <FaBars />
          </div>
          <h3>Welcome, Admin</h3>
          <button className="logout-btn">Logout</button>
        </nav>

        {/* Dashboard cards */}
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
      </main>
    </div>
  );
}
