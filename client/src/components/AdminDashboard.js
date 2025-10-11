import React from "react";
import "./adminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-menu">
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Users</a></li>
          <li><a href="#">Products</a></li>
          <li><a href="#">Orders</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <nav className="navbar navbar-light bg-light justify-content-between">
          <a className="navbar-brand ms-3">MY STORE Admin</a>
          <button className="btn btn-dark me-3">Logout</button>
        </nav>

        <div className="content-area p-4">
          <h3>Welcome, Admin</h3>
          <p>Manage users, products, and orders from your dashboard.</p>

          <div className="stats-container">
            <div className="stat-box bg-primary text-white">
              <h4>120</h4>
              <p>Users</p>
            </div>
            <div className="stat-box bg-success text-white">
              <h4>85</h4>
              <p>Products</p>
            </div>
            <div className="stat-box bg-warning text-dark">
              <h4>40</h4>
              <p>Orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}