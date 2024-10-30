import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const ShopsListPage = () => {
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch("http://localhost:3050/api/shops");
        const data = await response.json();
        setShops(data);
        setFilteredShops(data); // Initialize filteredShops with all shops
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    fetchShops();
  }, []);

  useEffect(() => {
    filterShops();
  }, [selectedCategory, selectedLocation, searchQuery, shops]);

  const filterShops = () => {
    let result = shops;

    // Filter by category
    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter((shop) => shop.shopCategory === selectedCategory);
    }

    // Filter by location (first digit of the location number)
    if (selectedLocation && selectedLocation !== "All") {
      result = result.filter((shop) => {
        const firstDigit = String(shop.location).charAt(1);
        return firstDigit === selectedLocation;
      });
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter((shop) =>
        shop.shopName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredShops(result);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterShops();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleShopClick = (id) => {
    navigate(`/shops/${id}`); // Navigate to the shop profile page
  };

  return (
    <div className="flex flex-col">
      {/* Header Component */}
      <Header />

      <div className="flex">
        {/* Left Sidebar Filter Options */}
        <div className="w-1/6 pl-16 pt-10 border-r">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Category</h3>
            <ul>
              <li>
                <button
                  className={`block mb-2 ${
                    selectedCategory === "All" ? "text-orange-500" : ""
                  }`}
                  onClick={() => handleCategoryChange("All")}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  className={`block mb-2 ${
                    selectedCategory === "SkinCare" ? "text-orange-500" : ""
                  }`}
                  onClick={() => handleCategoryChange("SkinCare")}
                >
                  SkinCare
                </button>
              </li>
              <li>
                <button
                  className={`block mb-2 ${
                    selectedCategory === "Clothing" ? "text-orange-500" : ""
                  }`}
                  onClick={() => handleCategoryChange("Clothing")}
                >
                  Clothing
                </button>
              </li>
              <li>
                <button
                  className={`block mb-2 ${
                    selectedCategory === "Footwear" ? "text-orange-500" : ""
                  }`}
                  onClick={() => handleCategoryChange("Footwear")}
                >
                  Footwear
                </button>
              </li>
              <li>
                <button
                  className={`block mb-2 ${
                    selectedCategory === "Stationary" ? "text-orange-500" : ""
                  }`}
                  onClick={() => handleCategoryChange("Stationary")}
                >
                  Stationary
                </button>
              </li>
              {/* Add more categories here if needed */}
            </ul>
          </div>
          {/* Location Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Location</h3>
            <select
              id="location"
              value={selectedLocation}
              onChange={handleLocationChange}
              className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="All">All</option>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
              {/* Add more levels as needed */}
            </select>
          </div>
        </div>

        {/* Right Side - Shops List */}
        <div className="w-3/4 p-6">
          <h1 className="text-3xl font-bold mb-6">All Shops</h1>
          {/* Search Bar */}

          <form onSubmit={handleSearch} className="mb-6 flex space-x-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shops..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Search
            </button>
          </form>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map((shop) => (
              <li
                key={shop._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleShopClick(shop._id)} // Add click handler
              >
                <div className="flex items-center mb-4">
                  {/* Display the shop logo */}
                  {shop.shopLogo && (
                    <img
                      src={shop.shopLogo}
                      alt={`${shop.shopName} logo`}
                      className="w-24 h-24 object-cover rounded-full mr-4"
                    />
                  )}
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">
                      {shop.shopName}
                    </h2>
                    <p className="text-gray-700">Location: {shop.location}</p>
                    <p className="text-gray-700">
                      Category: {shop.shopCategory}
                    </p>
                    <p className="text-gray-700">Phone: {shop.phone}</p>
                    <p className="text-gray-700">Email: {shop.email}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    // <div className="flex ">
    //   {/* <Header /> */}
    //   {/* Left Sidebar Filter Options */}
    //   <div className="w-1/6 pl-16 pt-10 border-r">
    //     <Header />
    //     <h2 className="text-xl font-bold mb-4">Filters</h2>
    //     {/* Category Filter */}
    //     <div className="mb-6">
    //       <h3 className="font-semibold mb-2">Category</h3>
    //       <ul>
    //         <li>
    //           <button
    //             className={`block mb-2 ${
    //               selectedCategory === "All" ? "text-orange-500" : ""
    //             }`}
    //             onClick={() => handleCategoryChange("All")}
    //           >
    //             All
    //           </button>
    //         </li>
    //         <li>
    //           <button
    //             className={`block mb-2 ${
    //               selectedCategory === "SkinCare" ? "text-orange-500" : ""
    //             }`}
    //             onClick={() => handleCategoryChange("SkinCare")}
    //           >
    //             SkinCare
    //           </button>
    //         </li>
    //         <li>
    //           <button
    //             className={`block mb-2 ${
    //               selectedCategory === "Clothing" ? "text-orange-500" : ""
    //             }`}
    //             onClick={() => handleCategoryChange("Clothing")}
    //           >
    //             Clothing
    //           </button>
    //         </li>
    //         <li>
    //           <button
    //             className={`block mb-2 ${
    //               selectedCategory === "Footwear" ? "text-orange-500" : ""
    //             }`}
    //             onClick={() => handleCategoryChange("Footwear")}
    //           >
    //             Footwear
    //           </button>
    //         </li>
    //         <li>
    //           <button
    //             className={`block mb-2 ${
    //               selectedCategory === "Stationary" ? "text-orange-500" : ""
    //             }`}
    //             onClick={() => handleCategoryChange("Stationary")}
    //           >
    //             Stationary
    //           </button>
    //         </li>
    //         {/* Add more categories here */}
    //       </ul>
    //     </div>
    //     {/* Location Filter */}
    //     <div className="mb-6">
    //       <h3 className="font-semibold mb-2">Location</h3>
    //       <select
    //         id="location"
    //         value={selectedLocation}
    //         onChange={handleLocationChange}
    //         style={{ width: "100px" }} // Custom width
    //         className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    //       >
    //         <option value="All">All</option>
    //         <option value="1">Level 1</option>
    //         <option value="2">Level 2</option>
    //         <option value="3">Level 3</option>
    //         {/* Add more levels as needed */}
    //       </select>
    //     </div>
    //   </div>

    //   {/* Right Side - Shops List */}
    //   <div className="w-3/4 p-6">
    //     <h1 className="text-3xl font-bold mb-6">All Shops</h1>

    //     {/* Search Bar */}
    //     {/* <form onSubmit={handleSearch} className="mb-6 flex space-x-4 ">
    //       <input
    //         type="text"
    //         value={searchQuery}
    //         onChange={(e) => setSearchQuery(e.target.value)}
    //         placeholder="Search shops..."
    //         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    //       />
    //       <button
    //         type="submit"
    //         className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    //       >
    //         Search
    //       </button>
    //     </form> */}

    //     <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //       {filteredShops.map((shop) => (
    //         <li
    //           key={shop._id}
    //           className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
    //           onClick={() => handleShopClick(shop._id)} // Add click handler
    //         >
    //           <div className="flex items-center mb-4">
    //             {/* Display the shop logo */}
    //             {shop.shopLogo && (
    //               <img
    //                 src={shop.shopLogo}
    //                 alt={`${shop.shopName} logo`}
    //                 className="w-24 h-24 object-cover rounded-full mr-4"
    //               />
    //             )}
    //             <div>
    //               <h2 className="text-2xl font-semibold mb-2">
    //                 {shop.shopName}
    //               </h2>
    //               <p className="text-gray-700">Location: {shop.location}</p>
    //               <p className="text-gray-700">Category: {shop.shopCategory}</p>
    //               <p className="text-gray-700">Phone: {shop.phone}</p>
    //               <p className="text-gray-700">Email: {shop.email}</p>
    //             </div>
    //           </div>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
  );
};

export default ShopsListPage;
