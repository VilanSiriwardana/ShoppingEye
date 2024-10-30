import React, { useEffect, useState } from 'react';
import SignupForm from '../components/forms/SignupForm'; // Import SignupForm component
import SidebarIcon from '../components/sidebar/SidebarIcon';
import Header from '../components/header/Header';
import '../components/sidebar/styles.css';

export default function SignupDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    shopName: '',
    ownerName: '',
    location: '',
    phone: '',
    shopLogo: '',
    email: '',
  });

  useEffect(() => {
    // Fetch user details from local storage or API
    const fetchUserDetails = () => {
      const storedDetails = {
        shopName: localStorage.getItem('shopName') || '',
        ownerName: localStorage.getItem('ownerName') || '',
        location: localStorage.getItem('location') || '',
        phone: localStorage.getItem('phone') || '',
        shopLogo: localStorage.getItem('shopLogo') || '',
        email: localStorage.getItem('userEmail') || '',
      };

      setForm(storedDetails);
    };

    fetchUserDetails();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      <SidebarIcon />
      <div className="main">
        <Header />
        <h2>Signup Details</h2>
        {isEditing ? (
          <div>
            <h3>Edit Signup Details</h3>
            <SignupForm
              initialValues={form}
              onCancel={handleCancel}
            />
          </div>
        ) : (
          <div className="signup-details">
            <p><strong>Shop Name:</strong> {form.shopName}</p>
            <p><strong>Owner Name:</strong> {form.ownerName}</p>
            <p><strong>Location:</strong> {form.location}</p>
            <p><strong>Phone:</strong> {form.phone}</p>
            <p><strong>Email:</strong> {form.email}</p>
            {form.shopLogo && <img src={form.shopLogo} alt="Shop Logo" className="shop-logo" />}
            <button onClick={handleEdit} className="edit-button">Edit</button>
          </div>
        )}
      </div>
    </>
  );
}