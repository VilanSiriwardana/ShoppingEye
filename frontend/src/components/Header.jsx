import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import QRgif from "../images/qrcode.gif";

const Header = ({ searchQuery, setSearchQuery }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Only navigate if searchQuery is not empty
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <header className="bg-white shadow p-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-4xl font-bold text-gray-800">Shopping EYE</span>
        </div>

        <nav className="hidden md:flex space-x-8 text-gray-800">
          <Link
            to="/home"
            className={`${
              isActive("/home") ? "text-orange-500" : "text-gray-800"
            } hover:text-orange-500`}
          >
            Home
          </Link>
          <Link
            to="/shops"
            className={`${
              isActive("/shops") ? "text-orange-500" : "text-gray-800"
            } hover:text-orange-500`}
          >
            Shops
          </Link>
          <Link
            to="/items"
            className={`${
              isActive("/items") ? "text-orange-500" : "text-gray-800"
            } hover:text-orange-500`}
          >
            Items
          </Link>
          <Link
            to="/about"
            className={`${
              isActive("/about") ? "text-orange-500" : "text-gray-800"
            } hover:text-orange-500`}
          >
            About
          </Link>
        </nav>

        <form onSubmit={handleSearch} className="flex space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search shops and items..."
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white  text-sm font-semibold py-1 px-4 rounded-lg"
          >
            Search
          </button>
          <Link to="/home">
            <img
              src={QRgif} // Replace with your GIF URL
              alt="QR & Location"
              className="rounded-lg cursor-pointer w-7 h-7 mt-2" // Add any additional Tailwind CSS classes as needed
            />
          </Link>
        </form>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <Link to="/profile">
              <button className="bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg">
                Profile
              </button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg">
                  Join now →
                </button>
              </Link>
              {/* className="bg-yellow-800 hover:bg-yellow-600 text-white
              font-semibold py-2 px-6 rounded-lg */}
              <Link to="/shop-login">
                <button className="bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg">
                  Shop Login →
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
