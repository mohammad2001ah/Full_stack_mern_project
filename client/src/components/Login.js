import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../utils/constants';
import Button from './common/Button';
import Input from './common/Input';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME);
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await login(email, password);

    setLoading(false);

    if (result.success) {
      setMessageType('success');
      setMessage(result.message || 'Login successful!');
      
      // Navigate based on role
      setTimeout(() => {
        if (result.role === 'admin') {
          navigate(ROUTES.ADMIN);
        } else {
          navigate(ROUTES.HOME);
        }
      }, 500);
    } else {
      setMessageType('error');
      setMessage(result.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-container">
          <h2>Login to Your Account</h2>
          
          {message && (
            <div className={`alert alert-${messageType === 'success' ? 'success' : 'danger'}`} role="alert">
              {message}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />

            <Button type="submit" variant="primary" fullWidth loading={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <p style={{ marginTop: '20px', textAlign: 'center' }}>
            Don't have an account?{' '}
            <NavLink to={ROUTES.SIGNUP} className="signup-link">
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
