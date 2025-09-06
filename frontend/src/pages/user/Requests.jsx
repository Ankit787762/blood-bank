import { useEffect, useState } from "react";
import { getRequests, createRequest } from "../../services/requestService";
import { getHospitals } from "../../services/hospitalService";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [units, setUnits] = useState(1);
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [hospital, setHospital] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getRequests();
        setRequests(data || []);
      } catch {
        setError("Failed to fetch requests");
      }
    };

    const fetchHospitals = async () => {
      try {
        const res = await getHospitals();
        const arr = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setHospitals(arr);
      } catch {
        setHospitals([]);
      }
    };

    fetchRequests();
    fetchHospitals();
  }, []);

  const handleAddRequest = async (e) => {
    e.preventDefault();
    if (!hospital) return;

    setLoading(true);
    setError("");
    try {
      await createRequest({ units, bloodGroup, hospital });
      setUnits(1);
      setBloodGroup("O+");
      setHospital("");
      // Refresh requests after adding
      const data = await getRequests();
      setRequests(data || []);
    } catch {
      setError("Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-3xl font-bold mb-6">Add New Request</h2>
      <form onSubmit={handleAddRequest} className="flex flex-col gap-3 mb-6">
        <input
          type="number"
          value={units}
          min={1}
          onChange={(e) => setUnits(e.target.value)}
          placeholder="Units"
          required
          className="p-3 border rounded"
        />
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          required
          className="p-3 border rounded"
        >
          {["O+","O-","A+","A-","B+","B-","AB+","AB-"].map(bg => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
        <select
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
          required
          className="p-3 border rounded"
        >
          <option value="">Select Hospital</option>
          {hospitals.map(h => <option key={h._id} value={h._id}>{h.name}</option>)}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Adding..." : "Add Request"}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <h2 className="text-3xl font-bold mb-4">All Requests</h2>
      {requests.length > 0 ? (
        <ul className="space-y-3">
          {requests.map(req => (
            <li key={req._id} className="bg-white p-4 shadow rounded">
              <p>Hospital: {req.hospital?.name || "N/A"}</p>
              <p>Blood Group: {req.bloodGroup}</p>
              <p>Units: {req.units}</p>
              <p>Status: {req.status || "Pending"}</p>
            </li>
          ))}
        </ul>
      ) : <p>No requests yet</p>}
    </div>
  );
};

export default Requests;
