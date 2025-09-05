import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block p-4 hover:bg-gray-200 ${isActive ? "bg-gray-300 font-bold" : ""}`;

  return (
    <aside className="w-60 bg-gray-100 h-full shadow-lg">
      <h2 className="text-xl font-bold p-4">Admin Panel</h2>
      <nav className="flex flex-col">
        <NavLink to="/admin-dashboard" end className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin-dashboard/hospitals" className={linkClass}>
          Hospitals
        </NavLink>
        <NavLink to="/admin-dashboard/requests" className={linkClass}>
          Requests
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
