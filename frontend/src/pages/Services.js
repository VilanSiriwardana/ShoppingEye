import React from "react";
import SidebarIcon from "../components/sidebar/SidebarIcon"; // Corrected path to SidebarIcon
import Header from "../components/header/Header";
import "../components/sidebar/styles.css";

export default function Services() {
  return (
    <>
      <SidebarIcon />  {/* Include the sidebar */}
      <div className="main">
      <Header /> {/* Include the header */}
        <h2>Services</h2>
        <p>Here are the services we offer:</p>
        <ul>
          <li>Web Development</li>
          <li>Mobile App Development</li>
          <li>SEO Optimization</li>
          <li>Cloud Services</li>
        </ul>
      </div>
    </>
  );
}
