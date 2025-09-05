import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../services/userService";
import {jwtDecode} from "jwt-decode"; // default import (galat tha pehle)
import { setUser } from "../store/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await loginUser(formData);

      // ✅ Save token
      const token = data.data.token;
      localStorage.setItem("token", token);

      // ✅ Decode token
      const decoded = jwtDecode(token);

      // ✅ Redux me user set kar
      dispatch(
        setUser({
          ...data.data.user, // backend se user object
          role: decoded.role, // token me role
        })
      );

      // ✅ Redirect based on role
      if (decoded.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {" "}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md border border-gray-100"
      >
        {" "}
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
          {" "}
          Welcome Back{" "}
        </h2>{" "}
        <p className="text-gray-500 text-center mb-8">
          {" "}
          Login to continue to <span className="font-semibold">
            Blood Bank
          </span>{" "}
        </p>{" "}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />{" "}
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />{" "}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition shadow-md disabled:opacity-70"
        >
          {" "}
          {loading ? "Logging in..." : "Login"}{" "}
        </button>{" "}
        {error && (
          <p className="text-red-500 mt-4 text-center font-medium">{error}</p>
        )}{" "}
        <p className="text-gray-600 mt-8 text-center">
          {" "}
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            {" "}
            Register{" "}
          </Link>{" "}
        </p>{" "}
      </form>{" "}
    </div>
  );
};

export default Login;
