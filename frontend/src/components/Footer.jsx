import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              We are dedicated to bringing you the best shopping experience.
              Explore top-rated shops and exclusive deals through our platform.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
            <li style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "4px" }}>
            <Link to="/home">
                  <a href="#" className="hover:underline">
                    Home
                  </a>
                </Link>
              </li>
              <li style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "4px" }}>
              <Link to="/shops">
                  <a href="#" className="hover:underline">
                    Shop
                  </a>
                </Link>
              </li>
              <li style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "4px" }}>
              <Link to="/wishlist">
                  <a href="#" className="hover:underline">
                    Wishlist
                  </a>
                </Link>
              </li>
              <li style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "4px" }}>
              <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-8">
          &copy; {new Date().getFullYear()} Shopping Eye. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
