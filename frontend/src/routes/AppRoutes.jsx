import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Hospitals from "../pages/Hospitals.jsx";
import Requests from "../pages/Requests.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

// Admin
import AdminDashboard from "../admin/AdminDashboard.jsx";
import AdminHospitals from "../admin/AdminHospitals.jsx";
import AdminRequests from "../admin/AdminRequests.jsx";
import AdminRoute from "../admin/AdminRoute.jsx";
import AdminLayout from "../admin/AdminLayout.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public / User Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/hospitals" element={<Hospitals />} />
      <Route path="/requests" element={<Requests />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          {/* Ye Outlet ke andar dikhenge */}
          <Route index element={<AdminDashboard />} />
          <Route path="hospitals" element={<AdminHospitals />} />
          <Route path="requests" element={<AdminRequests />} />
        </Route>
      </Route>
    </Routes>
  );
}
