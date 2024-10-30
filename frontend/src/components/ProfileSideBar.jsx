import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaEdit, FaLock, FaSignOutAlt, FaHeart } from "react-icons/fa"; // Import FaHeart for Wishlist icon

const ProfileSideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/home");
    window.location.reload();
  };

  return (
    <div className="w-64 bg-gray-800 min-h-screen text-white p-6">
      <div className="text-2xl font-semibold mb-8">Dashboard</div>
      <nav className="space-y-4">
        <Link
          to="/profile"
          className={`flex items-center space-x-2 ${
            location.pathname === "/profile"
              ? "text-orange-500"
              : "hover:text-gray-300"
          }`}
        >
          <FaUser />
          <span>My Profile</span>
        </Link>
        <Link
          to="/update-profile"
          className={`flex items-center space-x-2 ${
            location.pathname === "/update-profile"
              ? "text-orange-500"
              : "hover:text-gray-300"
          }`}
        >
          <FaEdit />
          <span>Edit Profile</span>
        </Link>
        <Link
          to="/change-password"
          className={`flex items-center space-x-2 ${
            location.pathname === "/change-password"
              ? "text-orange-500"
              : "hover:text-gray-300"
          }`}
        >
          <FaLock />
          <span>Change Password</span>
        </Link>

        {/* Wishlist link */}
        <Link
          to="/wishlist"
          className={`flex items-center space-x-2 ${
            location.pathname === "/wishlist"
              ? "text-orange-500"
              : "hover:text-gray-300"
          }`}
        >
          <FaHeart />
          <span>View Wishlist</span>
        </Link>

        <button
          onClick={handleLogout}
          className={`flex items-center space-x-2 ${
            location.pathname === "/logout"
              ? "text-orange-500"
              : "hover:text-gray-300"
          }`}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default ProfileSideBar;
