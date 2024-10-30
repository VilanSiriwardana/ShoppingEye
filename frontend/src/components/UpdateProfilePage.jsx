import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfileSideBar from "./ProfileSideBar";

import Header from "./Header";
import { HiArrowLeft } from "react-icons/hi";

const UpdateProfilePage = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteStatus, setDeleteStatus] = useState(""); // State for delete status
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await axios.get("http://localhost:3050/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEmail(response.data.email);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setBirthday(
          new Date(response.data.birthday).toISOString().split("T")[0]
        );
        setGender(response.data.gender);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3050/api/auth/update",
        { email, firstName, lastName, birthday, gender },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Profile updated successfully!");
      setError("");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete("http://localhost:3050/api/auth/delete", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDeleteStatus("Profile deleted successfully!");
        localStorage.removeItem("token");
        navigate("/login");
      } catch (err) {
        console.error("Error deleting profile:", err);
        setDeleteStatus("Failed to delete profile.");
      }
    }
  };

  // const handleGoBack = () => {
  //   navigate("/profile");
  // };

  return (
    <div className="flex flex-col">
      {/* Header Component */}
      <Header />
      <div className="flex">
        <ProfileSideBar />
        <div className="flex-grow min-h-screen bg-gray-100 p-8">
          <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
            <div className="flex items-center mb-6">
              {/* <button
              onClick={handleGoBack}
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              <HiArrowLeft size={24} />
            </button> */}
              <h2 className="text-2xl font-bold text-center flex-grow">
                Update Profile
              </h2>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}
            {deleteStatus && (
              <p className="text-red-500 text-center">{deleteStatus}</p>
            )}

            <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Birthday */}
              <div>
                <label
                  htmlFor="birthday"
                  className="block text-sm font-medium text-gray-700"
                >
                  Birthday
                </label>
                <input
                  id="birthday"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-span-2 flex justify-between mt-6 gap-5">
                <button
                  type="submit"
                  className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
                >
                  Update Profile
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600"
                >
                  Delete Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
