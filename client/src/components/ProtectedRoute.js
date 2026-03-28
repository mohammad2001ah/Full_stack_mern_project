import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES, USER_ROLES } from '../utils/constants';

/**
 * ProtectedRoute — wraps a route element and enforces authentication + role checks.
 *
 * Props:
 *   allowedRoles  — array of role strings that can access this route
 *   children      — the page component to render if authorized
 */
export default function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, role, loading } = useAuth();

  // Still checking auth from localStorage
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Logged in but not authorized for this route → redirect to their home
  if (allowedRoles && !allowedRoles.includes(role)) {
    // Send each role to their appropriate home page
    if (role === USER_ROLES.ADMIN) {
      return <Navigate to={ROUTES.ADMIN} replace />;
    }
    if (role === USER_ROLES.SELLER) {
      return <Navigate to={ROUTES.SELLER} replace />;
    }
    // Customer or unknown → home page
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
}
