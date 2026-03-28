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
  const [role, setRole] = useState('customer');
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

    const result = await register(name, email, password, role);

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
    <div className="register-page" id="signup-page">
      <div className="register-overlay">
        <div className="register-container" id="signup-container">
          <h2 id="signup-header">Create Your Account</h2>

          {message && (
            <div 
              className={`alert alert-${messageType === 'success' ? 'success' : 'danger'}`} 
              role="alert"
              id="signup-alert"
              data-testid="testid-signup-alert"
            >
              {message}
            </div>
          )}

          <form id="signup-form" data-testid="testid-signup-form" onSubmit={handleRegister}>
            <Input
              id="signup-name"
              data-testid="testid-signup-name"
              className="input-auth"
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
              id="signup-email"
              data-testid="testid-signup-email"
              className="input-auth"
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
              id="signup-password"
              data-testid="testid-signup-password"
              className="input-auth"
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
              id="signup-confirm-password"
              data-testid="testid-signup-confirm-password"
              className="input-auth"
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

            {/* Role Selector */}
            <div className="input-wrapper" style={{ marginBottom: '16px' }}>
              <label className="input-label">Register as<span className="input-required" aria-label="required">*</span></label>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <label 
                  id="label-role-customer"
                  data-testid="testid-label-role-customer"
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '12px', borderRadius: '6px', cursor: 'pointer',
                    border: role === 'customer' ? '2px solid #343834' : '2px solid #ccc',
                    backgroundColor: role === 'customer' ? '#343834' : '#fff',
                    color: role === 'customer' ? '#fff' : '#333',
                    fontWeight: 600, transition: 'all 0.3s ease',
                  }}>
                  <input
                    id="radio-role-customer"
                    data-testid="testid-radio-role-customer"
                    type="radio"
                    name="role"
                    value="customer"
                    checked={role === 'customer'}
                    onChange={(e) => setRole(e.target.value)}
                    style={{ display: 'none' }}
                  />
                  🛒 Customer
                </label>
                <label 
                  id="label-role-seller"
                  data-testid="testid-label-role-seller"
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '12px', borderRadius: '6px', cursor: 'pointer',
                    border: role === 'seller' ? '2px solid #343834' : '2px solid #ccc',
                    backgroundColor: role === 'seller' ? '#343834' : '#fff',
                    color: role === 'seller' ? '#fff' : '#333',
                    fontWeight: 600, transition: 'all 0.3s ease',
                  }}>
                  <input
                    id="radio-role-seller"
                    data-testid="testid-radio-role-seller"
                    type="radio"
                    name="role"
                    value="seller"
                    checked={role === 'seller'}
                    onChange={(e) => setRole(e.target.value)}
                    style={{ display: 'none' }}
                  />
                  🏪 Seller
                </label>
              </div>
            </div>

            <Button 
              id="signup-submit-btn" 
              data-testid="testid-signup-submit"
              className="btn-auth-submit"
              type="submit" 
              variant="primary" 
              fullWidth 
              loading={loading}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </Button>
          </form>

          <p style={{ marginTop: '20px', textAlign: 'center' }}>
            Already have an account?{' '}
            <NavLink to={ROUTES.LOGIN} className="login-link" id="login-link">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

