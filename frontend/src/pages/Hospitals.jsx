import { useEffect, useState } from "react";
import { getHospitals } from "../services/hospitalService";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const { data } = await getHospitals();
        setHospitals(data);
      } catch (err) {
        setError("Failed to fetch hospitals");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  if (loading) return <p className="text-gray-500">Loading hospitals...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Hospitals</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {hospitals.length > 0 ? (
        <ul className="space-y-3">
          {hospitals.map((hospital) => (
            <li
              key={hospital._id}
              className="bg-white p-4 shadow rounded-xl hover:shadow-lg transition"
            >
              🏥 {hospital.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hospitals found</p>
      )}
    </div>
  );
};

export default Hospitals;
