import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {/* You can replace with /hero.jpg if you add a file in /public */}
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Manage <span className="text-indigo-600">Blood Banks</span> with Ankit
            </h1>
            <p className="mt-4 text-gray-600">
              Track hospitals, handle requests, and keep inventory updated — all from one clean dashboard.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to="/register" className="px-5 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                Get Started
              </Link>
              <Link to="/hospitals" className="px-5 py-3 rounded-lg border hover:bg-gray-50">
                View Hospitals
              </Link>
            </div>
          </div>

          <div className="rounded-2xl shadow-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=1200&auto=format&fit=crop"
              alt="App preview"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="max-w-7xl mx-auto px-6 pb-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Hospitals", desc: "Browse and manage registered hospitals.", href: "/hospitals" },
          { title: "Requests",  desc: "Create and review blood requests.", href: "/requests"  },
          { title: "Dashboard", desc: "Your quick overview and profile.",   href: "/dashboard" },
        ].map((c) => (
          <Link key={c.title} to={c.href} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-900">{c.title}</h3>
            <p className="text-gray-600 mt-2">{c.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
