import React, { useEffect, useState } from "react";
import SidebarIcon from "../components/sidebar/SidebarIcon";
import PopularItemView from "../components/ProductCardView/PopularItemView"; // Import ItemView component
import "../components/sidebar/styles.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    setEmail(localStorage.getItem("userEmail") || "");
    setShopName(localStorage.getItem("shopName") || "");
    setOwnerName(localStorage.getItem("ownerName") || "");
    setLocation(localStorage.getItem("location") || "");
    setPhone(localStorage.getItem("phone") || "");

    // Fetch products based on shop name
    fetchProducts(localStorage.getItem("shopName") || "");

    // Fetch wishlist items based on user email (assuming you use email as userId)
    fetchWishlist(localStorage.getItem("userEmail") || "");
  }, []);

  const fetchProducts = async (shopName) => {
    try {
      const response = await fetch("http://localhost:3050/api/items");
      const data = await response.json();

      // Filter products based on shopName
      const filteredProducts = data.filter(
        (product) => product.shopName === shopName
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchWishlist = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3050/api/wishlist/${userId}`
      );
      const data = await response.json();
      setWishlistItems(data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3050/api/items/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== id));
        alert("Product deleted successfully");
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (product) => {
    // Implement edit functionality or navigation to edit page
  };

  const handleWishlist = async (product) => {
    try {
      const userId = localStorage.getItem("userEmail"); // Assuming userId is stored as email
      const response = await fetch("http://localhost:3050/api/wishlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, itemId: product._id })
      });

      if (response.ok) {
        alert("Item added to wishlist");
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  return (
    <>
      <SidebarIcon />
      <div className="main">
        <h2 className="heading">Popular Products!</h2>
        <br></br>
        <br></br>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <PopularItemView
                key={product._id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onWishlist={handleWishlist}
              />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </>
  );
}
