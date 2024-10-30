import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai"; // Import the filled red heart icon
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import ProfileSideBar from "./ProfileSideBar";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";

const ViewWishList = () => {
  const navigate = useNavigate();
  const [itemsDetails, setItemsDetails] = useState([]); // State to hold fetched item details
  const [error, setError] = useState(null); // State to hold any error messages
  const currentUserId = localStorage.getItem("userId"); // Retrieve the current user's ID from localStorage

  const handleItemClick = (id) => {
    navigate(`/items/${id}`); // Navigate to item details
  };
  const fetchWishlist = async () => {
    if (!currentUserId) {
      setError("User ID not found. Please log in.");
      return;
    }

    try {
      // Fetch the wishlist for the current user
      const response = await axios.get(
        `http://localhost:3050/api/wishlist/${currentUserId}`
      );

      console.log("Wishlist response:", response.data);

      // Assuming the response contains an array of wishlists, get the first one that matches the user ID
      const userWishlist = response.data.find(
        (wishlist) => wishlist.userId === currentUserId
      );

      if (userWishlist) {
        // Extract item IDs from the user's wishlist
        const itemIds = userWishlist.items;

        // Fetch item details using the extracted item IDs
        fetchItemsDetails(itemIds);
      } else {
        setError("No wishlist found for this user.");
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setError("Failed to fetch wishlist items."); // Set error message
    }
  };

  const convertImageToBase64 = async (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Handle CORS
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const base64 = canvas.toDataURL("image/png");
        resolve(base64);
      };
      img.onerror = (error) => reject(error);
    });
  };

  const fetchItemsDetails = async (itemIds) => {
    if (!itemIds || itemIds.length === 0) {
      setError("No items found in wishlist.");
      return;
    }

    try {
      console.log("Fetching items details for IDs:", itemIds); // Log the IDs
      const response = await axios.post(`http://localhost:3050/api/items`, {
        ids: itemIds
      });
      console.log("Items details response:", response.data);

      // Convert images to Base64
      const itemsWithBase64Images = await Promise.all(
        response.data.map(async (item) => {
          const base64Image = await convertImageToBase64(item.imageUrl);
          return { ...item, base64Image }; // Add base64Image to item
        })
      );

      setItemsDetails(itemsWithBase64Images);
    } catch (error) {
      console.error("Error fetching item details:", error);
      setError("Failed to fetch item details."); // Set error message
    }
  };

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      // Send a DELETE request to the backend to remove the item from the wishlist
      await axios.delete(
        `http://localhost:3050/api/wishlist/${currentUserId}/${itemId}`
      );

      // Update local state to remove the item from the wishlist
      const updatedItems = itemsDetails.filter((item) => item._id !== itemId);
      setItemsDetails(updatedItems);

      // Update localStorage to reflect the current wishlist state
      localStorage.setItem("wishlist", JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      setError("Failed to remove item from wishlist."); // Set error message
    }
  };

  const downloadWishlistPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");

    // Define padding
    const padding = 20;
    const leftPadding = 40; // Additional left padding
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Add title to the PDF with padding
    pdf.setFontSize(12);
    pdf.text("Your Wishlist Report", leftPadding, padding + 30); // Title position with padding
    pdf.setFontSize(12); // Reset font size for item details

    // Draw border around the content
    pdf.setLineWidth(1);
    pdf.rect(
      padding - 10,
      padding - 10,
      pageWidth - padding * 2 + 20,
      pageHeight - padding * 2 + 10
    ); // Draw rectangle for border

    itemsDetails.forEach((item, index) => {
      const itemYPosition = padding + 50 + index * 100; // Calculate Y position with padding

      if (item.base64Image) {
        pdf.addImage(item.base64Image, "PNG", padding, itemYPosition, 80, 80); // Adjust dimensions and positioning as needed
        pdf.text(item.productName, padding + 90, itemYPosition + 20); // Position text accordingly
        pdf.text(
          `Category: ${item.category}`,
          padding + 90,
          itemYPosition + 35
        );
        pdf.text(`Price: $${item.price}`, padding + 90, itemYPosition + 50);
        pdf.text(`Size: ${item.size}`, padding + 90, itemYPosition + 65);
        pdf.text(
          `Location: ${item.itemLocation}`,
          padding + 90,
          itemYPosition + 80
        );
      }
    });

    pdf.save("wishlist.pdf");
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Header Component */}
      <Header />
      <div className="flex">
        <ProfileSideBar />

        {/* Right Side - Wishlist Items */}
        <div className="w-3/4 p-6">
          <h1 className="text-2xl font-semibold mb-4">Your Wishlist</h1>
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={downloadWishlistPDF}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Download Wishlist as PDF
          </button>
          <div className="bg-white p-6 rounded shadow-sm">
            <div className="flex flex-col space-y-4">
              {itemsDetails.length > 0 ? (
                itemsDetails.map((item) => (
                  <div
                    key={item._id}
                    className="border rounded p-4 mb-4 flex items-start"
                  >
                    <img
                      src={item.imageUrl} // Assuming items have imageUrl
                      alt={item.productName} // Change to productName
                      className="w-16 h-16 object-cover rounded mr-4 cursor-pointer"
                      onClick={() => handleItemClick(item._id)}
                    />
                    <div className="flex-grow">
                      <span
                        className="font-semibold cursor-pointer"
                        onClick={() => handleItemClick(item._id)}
                      >
                        {item.productName}
                      </span>{" "}
                      <br />
                      <span className="text-gray-700">
                        Category: {item.category}
                      </span>{" "}
                      <br />
                      <span className="text-gray-700">
                        Price: ${item.price}
                      </span>{" "}
                      <br />
                      <span className="text-gray-700">
                        Size: {item.size}
                      </span>{" "}
                      <br />
                      <span className="text-gray-700">
                        Location: {item.itemLocation}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveFromWishlist(item._id)}
                      className="text-red-500 ml-4"
                    >
                      <AiFillHeart size={24} color="red" />{" "}
                      {/* Filled red heart */}
                    </button>
                  </div>
                ))
              ) : (
                <p>No items found in your wishlist.</p> // Message for empty items array
              )}
            </div>
          </div>
          {/* <button
          onClick={downloadWishlistPDF}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Download Wishlist as PDF
        </button> */}
        </div>
      </div>
    </div>
  );
};

export default ViewWishList;
