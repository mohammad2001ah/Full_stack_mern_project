import React, { useState } from "react";
import "./signup.css";
import { NavLink } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Name: ${name}\nEmail: ${email}\nPassword: ${password}`);
    // لاحقًا: إرسال البيانات للـ backend
  };

  return (
    <div className="register-page">
      <div className="register-overlay">
        <div className="register-container">
          <h2>Create Your Account</h2>
          <form onSubmit={handleRegister}>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />

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

            <button type="submit">Register</button>
          </form>

          <div className="social-login">
            <p>Or register with:</p>
            <div className="social-buttons">
              <button className="google-btn">Google</button>
              <button className="facebook-btn">Facebook</button>
            </div>
          </div>

          <p>
            Already have an account? <NavLink to='/login' className="login-link">Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
