// src/pages/user/Dashboard.jsx
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  // jab user /dashboard pe aayega, to usko default Profile page dikhega
  return <Navigate to="/dashboard/profile" replace />;
};

export default Dashboard;
