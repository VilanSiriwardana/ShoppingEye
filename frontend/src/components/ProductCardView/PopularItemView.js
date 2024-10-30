import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// Import your styles from a separate file
import '../sidebar/styles.css';

function PopularItemView({ product, onEdit, onDelete, onWishlist }) {
  const navigate = useNavigate();

  const handleViewProduct = (product) => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="product-cardd">
    {/* {onWishlist && (
      <div className="heart-icon-container">
        <button className="icon-button" onClick={() => onWishlist(product)}>
          <img src={Heart} alt="Wishlist" className="wishlist-icon" />
        </button>
      </div>
    )} */}
    {product.imageUrl && (
      <img
        src={product.imageUrl}
        alt={product.productName}
        className="product-image"
      />
    )}
    <h3>{product.productName}</h3>
    <p className='itemdetails'>
      Price: ${product.price}
      <br />
      Category: {product.category}
      <br />
      Shop Location: {product.shopLocation}
      <br />
    </p>
    </div>
  );
}

PopularItemView.propTypes = {
  product: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onWishlist: PropTypes.func,
};

export default PopularItemView;
