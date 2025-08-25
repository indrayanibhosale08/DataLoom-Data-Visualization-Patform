// client/src/components/AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import  useAuth  from '../hooks/useAuth';

const AdminRoute = () => {
  const { user } = useAuth();

  // If the hook returns a user object and that user's role is 'admin', allow access.
  // Otherwise, redirect to the dashboard.
  return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/admin" />;
};

export default AdminRoute;