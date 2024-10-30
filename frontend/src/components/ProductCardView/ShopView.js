import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../sidebar/styles.css';
import Heart from '../../images/heart.png';
import EditIcon from '../../images/edit.png';
import DeleteIcon from '../../images/bin.png';
import EyeIcon from '../../images/eye.png';

function ShopView({ shop, onEdit, onDelete, onWishlist }) {
  const navigate = useNavigate();

  const handleViewShop = (shop) => {
    navigate(`/shop/${shop._id}`);
  };

  return (
    <div className="shop-card">
      {onWishlist && (
        <div className="heart-icon-container">
          <button className="icon-button" onClick={() => onWishlist(shop)}>
            <img src={Heart} alt="Wishlist" className="wishlist-icon" />
          </button>
        </div>
      )}
      {shop.shopLogo && (
        <img
          src={shop.shopLogo}
          alt={shop.shopName}
          className="shop-image"
        />
      )}
      <h3>{shop.shopName}</h3>
      <p>
        Owner: {shop.ownerName}
        <br />
        Shop Category: {shop.shopCategory}
        <br />
        Email: {shop.email}
        <br />
        Location: {shop.location}
        <br />
        Phone: {shop.phone}
        <br />
      </p>
      <div className="button-group">
        {onEdit && (
          <button className="icon-button" onClick={() => onEdit(shop)}>
            <img src={EditIcon} alt="Edit" className="icon" />
          </button>
        )}
        {onDelete && (
          <button className="icon-button" onClick={() => onDelete(shop._id)}>
            <img src={DeleteIcon} alt="Delete" className="icon" />
          </button>
        )}
        <button className="icon-button" onClick={() => handleViewShop(shop)}>
          <img src={EyeIcon} alt="View Details" className="wishlist-icon" />
        </button>
      </div>
    </div>
  );
}

ShopView.propTypes = {
  shop: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onWishlist: PropTypes.func,
};

export default ShopView;
