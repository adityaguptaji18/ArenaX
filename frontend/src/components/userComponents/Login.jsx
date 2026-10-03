import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({
  onClose,
  onForgotPassword,
  onSignUp,
  onOwnerLogin,
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      console.log(response.data);

      // Store JWT
      localStorage.setItem("token", response.data.token);

      // Store user information
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setMessage(response.data.message);

      // Navigate to User Dashboard
      navigate("/user/dashboard");

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );

      console.log(error.response?.data);
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50">

      <div className="bg-white p-8 rounded-xl w-full max-w-md min-h-125 flex flex-col">

        {/* Header */}
        <div className="flex justify-between">

          <p className="text-3xl text-black font-bold">
            Login
          </p>

          <button
            className="text-gray-400 cursor-pointer hover:text-black"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-full"
        >

          {/* Email */}
          <div className="py-3">

            <p>Email</p>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition"
              required
            />

          </div>

          {/* Password */}
          <div>

            <p>Password</p>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition"
              required
            />

          </div>

          {/* Forgot Password */}
          <p
            className="text-blue-600 text-sm self-end py-1 cursor-pointer hover:underline"
            onClick={onForgotPassword}
          >
            Forgot Password?
          </p>

          {/* Error / Success Message */}
          {message && (
            <p className="text-center text-sm text-red-500 mt-2">
              {message}
            </p>
          )}

          {/* Buttons */}
          <div className="gap-3 flex flex-col mt-auto">

            {/* Login */}
            <button
              type="submit"
              className="w-full px-4 py-3 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800"
            >
              Login
            </button>

            {/* Owner Login */}
            <button
              type="button"
              onClick={onOwnerLogin}
              className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 cursor-pointer"
            >
              Login as Turf Owner
            </button>

            {/* Sign Up */}
            <p className="text-sm text-gray-500 text-center mt-1">
              Don't have an account?

              <span
                onClick={onSignUp}
                className="text-blue-600 cursor-pointer hover:underline ml-1"
              >
                Sign Up
              </span>

            </p>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Login;