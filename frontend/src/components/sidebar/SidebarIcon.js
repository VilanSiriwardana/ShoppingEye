import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";
import dashboardIcon from "../../images/dashboard.png";
import itemsIcon from "../../images/items.png";
import analyticsIcon from "../../images/analytics.png";
import feedbackIcon from "../../images/feedback.png";
import profileIcon from "../../images/profile.png";
import logoutIcon from "../../images/logout.png";

export default function SidebarIcon() {
  const [shopName, setShopName] = useState("");
  const [shopLogo, setShopLogo] = useState(""); // State to store the shop logo

  useEffect(() => {
    const storedShopName = localStorage.getItem("shopName");
    const storedShopLogo = localStorage.getItem("shopLogo"); // Retrieve the logo URL

    if (storedShopName) {
      setShopName(storedShopName);
    }

    if (storedShopLogo) {
      setShopLogo(storedShopLogo);
    }
  }, []); // Dependency array is empty to run only on mount

  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="box-above-dashboard">
        {shopLogo ? (
          <img src={shopLogo} alt="Shop Logo" className="shop-logo" />
        ) : (
          <img src={dashboardIcon} alt="Default Logo" className="shop-logo" />
        )}
        {/* <span className="shop-name">{shopName}</span> */}
      </div>
      <Link
        to="/shop-home"
        className={location.pathname === "/home" ? "active" : ""}
      >
        <img src={dashboardIcon} alt="Dashboard" className="sidebar-icon" />
        Dashboard
      </Link>
      <Link
        to="/shop-profile"
        className={location.pathname === "/shops" ? "active" : ""}
      >
        <img src={profileIcon} alt="Profile" className="sidebar-icon" />
        Profile
      </Link>
      <Link
        to="/products"
        className={location.pathname === "/products" ? "active" : ""}
      >
        <img src={itemsIcon} alt="Products" className="sidebar-icon" />
        Products
      </Link>
      <Link
        to="/analytics"
        className={location.pathname === "/analytics" ? "active" : ""}
      >
        <img src={analyticsIcon} alt="Analytics" className="sidebar-icon" />
        Analytics
      </Link>
      <Link
        to="/feedback"
        className={location.pathname === "/feedback" ? "active" : ""}
      >
        <img src={feedbackIcon} alt="Feedback" className="sidebar-icon" />
        Feedback
      </Link>

      {/* Spacer added here */}
      <div className="sidebar-spacer"></div>
      <Link
        to="/shop-login"
        className={location.pathname === "/logout" ? "active" : ""}
      >
        <img src={logoutIcon} alt="Logout" className="sidebar-icon" />
        Logout
      </Link>
    </div>
  );
}
