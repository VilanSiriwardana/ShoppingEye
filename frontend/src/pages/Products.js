import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import SidebarIcon from '../components/sidebar/SidebarIcon';
import ProductsForm from '../components/forms/ProductsForm';
import ItemView from '../components/ProductCardView/ItemView'; // Import ItemView component
import '../components/sidebar/styles.css';
import { useProductContext } from './ProductContext'; // Import the context hook

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [shopName, setShopName] = useState('');
  
  const { setProductCount } = useProductContext(); // Get the setter function from context

  useEffect(() => {
    // Get shop name from local storage
    const storedShopName = localStorage.getItem('shopName');
    setShopName(storedShopName || '');

    fetchProducts(storedShopName);
  }, []);

  const fetchProducts = async (shopName) => {
    try {
      const response = await fetch('http://localhost:3050/api/items');
      const data = await response.json();
      
      // Filter products based on shopName
      const filteredProducts = data.filter(product => product.shopName === shopName);
      setProducts(filteredProducts);
      setProductCount(filteredProducts.length); // Update product count in context
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3050/api/items/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== id));
        setProductCount(products.length - 1); // Update product count in context
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <>
      <SidebarIcon />
      <div className="main">
        <h2 className='heading'>
          Products
          <Link to="/addproducts">
            <button className="add-button">Add Product</button>
          </Link>
        </h2>
      
        {editingProduct ? (
          <div>
            <ProductsForm
              product={editingProduct}
              onSuccess={() => {
                setEditingProduct(null);
                fetchProducts(shopName); // Refetch products to reflect the updated data
              }}
              onCancel={handleCancelEdit}
            />
          </div>
        ) : (
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <ItemView
                  key={product._id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
