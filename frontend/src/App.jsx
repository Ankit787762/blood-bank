// src/App.jsx
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";

function LayoutWrapper() {
  const location = useLocation();

  // ✅ Navbar sirf login aur register pages ke liye
  const showNavbar = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {showNavbar && <Navbar />}
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
