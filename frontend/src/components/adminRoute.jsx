import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import { selectCurrentUser } from '@/features/auth/authSlice';

const AdminRoute = ({ children }) => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;
