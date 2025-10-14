// src/main/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contextapi/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth(); // Assuming your AuthContext provides a user object like { id: 1, role: 'customer' }

  if (!user) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    // If user role does not match the required role, redirect to home page
    // You could also show an "Access Denied" page here
    return <Navigate to="/" />;
  }

  // If user is logged in and has the correct role, show the page
  return children;
};

export default ProtectedRoute;