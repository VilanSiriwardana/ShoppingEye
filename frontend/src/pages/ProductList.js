import React, { useEffect, useState } from 'react';
import ItemView from '../components/ProductCardView/ItemView'; // Adjust the path as necessary

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3050/api/items');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    console.log('Edit product:', product);
    // Handle product editing logic here
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3050/api/items/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== id));
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleWishlist = (product) => {
    console.log('Wishlist product:', product);
    // Handle wishlist logic here
  };

  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map((product) => (
          <ItemView
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
  );
}
