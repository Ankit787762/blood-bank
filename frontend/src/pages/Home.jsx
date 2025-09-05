import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-200 to-purple-200 text-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-24 md:flex md:items-center md:justify-between gap-12">
          <div className="md:w-1/2">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Manage <span className="text-indigo-600">Blood Banks</span> Effortlessly
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-800">
              Track hospitals, handle requests, and maintain inventory — all from one clean and modern dashboard.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-500 transition"
                >
                  Get Started
                </Link>
              )}
              <Link
                to="/hospitals"
                className="px-6 py-3 border border-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition"
              >
                View Hospitals
              </Link>
              {isAuthenticated && user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-400 transition"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=1200&auto=format&fit=crop"
              alt="App preview"
              className="rounded-3xl shadow-2xl w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features / Quick Links */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Regular User Link */}
        <Link
          to="/hospitals"
          className="bg-white rounded-xl p-8 shadow hover:shadow-lg transition transform hover:-translate-y-1"
        >
          <h3 className="text-xl font-semibold text-gray-900">Hospitals</h3>
          <p className="mt-2 text-gray-600">Browse and manage registered hospitals.</p>
        </Link>

        {/* Admin Quick Link */}
        {isAuthenticated && user?.role === "admin" && (
          <Link
            to="/admin"
            className="bg-red-500 text-white rounded-xl p-8 shadow hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-semibold">Admin Dashboard</h3>
            <p className="mt-2">Manage hospitals and requests efficiently.</p>
          </Link>
        )}

        {/* Extra Feature Card */}
        <div className="bg-white rounded-xl p-8 shadow hover:shadow-lg transition transform hover:-translate-y-1">
          <h3 className="text-xl font-semibold text-gray-900">Requests</h3>
          <p className="mt-2 text-gray-600">Track and manage user requests easily.</p>
        </div>
      </section>

    </div>
  );
}
