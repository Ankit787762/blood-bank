import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

// User
import UserLayout from "../pages/user/UserLayout.jsx";
import Dashboard from "../pages/user/Dashboard.jsx"; // sirf redirect
import Profile from "../pages/user/Profile.jsx";
import AddRequest from "../pages/user/AddRequest.jsx";
import MyRequests from "../pages/user/MyRequests.jsx";
import Hospitals from "../pages/user/Hospitals.jsx";
import Requests from "../pages/user/Requests.jsx";

// Admin
import AdminDashboard from "../admin/AdminDashboard.jsx";
import AdminHospitals from "../admin/AdminHospitals.jsx";
import AdminRequests from "../admin/AdminRequests.jsx";
import AdminRoute from "../admin/AdminRoute.jsx";
import AdminLayout from "../admin/AdminLayout.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Routes */}
      <Route path="/dashboard" element={<UserLayout />}>
        <Route index element={<Dashboard />} /> {/* Redirect karega Profile pe */}
        <Route path="profile" element={<Profile />} />
        <Route path="add-request" element={<AddRequest />} />
        <Route path="my-requests" element={<MyRequests />} />
        <Route path="hospitals" element={<Hospitals />} />
        <Route path="requests" element={<Requests />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="hospitals" element={<AdminHospitals />} />
          <Route path="requests" element={<AdminRequests />} />
        </Route>
      </Route>
    </Routes>
  );
}
