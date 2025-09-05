import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch hospitals
  const fetchHospitals = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/v1/admin/hospitals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHospitals(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error("❌ Error fetching hospitals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  // ✅ Delete hospital
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hospital?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/v1/admin/hospital/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Optimistic UI update (remove hospital from state without full refetch)
      setHospitals((prev) => prev.filter((h) => h._id !== id));

      alert("✅ Hospital deleted successfully");
    } catch (err) {
      console.error("❌ Error deleting hospital:", err);
      alert("Failed to delete hospital");
    }
  };

  if (loading) return <p>Loading hospitals...</p>;

  return (
    <div>
      <h2 className="text-2xl mb-4">Hospitals List</h2>
      {hospitals.length === 0 ? (
        <p className="text-gray-500">No hospitals found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((h) => (
              <tr key={h._id}>
                <td className="p-2 border">{h._id}</td>
                <td className="p-2 border">{h.name}</td>
                <td className="p-2 border">{h.email}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => alert("Edit functionality coming soon")}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(h._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminHospitals;
