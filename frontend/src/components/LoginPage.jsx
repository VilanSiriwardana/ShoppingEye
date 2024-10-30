import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3050/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id); // Store user ID

      navigate("/profile");
      window.location.reload();
    } catch (error) {
      setError(
        error.response
          ? error.response.data.msg
          : "An error occurred. Please try again."
      );
    }
  };
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3050/api/auth/login",
  //       {
  //         email,
  //         password
  //       }
  //     );

  //     // Assuming response.data contains a user object
  //     const { token, user } = response.data; // Destructure the response

  //     // Store the token and user ID in localStorage
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("userId", user._id); // Store user ID

  //     // Navigate to the profile page
  //     navigate("/profile");
  //   } catch (error) {
  //     setError(
  //       error.response
  //         ? error.response.data.msg
  //         : "An error occurred. Please try again."
  //     );
  //   }
  // };

  return (
    <div className="flex flex-col">
      {/* Header Component */}
      <Header />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email*
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Please enter your Email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password*
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Please enter your password"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-between">
              <a
                href="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                LOGIN
              </button>
            </div>
          </form>

          {/* Social Login Section */}
          {/* <div className="text-center mt-4">
          <p>Or, login with</p>
          <div className="mt-2 flex justify-center space-x-4">
            <button className="bg-white text-blue-600 font-semibold py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
              <i className="fab fa-facebook"></i> Facebook
            </button>
            <button className="bg-white text-red-500 font-semibold py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
              <i className="fab fa-google"></i> Google
            </button>
          </div>
        </div> */}

          {/* Register Link */}
          <div className="text-center mt-4">
            <p>
              New member?{" "}
              <a href="/register" className="text-blue-500 hover:underline">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
