import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newHospital, setNewHospital] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [editHospital, setEditHospital] = useState(null); // Selected hospital for edit

  // Fetch hospitals
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

  // Register new hospital
  const handleRegister = async () => {
    if (!newHospital.name || !newHospital.email || !newHospital.phone || !newHospital.address) {
      alert("All fields are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/v1/admin/hospital",
        newHospital,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setHospitals((prev) => [...prev, res.data.data]);
      alert("✅ Hospital registered successfully");
      setNewHospital({ name: "", email: "", phone: "", address: "" });
    } catch (err) {
      console.error("❌ Error registering hospital:", err);
      alert("Failed to register hospital");
    }
  };

  // Delete hospital
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hospital?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/v1/admin/hospital/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHospitals((prev) => prev.filter((h) => h._id !== id));
      alert("✅ Hospital deleted successfully");
    } catch (err) {
      console.error("❌ Error deleting hospital:", err);
      alert("Failed to delete hospital");
    }
  };

  // Open edit modal
  const openEditModal = (hospital) => {
    setEditHospital({ ...hospital }); // clone object
  };

  // Update hospital
  const handleUpdate = async () => {
    if (!editHospital.name || !editHospital.email || !editHospital.phone || !editHospital.address) {
      alert("All fields are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/v1/admin/hospital/${editHospital._id}`,
        {
          name: editHospital.name,
          email: editHospital.email,
          phone: editHospital.phone,
          address: editHospital.address,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setHospitals((prev) =>
        prev.map((h) => (h._id === editHospital._id ? res.data.data : h))
      );
      alert("✅ Hospital updated successfully");
      setEditHospital(null); // Close modal
    } catch (err) {
      console.error("❌ Error updating hospital:", err);
      alert("Failed to update hospital");
    }
  };

  if (loading) return <p className="text-gray-600 mt-4">Loading hospitals...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Hospitals Management</h2>

      {/* ➕ Add Hospital Form */}
      <div className="mb-8 p-6 bg-white rounded shadow-md border border-gray-200">
        <h3 className="text-xl font-medium mb-4 text-gray-700">Register New Hospital</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newHospital.name}
            onChange={(e) => setNewHospital({ ...newHospital, name: e.target.value })}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={newHospital.email}
            onChange={(e) => setNewHospital({ ...newHospital, email: e.target.value })}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newHospital.phone}
            onChange={(e) => setNewHospital({ ...newHospital, phone: e.target.value })}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Address"
            value={newHospital.address}
            onChange={(e) => setNewHospital({ ...newHospital, address: e.target.value })}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={handleRegister}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
        >
          Register
        </button>
      </div>

      {/* Hospitals Table */}
      {hospitals.length === 0 ? (
        <p className="text-gray-500">No hospitals found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow-md border border-gray-200">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left border-b">ID</th>
                <th className="p-3 text-left border-b">Name</th>
                <th className="p-3 text-left border-b">Email</th>
                <th className="p-3 text-left border-b">Phone</th>
                <th className="p-3 text-left border-b">Address</th>
                <th className="p-3 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((h) => (
                <tr key={h._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b text-sm text-gray-600">{h._id}</td>
                  <td className="p-3 border-b text-gray-700">{h.name}</td>
                  <td className="p-3 border-b text-gray-700">{h.email}</td>
                  <td className="p-3 border-b text-gray-700">{h.phone}</td>
                  <td className="p-3 border-b text-gray-700">{h.address}</td>
                  <td className="p-3 border-b flex space-x-2">
                    <button
                      onClick={() => openEditModal(h)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(h._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Hospital Modal */}
{editHospital && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl shadow-2xl w-96">
      <h3 className="text-xl font-semibold mb-4">Edit Hospital</h3>

      <input
        type="text"
        value={editHospital._id}
        readOnly
        className="border p-2 rounded w-full mb-2 bg-gray-100"
      />
      <input
        type="text"
        value={editHospital.name}
        onChange={(e) =>
          setEditHospital({ ...editHospital, name: e.target.value })
        }
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="email"
        value={editHospital.email}
        onChange={(e) =>
          setEditHospital({ ...editHospital, email: e.target.value })
        }
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="text"
        value={editHospital.phone}
        onChange={(e) =>
          setEditHospital({ ...editHospital, phone: e.target.value })
        }
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="text"
        value={editHospital.address}
        onChange={(e) =>
          setEditHospital({ ...editHospital, address: e.target.value })
        }
        className="border p-2 rounded w-full mb-4"
      />

      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setEditHospital(null)}
          className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AdminHospitals;
