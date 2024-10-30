import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShopUpdateForm = ({ shopId, onClose }) => {
  const [shopData, setShopData] = useState({
    shopName: '',
    shopLogo: ''
  });
  const [newLogo, setNewLogo] = useState('');

  useEffect(() => {
    // Fetch existing shop data
    const fetchShopData = async () => {
      try {
        const response = await axios.get(`/api/shops/${shopId}`);
        setShopData(response.data);
      } catch (error) {
        console.error('Error fetching shop data', error);
      }
    };

    fetchShopData();
  }, [shopId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'your_upload_preset');
  
      axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData)
        .then(response => {
          setNewLogo(response.data.secure_url);
        })
        .catch(error => {
          console.error('Error uploading image', error);
        });
    }
  };
  
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/api/shops/${shopId}`, {
        ...shopData,
        shopLogo: newLogo || shopData.shopLogo
      });
      onClose(); // Close the form after successful update
    } catch (error) {
      console.error('Error updating shop data', error);
    }
  };
  

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        value={shopData.shopName}
        onChange={(e) => setShopData({ ...shopData, shopName: e.target.value })}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {newLogo && <img src={newLogo} alt="Preview" width="100" />}
      <button type="submit">Update</button>
    </form>
  );
};

export default ShopUpdateForm;
