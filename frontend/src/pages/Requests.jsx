import { useEffect, useState } from "react";
import { getRequests, createRequest } from "../services/requestService";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      const { data } = await getRequests();
      setRequests(data);
    } catch (err) {
      setError("Failed to fetch requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAddRequest = async (e) => {
    e.preventDefault();
    if (!newRequest.trim()) return;

    setLoading(true);
    setError("");
    try {
      await createRequest({ description: newRequest });
      setNewRequest("");
      fetchRequests();
    } catch (err) {
      setError("Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Requests</h2>

      <form onSubmit={handleAddRequest} className="flex gap-3 mb-6">
        <input
          type="text"
          value={newRequest}
          onChange={(e) => setNewRequest(e.target.value)}
          placeholder="Enter request"
          required
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {requests.length > 0 ? (
        <ul className="space-y-3">
          {requests.map((req) => (
            <li
              key={req._id}
              className="bg-white p-4 shadow rounded-xl hover:shadow-md transition"
            >
              ✏️ {req.description}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No requests yet</p>
      )}
    </div>
  );
};

export default Requests;
