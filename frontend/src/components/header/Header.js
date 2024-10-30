import React from "react";
import "./headerStyles.css";
import notificationIcon from "../../images/notification.png"; // Import the image
import sidebarIcon from "../../images/list.png"; // Import the image

export default function Header({ toggleSidebar }) {
  return (
    <div className="header">
      <div className="icons">
        <img 
          src={sidebarIcon} 
          alt="Sidebar" 
          className="sidebar-icon" 
          onClick={toggleSidebar} // Trigger sidebar toggle on click
        />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="icons">
        <img src={notificationIcon} alt="Notification" className="notification-icon" />
      </div>
    </div>
  );
}
