import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
  const isAuthenticated = true; // Replace with actual authentication logic
  const isAdmin = true; // Replace with actual admin check
  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminProtectedRoute;
