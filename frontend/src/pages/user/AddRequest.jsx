import { useEffect, useState } from "react";
import { createRequest } from "../../services/requestService";
import { getHospitals } from "../../services/hospitalService";

const AddRequest = () => {
  const [units, setUnits] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [hospital, setHospital] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch hospitals for dropdown
  const fetchHospitals = async () => {
    try {
      const res = await getHospitals();
      const hospitalsArray = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setHospitals(hospitalsArray);
    } catch (err) {
      console.error("Failed to fetch hospitals:", err);
      setHospitals([]);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleAddRequest = async (e) => {
  e.preventDefault();
  if (!hospital || !bloodGroup || !units) return;

  setLoading(true);
  setError("");
  setSuccess("");

  try {
    await createRequest({ units, bloodGroup, hospital });
    setUnits("");
    setBloodGroup("");
    setHospital("");
    setSuccess("Request added successfully!");

    // 3 seconds baad success message disappear
    setTimeout(() => setSuccess(""), 2000);
  } catch (err) {
    setError("Failed to create request");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-6 max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Request</h2>

      <form onSubmit={handleAddRequest} className="flex flex-col gap-4">
        <input
          type="number"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          placeholder="Enter Units"
          min={1}
          required
          className="p-3 border rounded-lg"
        />

        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          required
          className="p-3 border rounded-lg"
        >
          <option value="">Select Blood Group</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <select
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
          required
          className="p-3 border rounded-lg"
        >
          <option value="">Select Hospital Name</option>
          {Array.isArray(hospitals) &&
            hospitals.map((h) => (
              <option key={h._id} value={h._id}>
                {h.name}
              </option>
            ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Adding..." : "Add Request"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
};

export default AddRequest;
