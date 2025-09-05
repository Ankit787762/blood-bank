import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../store/authSlice";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // ✅ Check token
 useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(logout()); // ✅ token nahi to logout state bhi clear
    return;
  }

  fetch("http://localhost:5000/api/v1/auth/verify", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Invalid token");
      return res.json();
    })
    .then((data) => dispatch(setUser(data.user)))
    .catch(() => {
      localStorage.removeItem("token");
      dispatch(logout());
    });
}, [dispatch]);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  const baseLink =
    "px-4 py-2 rounded-lg font-medium transition-colors duration-200";
  const activeLink = "text-indigo-600 bg-indigo-100";
  const idleLink = "text-gray-700 hover:text-indigo-600";

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur border-b border-gray-200 z-50">
      <nav className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-indigo-600"
        >
          Blood Bank
        </Link>

        {/* Menu */}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : idleLink}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : idleLink}`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : idleLink}`
              }
            >
              Signup
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
