import React, { useEffect, useState } from 'react';
import styles from './ProductsForm.module.css';

const ProductsForm = ({ product, onSuccess = () => {}, onCancel = () => {} }) => {
  const [form, setForm] = useState({
    shopName: '',
    productName: '',
    category: '',
    price: '',
    size: '',
    shopLocation: '',
    itemLocation: '',
    description: '',  // Add description state
    image: null  // Add image state
  });
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');  // For displaying image preview
  const isEditing = Boolean(product);

  useEffect(() => {
    if (isEditing && product) {
      setForm({
        shopName: product.shopName || '',
        productName: product.productName || '',
        category: product.category || '',
        tags: product.tags || '',
        price: product.price || '',
        size: product.size || '',
        shopLocation: product.shopLocation || '',
        itemLocation: product.itemLocation || '',
        description: product.description || '',  // Set description
        image: null  // Clear image state
      });
      setImagePreview(product.imageUrl || '');  // Set image preview
    }
  }, [product, isEditing]);

  const onUpdateField = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onFileChange = (e) => {
    setForm({
      ...form,
      image: e.target.files[0]  // Handle image file
    });

    // Set image preview
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.shopName || !form.productName || !form.category || !form.tags || !form.price || !form.size || !form.shopLocation || !form.itemLocation) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const url = isEditing
        ? `http://localhost:3050/api/items/${product._id}`
        : 'http://localhost:3050/api/items/add';
      const method = isEditing ? 'PUT' : 'POST';
      
      const formData = new FormData();
      formData.append('shopName', form.shopName);
      formData.append('productName', form.productName);
      formData.append('category', form.category);
      formData.append('tags', form.tags);
      formData.append('price', form.price);
      formData.append('size', form.size);
      formData.append('shopLocation', form.shopLocation);
      formData.append('itemLocation', form.itemLocation);
      formData.append('description', form.description);  // Append description
      if (form.image) formData.append('image', form.image);  // Append image if present

      const response = await fetch(url, {
        method,
        body: formData,  // No need to set Content-Type with FormData
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`Item ${isEditing ? 'updated' : 'added'} successfully`);
        setForm({
          shopName: '',
          productName: '',
          category: '',
          tags: '',
          price: '',
          size: '',
          shopLocation: '',
          itemLocation: '',
          description: '',  // Reset description
          image: null  // Reset image
        });
        setImagePreview('');  // Reset image preview
        setError('');
        if (typeof onSuccess === 'function') {
          onSuccess();
        } else {
          console.warn('onSuccess is not a function');
        }
      } else {
        setError(data.message || `Failed to ${isEditing ? 'update' : 'add'} item. Please try again.`);
      }
    } catch (err) {
      console.error(`Error ${isEditing ? 'updating' : 'adding'} item:`, err);
      setError(`An error occurred while ${isEditing ? 'updating' : 'adding'} the item.`);
    }
  };
  

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className={styles.heading}>{isEditing ? 'Edit Product' : 'Add Product'}</h2>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Shop Name</label>
          <input
            className={styles.formField}
            type="text"
            name="shopName"
            value={form.shopName}
            onChange={onUpdateField}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Product Name</label>
          <input
            className={styles.formField}
            type="text"
            name="productName"
            value={form.productName}
            onChange={onUpdateField}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Category</label>
          <input
            className={styles.formField}
            type="text"
            name="category"
            value={form.category}
            onChange={onUpdateField}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Tags</label>
          <input
            className={styles.formField}
            type="text"
            name="tags"
            value={form.tags}
            onChange={onUpdateField}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Price</label>
          <input
            className={styles.formField}
            type="number"
            name="price"
            value={form.price}
            onChange={onUpdateField}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Size</label>
          <input
            className={styles.formField}
            type="text"
            name="size"
            value={form.size}
            onChange={onUpdateField}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Shop Location</label>
          <input
            className={styles.formField}
            type="text"
            name="shopLocation"
            value={form.shopLocation}
            onChange={onUpdateField}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Item Location</label>
          <input
            className={styles.formField}
            type="text"
            name="itemLocation"
            value={form.itemLocation}
            onChange={onUpdateField}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Description</label>
          <textarea
            className={styles.formField}
            name="description"
            value={form.description}
            onChange={onUpdateField}
            rows="4"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Image</label>
          {imagePreview && (
            <div className={styles.imagePreview}>
         <img src={imagePreview} alt="" className='shop-image' />
        </div>
          )}
          <input
            className={styles.formField}
            type="file"
            name="image"
            onChange={onFileChange}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.formActions}>
          <button type="submit" className={styles.formSubmitBtn}>{isEditing ? 'Update Item' : 'Add Item'}</button>
          <button type="button" onClick={onCancel} className={styles.formSubmitBtn}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ProductsForm;
