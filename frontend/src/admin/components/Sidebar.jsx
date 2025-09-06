import { Link, useLocation } from "react-router-dom";
import { Home, Hospital, List } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
   { path: "/admin-dashboard", label: "Dashboard", icon: <Home size={18} /> },
  { path: "/admin-dashboard/hospitals", label: "Hospitals", icon: <Hospital size={18} /> },
  { path: "/admin-dashboard/requests", label: "Requests", icon: <List size={18} /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 font-bold text-xl border-b">🩸 Admin Panel</div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
         <Link
  key={item.path}
  to={item.path}
  className={`flex items-center gap-2 p-3 rounded-md transition ${
    item.path === "/admin-dashboard"
      ? location.pathname === item.path
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-200 text-gray-700"
      : location.pathname.includes(item.path)
      ? "bg-blue-600 text-white"
      : "hover:bg-gray-200 text-gray-700"
  }`}
>
  {item.icon} {/* ✅ Icon render */}
  {item.label}
</Link>


        ))}
      </nav>
    </aside>
  );
}
