import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ✅ check login status (yaha tum apna auth logic use karna)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Blood Bank
        </Link>

        {/* Conditional Menu */}
        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-green-500 hover:bg-green-500 px-4 py-2 rounded-lg text-white"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-6">
              <Link to="/" className="hover:text-gray-200">
                Home
              </Link>
              <Link to="/login" className="hover:text-gray-200">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-200">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
