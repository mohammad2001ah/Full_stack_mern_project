import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES, VALIDATION } from '../utils/constants';
import Button from './common/Button';
import Input from './common/Input';
import './signup.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { register } = useAuth();

  const validateForm = () => {
    const newErrors = {};

    if (name.length < VALIDATION.NAME_MIN_LENGTH) {
      newErrors.name = `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`;
    }

    if (!VALIDATION.EMAIL_REGEX.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
      newErrors.password = `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const result = await register(name, email, password);

    setLoading(false);

    if (result.success) {
      setMessageType('success');
      setMessage(result.message || 'Registration successful! Redirecting to login...');
      
      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 1500);
    } else {
      setMessageType('error');
      setMessage(result.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-overlay">
        <div className="register-container">
          <h2>Create Your Account</h2>

          {message && (
            <div className={`alert alert-${messageType === 'success' ? 'success' : 'danger'}`} role="alert">
              {message}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <Input
              label="Name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              error={errors.name}
              autoComplete="name"
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              error={errors.email}
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
              error={errors.password}
              helperText={`Minimum ${VALIDATION.PASSWORD_MIN_LENGTH} characters`}
              autoComplete="new-password"
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              error={errors.confirmPassword}
              autoComplete="new-password"
            />

            <Button type="submit" variant="primary" fullWidth loading={loading}>
              {loading ? 'Creating Account...' : 'Register'}
            </Button>
          </form>

          <p style={{ marginTop: '20px', textAlign: 'center' }}>
            Already have an account?{' '}
            <NavLink to={ROUTES.LOGIN} className="login-link">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
