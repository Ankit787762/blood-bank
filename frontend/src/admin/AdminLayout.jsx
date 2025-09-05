import Topbar from "./components/Topbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Right side */}
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-4 flex-1 overflow-y-auto">
          <Outlet /> {/* Yaha par admin pages render honge */}
        </main>
      </div>
    </div>
  );
}
