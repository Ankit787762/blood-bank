// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { getProfile } from "../services/userService";
import { getHospitals } from "../services/hospitalService";
import { getMyRequests, createRequest } from "../services/requestService";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // form state
  const [hospital, setHospital] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [units, setUnits] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await getProfile();
        // console.log("PROFILE RESPONSE:", profileRes.data);
        setUser(profileRes.data.data);

        const hospitalsRes = await getHospitals();
        setHospitals(hospitalsRes.data.data || []);

        const requestsRes = await getMyRequests();
        setRequests(requestsRes || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRequest({ hospital, bloodGroup, units });
      alert("Request created successfully ✅");

      // refresh requests
      const updatedRequests = await getMyRequests();
      setRequests(updatedRequests || []);

      // reset form
      setHospital("");
      setBloodGroup("");
      setUnits("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create request");
    }
  };

  if (loading) return <p className="pt-20 text-center">Loading Dashboard...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      {/* Main Content */}
      <div className="pt-24 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-10">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>

          {error && <p className="text-red-500">{error}</p>}

          {/* Profile Section */}
          {user && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg p-4 bg-gray-50">
              <p>
                <strong>Name:</strong> {user.fullName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
            </div>
          )}

          {/* Add Request Form */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Add Blood Request</h3>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 border rounded-lg p-5 bg-gray-50"
            >
              <select
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Hospital</option>
                {hospitals.length > 0 ? (
                  hospitals.map((h) => (
                    <option key={h._id} value={h._id}>
                      {h.name} — {h.location}
                    </option>
                  ))
                ) : (
                  <option disabled>No hospitals available</option>
                )}
              </select>

              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Blood Group</option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>

              <input
                type="number"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
                placeholder="Units"
                required
                min="1"
              />

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
              >
                Submit Request
              </button>
            </form>
          </div>

          {/* Requests List */}
          <div>
            <h3 className="text-xl font-semibold mb-3">My Requests</h3>
            {requests.length === 0 ? (
              <p className="text-gray-600">No requests found</p>
            ) : (
              <ul className="space-y-3">
                {requests.map((req) => (
                  <li
                    key={req._id}
                    className="border p-3 rounded-lg flex justify-between items-center bg-gray-50"
                  >
                    <span>
                      <strong>{req.hospital?.name || "Unknown Hospital"}</strong>{" "}
                      — {req.bloodGroup} ({req.units} units)
                    </span>
                    <span
                      className={`px-3 py-1 rounded text-white capitalize ${
                        req.status === "approved"
                          ? "bg-green-500"
                          : req.status === "rejected"
                          ? "bg-red-500"
                          : req.status === "completed"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {req.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
