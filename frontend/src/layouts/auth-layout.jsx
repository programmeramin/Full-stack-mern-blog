import React from 'react';
import { Navigate, Outlet } from 'react-router';

const AuthLayout = () => {
  const isLoggedIn = false;
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh_-_80px)] pt-10 w-full max-w-[500px] mx-auto">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
