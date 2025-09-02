import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Blood Bank
        </Link>

        {/* Menu */}
        <div className="flex gap-6">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-gray-200">
            Dashboard
          </Link>
          <Link to="/login" className="hover:text-gray-200">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
