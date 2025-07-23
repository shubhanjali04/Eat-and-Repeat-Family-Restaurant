import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const motivationalMessages = [
  "Great food, greater future!",
  "Eat well, feel amazing!",
  "Your journey to tasty begins here!",
  "Fuel your body, feed your soul.",
  "One bite closer to happiness 🍽️"
];

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const randomMsg = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setMessage(randomMsg);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "/auth/login" : "/auth/register";

    try {
      const res = await axios.post(url, form);
      alert(res.data.message || "Success");
      if (isLogin) navigate("/home");
    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      alert("Logged out successfully");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100 relative">
      
      {/* Logo */}
      <img
        src="/eatApp-Logo.png"
        alt="logo"
        className="absolute top-4 right-4 w-24 h-24 object-contain"
      />

      {/* Form Card */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-2 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">{message}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-orange-400"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-orange-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-orange-400"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition-all"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-600 font-semibold ml-1"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

        {isLogin && (
          <button
            onClick={handleLogout}
            className="mt-4 w-full text-sm text-red-500 underline"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;