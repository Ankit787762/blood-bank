import { useEffect, useState } from "react";
import { getMyRequests } from "../../services/requestService";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getMyRequests();
        setRequests(data || []);
      } catch {
        setError("Failed to fetch your requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-3xl font-bold mb-6">My Requests</h2>
      {error && <p className="text-red-500">{error}</p>}
      {requests.length > 0 ? (
        <ul className="space-y-3">
          {requests.map(r => (
            <li key={r._id} className="bg-white p-4 rounded shadow">
              <p>Hospital: {r.hospital?.name || "N/A"}</p>
              <p>Blood Group: {r.bloodGroup}</p>
              <p>Units: {r.units}</p>
              <p>Status: {r.status || "Pending"}</p>
            </li>
          ))}
        </ul>
      ) : <p>No requests yet</p>}
    </div>
  );
};

export default MyRequests;
