import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  // Logic: Check if the VIP pass exists in browser memory
  const token = localStorage.getItem('token');

  if (!token) {
    // Logic: If no token, send them back to the login page
    return <Navigate to="/login" replace />;
  }

  // Logic: If token exists, show the requested page (children)
  return children;
}

export default ProtectedRoute;