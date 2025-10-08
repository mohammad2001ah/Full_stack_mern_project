import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword: ${password}`);
    // لاحقًا: إرسال البيانات للـ backend
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-container">
          <h2>Login to Your Account</h2>
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <button type="submit">Login</button>
          </form>
          <p style={{ marginTop: '10px' }}>
            Don't have an account? 
            <NavLink to='/signup' className="signup-link" >
            Sign Up</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
