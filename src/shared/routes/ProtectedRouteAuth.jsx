import React from 'react';
import { Navigate } from 'react-router-dom';

// Dummy authentication check (replace with your actual logic)
const isAuthenticated = () => {
  console.log('isAuthenticated', localStorage.getItem('loginResonseId'));
  return localStorage.getItem('loginResonseId') == null; // Adjust the key as needed
};

const ProtectedRouteAuth = ({ element: Element, ...rest }) => {
  return isAuthenticated() ? Element : <Navigate to="/home" />;
};

export default ProtectedRouteAuth;
