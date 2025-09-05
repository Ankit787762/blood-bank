// src/App.jsx
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";

function LayoutWrapper() {
  const location = useLocation();

  // ✅ Admin ke liye Navbar hide
  const isAdminPath = location.pathname.startsWith("/admin-dashboard");

  return (
    <>
      {!isAdminPath && <Navbar />} {/* Admin pages pe hide */}
      <AppRoutes />
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
