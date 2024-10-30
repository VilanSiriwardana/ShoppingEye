import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onUpdateField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in both fields.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3050/api/Shopauth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", form.email);
        localStorage.setItem("shopName", data.shopName);
        localStorage.setItem("ownerName", data.ownerName);
        localStorage.setItem("location", data.location);
        localStorage.setItem("phone", data.phone);

        navigate("/shop-home");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login.");
    }
  };

  const onSignup = () => {
    navigate("/signup");
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2 className={styles.heading}>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={onLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email
            </label>
            <input
              id="email"
              className={styles.formField}
              type="email"
              name="email"
              value={form.email}
              onChange={onUpdateField}
              placeholder="Please enter your Email"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Password
            </label>
            <input
              id="password"
              className={styles.formField}
              type="password"
              name="password"
              value={form.password}
              onChange={onUpdateField}
              placeholder="Please enter your password"
              required
            />
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.formSubmitBtn}>
              Login
            </button>
          </div>
        </form>
        <div className={styles.registerLink}>
          <p>
            New shop?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
