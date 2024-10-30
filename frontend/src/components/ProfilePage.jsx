import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfileSideBar from "./ProfileSideBar";
import Header from "./Header";
import ListMeasurements from "../pages/Recommendations/ListMeasurements";


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
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
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
      }
    };
    fetchUserData();
  }, [navigate]);

  return (<>
  <Header />
    <div className="flex">
            {/* Header Component */}

      <ProfileSideBar />
      <div className="flex-grow min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            My Profile
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          {user ? (
            <div className="grid grid-cols-2 gap-8">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <p className="mt-1 text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <p className="mt-1 text-gray-900">{user.email}</p>
              </div>

              {/* Birthday */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Birthday
                </label>
                <p className="mt-1 text-gray-500">
                  {new Date(user.birthday).toISOString().split("T")[0]}
                </p>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <p className="mt-1 text-gray-500">{user.gender}</p>
              </div>
            </div>
          ) : (
            <p className="text-center">Loading...</p>
          )}

          
        </div>
        {/* <MyRecommendations /> */}
        <ListMeasurements />

        
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
