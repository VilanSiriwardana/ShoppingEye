import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignupForm.module.css";

const SignupForm = ({ shop, onSuccess = () => {} }) => {
  const [form, setForm] = useState({
    shopName: "",
    ownerName: "",
    shopCategory: "",
    location: "",
    phone: "",
    shopLogo: null,
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const isEditing = Boolean(shop); // Check if we're editing a shop
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing && shop) {
      setForm({
        shopName: shop.shopName || "",
        ownerName: shop.ownerName || "",
        shopCategory: shop.shopCategory || "",
        location: shop.location || "",
        phone: shop.phone || "",
        shopLogo: null,
        email: shop.email || "",
        password: "",
        confirmPassword: ""
      });
      setLogoPreview(shop.shopLogo || "");
    }
  }, [shop, isEditing]);

  const onUpdateField = (e) => {
    const { name, value, files } = e.target;

    if (name === "phone") {
      const phoneValue = value.replace(/\D/g, "");
      if (phoneValue.length <= 10) {
        setForm({ ...form, phone: phoneValue });
      }
    } else {
      setForm({
        ...form,
        [name]: files ? files[0] : value
      });
    }
  };

  const onFileChange = (e) => {
    setForm({
      ...form,
      shopLogo: e.target.files[0]
    });

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (
      !form.shopName ||
      !form.ownerName ||
      !form.shopCategory ||
      !form.location ||
      !form.phone ||
      !form.email
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("shopName", form.shopName);
      formData.append("ownerName", form.ownerName);
      formData.append("shopCategory", form.shopCategory);
      formData.append("location", form.location);
      formData.append("phone", form.phone);
      formData.append("email", form.email);
      if (form.shopLogo) formData.append("shopLogo", form.shopLogo);
      if (!isEditing) {
        formData.append("password", form.password);
      }

      const url = isEditing
        ? `http://localhost:3050/api/shops/${shop._id}`
        : "http://localhost:3050/api/Shopauth/signup";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setError("");
        onSuccess();
        if (!isEditing) {
          navigate("/");
        }
      } else {
        setError(
          data.message ||
            `Failed to ${
              isEditing ? "update" : "create"
            } shop. Please try again.`
        );
      }
    } catch (err) {
      console.error(`Error ${isEditing ? "updating" : "creating"} shop:`, err);
      setError("An error occurred.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className={styles.heading}>
          {isEditing ? "Edit Shop Details" : "Register Shop"}
        </h2>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Shop Name</label>
          <input
            className={styles.formField}
            type="text"
            name="shopName"
            value={form.shopName}
            onChange={onUpdateField}
            placeholder="Enter your shop name"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Owner Name</label>
          <input
            className={styles.formField}
            type="text"
            name="ownerName"
            value={form.ownerName}
            onChange={onUpdateField}
            placeholder="Enter owner's name"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Shop Category</label>
          <input
            className={styles.formField}
            type="text"
            name="shopCategory"
            value={form.shopCategory}
            onChange={onUpdateField}
            placeholder="Enter shop category"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Location</label>
          <input
            className={styles.formField}
            type="text"
            name="location"
            value={form.location}
            onChange={onUpdateField}
            placeholder="Enter location"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Phone</label>
          <input
            className={styles.formField}
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onUpdateField}
            placeholder="Enter phone number"
            pattern="\d{10}"
            maxLength="10"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Shop Logo</label>
          {logoPreview && (
            <img
              src={logoPreview}
              alt="Shop Logo"
              className={styles.imagePreview}
            />
          )}
          <input
            className={styles.formField}
            type="file"
            name="shopLogo"
            onChange={onFileChange}
          />
        </div>

        {!isEditing && (
          <>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email</label>
              <input
                className={styles.formField}
                type="email"
                name="email"
                value={form.email}
                onChange={onUpdateField}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <input
                className={styles.formField}
                type="password"
                name="password"
                value={form.password}
                onChange={onUpdateField}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Confirm Password</label>
              <input
                className={styles.formField}
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={onUpdateField}
                placeholder="Confirm your password"
                required
              />
            </div>
          </>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.formActions}>
          <button type="submit" className={styles.formSubmitBtn}>
            {isEditing ? "Update Shop" : "Sign Up"}
          </button>
        </div>

        {!isEditing && (
          <div className={styles.registerLink}>
            <p>
              Already a shop?{" "}
              <a href="/shop-login" className="text-blue-500 hover:underline">
                Login here
              </a>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
