// src/admin/AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/login" replace />; // not logged in
  if (user?.role !== "admin") return <Navigate to="/" replace />; // not admin

  return <Outlet />; // allow nested admin routes
};

export default AdminRoute;
