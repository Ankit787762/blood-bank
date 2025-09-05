import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all requests
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/v1/admin/requests", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRequests(Array.isArray(res.data.data) ? res.data.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching requests:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Approve / Reject handler
  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
  `http://localhost:5000/api/v1/admin/requests/${id}`, // ✅ yeh theek hai
  { status: action },
  { headers: { Authorization: `Bearer ${token}` } }
);


      // UI update
      setRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status: res.data.data.status } : r
        )
      );
    } catch (err) {
      console.error("❌ Error updating request:", err);
      alert("Something went wrong while updating request");
    }
  };

  if (loading) return <p>Loading requests...</p>;

  return (
    <div>
      <h2 className="text-2xl mb-4">Requests List</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">No requests found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Blood Group</th>
              <th className="p-2 border">Units</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r._id}>
                <td className="p-2 border">{r._id}</td>
                <td className="p-2 border">
                  {r.user ? `${r.user.fullName} (${r.user.email})` : "N/A"}
                </td>
                <td className="p-2 border">{r.bloodGroup}</td>
                <td className="p-2 border">{r.units}</td>
                <td className="p-2 border">{r.status}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleAction(r._id, "approved")}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(r._id, "rejected")}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Reject
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

export default AdminRequests;
