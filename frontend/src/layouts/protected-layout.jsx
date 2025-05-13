import React from 'react';
import { Navigate, Outlet } from 'react-router';

const ProtectedLayout = () => {
  const isLoggedIn = false;
  if (!isLoggedIn) {
    Navigate({ to: '/auth/login' });
  }
  return <Outlet />;
};

export default ProtectedLayout;
