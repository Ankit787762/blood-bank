import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/userService";

const Register = () => {
  const [formData, setFormData] = useState({
  username: "",   // 👈 add
  fullName: "",
  email: "",
  password: "",
});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Register
        </h2>

        <input
          type="text"
          name="fullName"
          placeholder="Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
        />
              <input
              type="text"
              name="username"
             placeholder="Username"
             value={formData.username}
             onChange={handleChange}
              required
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              /> 

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
