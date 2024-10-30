import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SidebarIcon from '../components/sidebar/SidebarIcon';
import ItemView from '../components/ProductCardView/ItemView'; // Import ItemView
import './productDescription.css';

function ProductDescription() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]); // Add state for related products

  useEffect(() => {
    // Fetch product details from the server
    axios.get(`http://localhost:3050/api/items/${id}`)
      .then(response => {
        console.log(response.data); // Check the data structure here
        setProduct(response.data); // Set the product data retrieved from the server

        // Fetch related products based on category or any other criteria
        axios.get(`http://localhost:3050/api/items?category=${response.data.category}`)
          .then(res => {
            setRelatedProducts(res.data.filter(p => p._id !== id)); // Filter out the current product
          })
          .catch(error => {
            console.error("There was an error fetching related products!", error);
          });
      })
      .catch(error => {
        console.error("There was an error fetching the product!", error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SidebarIcon />
      <div className="product-description-container">
        <h2>Product Details</h2>
        <div className="product-details">
          <img src={product.imageUrl} alt={product.productName} className="product-image" />
          <div className="product-info">
            <p><label>Product Name:</label> {product.productName}</p>
            <p><label>Category:</label> {product.category}</p>
            <p className="product-price"><label>Price:</label> ${product.price}</p>
            <p><label>Size:</label> {product.size}</p>
            <p><label>Shop Location:</label> {product.shopLocation}</p>
            <p><label>Item Location:</label> {product.itemLocation}</p>
            <p><label>Description:</label> {product.description}</p>
            <p><label>Tags:</label> {product.tags}</p>

          </div>
        </div>
     
      </div>
    </>
  );
}

// Define placeholder functions for edit, delete, and wishlist actions
const handleEdit = (product) => {
  console.log('Edit product', product);
};

const handleDelete = (productId) => {
  console.log('Delete product', productId);
};

const handleWishlist = (product) => {
  console.log('Add to wishlist', product);
};

export default ProductDescription;
