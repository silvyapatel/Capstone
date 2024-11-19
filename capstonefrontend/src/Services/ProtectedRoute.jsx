// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ token, redirectTo, component }) => {
  // If no token, redirect to login page
  if (!token) {
    return <Navigate to={redirectTo} />;
  }

  // If token exists, render the protected component
  return component;
};

export default ProtectedRoute;
