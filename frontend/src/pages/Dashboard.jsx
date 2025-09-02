import { useEffect, useState } from "react";
import { getProfile } from "../services/userService";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        setUser(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p className="pt-20 text-center">Loading Dashboard...</p>;

  return (
    <div className="pt-20 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>

        {error && <p className="text-red-500">{error}</p>}

        {user && (
          <div className="space-y-4">
            <p>
              <strong className="text-gray-700">Name:</strong> {user.name}
            </p>
            <p>
              <strong className="text-gray-700">Email:</strong> {user.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
