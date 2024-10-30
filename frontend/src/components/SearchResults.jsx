import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [wishlist, setWishlist] = useState([]); // Wishlist state
  const query = new URLSearchParams(location.search).get("query");

  // Fetch search results and initialize wishlist from localStorage
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3050/api/search?query=${query}`
        );
        setResults(response.data);
        setFilteredResults(response.data); // Initialize filteredResults with all items

        // Load wishlist from localStorage if available
        const savedWishlist =
          JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(savedWishlist);
      } catch (err) {
        setError("Error fetching search results");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  // Check if the item is in the wishlist
  const isInWishlist = (item) => {
    return wishlist.some((wishItem) => wishItem._id === item._id);
  };

  const handleItemClick = (id) => {
    navigate(`/items/${id}`); // Navigate to item details
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex">
      {/* Left Sidebar Filter Options (optional) */}
      <div className="w-1/6 pl-16 pt-10 border-r">
        {/* <h3 className="font-semibold mb-2">Search Results</h3> */}
      </div>

      {/* Right Side - Items List */}
      <div className="w-3/4 p-6">
        <h1 className="text-2xl font-semibold mb-4">
          Search Results for: {query}
        </h1>
        <div className="bg-white p-6 rounded shadow-sm mb-6">
          <div className="grid grid-cols-1 gap-6">
            {filteredResults.length > 0 ? (
              filteredResults.map((item) => (
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
              <p>No results found for your search.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
