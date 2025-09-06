import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LogOut, User, Hospital, PlusCircle, List } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

export default function UserLayout() { // same export name format
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navItems = [
    { path: "profile", label: "Profile", icon: <User size={18} /> },
    { path: "hospitals", label: "Hospitals", icon: <Hospital size={18} /> },
    { path: "add-request", label: "Add Request", icon: <PlusCircle size={18} /> },
    { path: "my-requests", label: "My Requests", icon: <List size={18} /> },
  ];

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    dispatch(logout());               // clear redux state
    navigate("/");                    // redirect to home
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 font-bold text-xl border-b">🩸 User Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 p-2 rounded-md transition ${
                location.pathname.includes(item.path)
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow p-4 flex justify-end">
          <button
            onClick={handleLogout} // ✅ Logout attached
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </header>

        {/* Page Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
