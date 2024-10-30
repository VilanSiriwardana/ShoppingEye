import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi"; // Importing the arrow icon
import ProfileSideBar from "./ProfileSideBar";
import Header from "./Header";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3050/api/auth/changePassword", // Updated endpoint
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Password updated successfully!");
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error changing password:", err);
      setError("Failed to change password.");
    }
  };

  const handleGoBack = () => {
    navigate("/profile"); // Navigate to the profile page
  };

  return (
    <div className="flex flex-col">
      {/* Header Component */}
      <Header />
      <div className="flex">
        <ProfileSideBar /> {/* Add Sidebar component */}
        <div className="flex-grow bg-gray-100 p-8">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md mx-auto">
            <div className="flex items-center mb-6">
              <button
                onClick={handleGoBack}
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                <HiArrowLeft size={24} />
              </button>
              <h2 className="text-2xl font-bold text-center flex-grow">
                Change Password
              </h2>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
