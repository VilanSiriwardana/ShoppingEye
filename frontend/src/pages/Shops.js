import React, { useEffect, useState } from 'react';
import SignupForm from '../components/forms/SignupForm';
import SidebarIcon from '../components/sidebar/SidebarIcon';
import "./shopstyles.css";

export default function Shops() {
  const [shop, setShop] = useState(null); // To store logged-in shop details
  const [editingShop, setEditingShop] = useState(null);

  useEffect(() => {
    const loggedInShopEmail = localStorage.getItem('userEmail'); // Get the logged-in shop's email from local storage
    if (loggedInShopEmail) {
      fetchShopDetails(loggedInShopEmail); // Fetch shop details by email or other unique identifier
    }
  }, []);

  const fetchShopDetails = async (email) => {
    try {
      const response = await fetch(`http://localhost:3050/api/getShops?email=${email}`); // Adjust API call to fetch based on email
      const data = await response.json();
      if (response.ok) {
        setShop(data);
        // Update local storage with shop details
        localStorage.setItem("shopName", data.shopName);
        localStorage.setItem("shopLogo", data.shopLogo);
      } else {
        console.error('Error fetching shop:', data.message);
      }
    } catch (error) {
      console.error('Error fetching shop:', error);
    }
  };

  const handleEdit = (shop) => {
    setEditingShop(shop);
  };

  const handleCancelEdit = () => {
    setEditingShop(null);
  };

  return (
    <>
      <SidebarIcon />
      <div className="shop">
        {editingShop ? (
          <SignupForm
            shop={editingShop}
            onSuccess={() => {
              setEditingShop(null);
              fetchShopDetails(localStorage.getItem('userEmail')); // Refresh after editing
            }}
            onCancel={handleCancelEdit}
          />
        ) : (
          <div className="shop-form-container">
            {shop ? (
              <form className="shop-form">
                <h3 className="form-title">Shop Profile</h3>
                {shop.shopLogo && (
                  <div className="shop-logo-container">
                    <img
                      src={shop.shopLogo}
                      alt={shop.shopName}
                      className="shop-image"
                    />
                  </div>
                )}<br></br><br></br>
                <div className="form-fields">
                  <div className="form-group">
                    <label>Shop Name</label>
                    <input type="text" value={shop.shopName} readOnly />
                  </div>

                  <div className="form-group">
                    <label>Owner</label>
                    <input type="text" value={shop.ownerName} readOnly />
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <input type="text" value={shop.shopCategory} readOnly />
                  </div>

                  <div className="form-group">
                    <label>Location</label>
                    <input type="text" value={shop.location} readOnly />
                  </div>

                  <div className="form-group">
                    <label>Phone</label>
                    <input type="text" value={shop.phone} readOnly />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={shop.email} readOnly />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => handleEdit(shop)}
                  >
                    Edit
                  </button>
                </div>

                
              </form>
            ) : (
              <p>No shop available for the logged-in user.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
