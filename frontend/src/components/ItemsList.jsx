import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Header from "./Header";

const ItemsList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [wishlist, setWishlist] = useState([]); // Wishlist state
  const currentUserId = localStorage.getItem("userId");

  // Fetch items and initialize wishlist
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3050/api/items");
        if (!response.ok) throw new Error("Failed to fetch items");
        const data = await response.json();
        setItems(data);

        // Load wishlist from the server or localStorage
        const savedWishlist =
          JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(savedWishlist);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [selectedCategory, items, minPrice, maxPrice, selectedLocation]);

  const filterItems = () => {
    let result = items;

    // Filter by category
    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter((item) =>
        item.category.includes(selectedCategory)
      );
    }

    // Filter by price range
    if (minPrice)
      result = result.filter((item) => item.price >= parseFloat(minPrice));
    if (maxPrice)
      result = result.filter((item) => item.price <= parseFloat(maxPrice));

    // Filter by location
    if (selectedLocation && selectedLocation !== "All") {
      result = result.filter((item) => {
        const firstDigit = String(item.shopLocation).charAt(1);
        return firstDigit === selectedLocation;
      });
    }

    setFilteredItems(result);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (e) => {
    if (e.target.name === "minPrice") {
      setMinPrice(e.target.value);
    } else {
      setMaxPrice(e.target.value);
    }
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleItemClick = (id) => {
    navigate(`/items/${id}`);
  };

  const handleWishlistToggle = async (item) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    let updatedWishlist;
    if (isInWishlist(item)) {
      // Remove the item if it's already in the wishlist
      updatedWishlist = wishlist.filter(
        (wishItem) => wishItem._id !== item._id
      );
    } else {
      // Add the item to the wishlist
      updatedWishlist = [...wishlist, item];
    }

    setWishlist(updatedWishlist);
    // Update localStorage immediately after modifying the wishlist
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    // Send the update to the server
    try {
      await axios.post(
        "http://localhost:3050/api/wishlist",
        {
          userId: userId,
          itemIds: updatedWishlist.map((wishItem) => wishItem._id)
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      // Save updated wishlist to localStorage
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      console.log("Wishlist updated successfully");
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  // Check if the item is already in the wishlist
  const isInWishlist = (item) => {
    return wishlist.some((wishItem) => wishItem._id === item._id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col">
      {/* Header Component */}
      <Header />
      <div className="flex">
        {/* Left Sidebar Filter Options */}
        <div className="w-1/6 pl-16 pt-10 border-r">
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
              {/* Unique categories */}
              {[...new Set(items.map((item) => item.category))].map(
                (category) => (
                  <li key={category}>
                    <button
                      className={`block mb-2 ${
                        selectedCategory === category ? "text-orange-500" : ""
                      }`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Price Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Price</h3>
            <div className="mb-2">
              <input
                type="number"
                name="minPrice"
                value={minPrice}
                onChange={handlePriceChange}
                placeholder="Min Price"
                className="w-50 border p-2 mr-2 mb-5"
              />
              <input
                type="number"
                name="maxPrice"
                value={maxPrice}
                onChange={handlePriceChange}
                placeholder="Max Price"
                className="w-50 border p-2"
              />
            </div>
          </div>

          {/* Location Filter */}
          <div className="mb-6 w-50">
            <h3 className="font-semibold mb-2">Location</h3>
            <select
              id="location"
              value={selectedLocation}
              onChange={handleLocationChange}
              className="w-20 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="All">All</option>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
            </select>
          </div>
        </div>

        {/* Right Side - Items List */}
        <div className="w-3/4 p-6">
          <h1 className="text-2xl font-semibold mb-4">Items</h1>
          <div className="bg-white p-6 rounded shadow-sm mb-6">
            <div className="grid grid-cols-1 gap-6">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-gray-100 p-4 rounded shadow-sm flex items-start justify-between relative"
                  >
                    {/* Image on the left */}
                    <div className="w-1/4">
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-48 h-48 object-cover rounded cursor-pointer"
                        onClick={() => handleItemClick(item._id)}
                      />
                    </div>

                    {/* Item details on the right */}
                    <div className="w-2/3 ml-4 flex flex-col">
                      <h3
                        className="text-lg font-semibold mt-2 cursor-pointer"
                        onClick={() => handleItemClick(item._id)}
                      >
                        {item.productName}
                      </h3>
                      <p className="text-gray-700">Category: {item.category}</p>
                      <p className="text-gray-700">Price: ${item.price}</p>
                      <p className="text-gray-700">Size: {item.size}</p>
                      <p className="text-gray-700">
                        Location: {item.shopLocation}
                      </p>

                      {/* Render heart icon only if the item is not in the wishlist */}
                      {!isInWishlist(item) && (
                        <button
                          onClick={() => handleWishlistToggle(item)}
                          className="absolute top-2 right-2 text-red-500"
                        >
                          <FontAwesomeIcon icon={faHeart} />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No items found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsList;
