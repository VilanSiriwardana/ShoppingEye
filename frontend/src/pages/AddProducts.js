import React from "react";
import SidebarIcon from "../components/sidebar/SidebarIcon"; // Corrected path to SidebarIcon
import "../components/sidebar/styles.css";
import ProductsForm from "../components/forms/ProductsForm";

export default function Products() {
  return (
    <>
      <SidebarIcon />  
      <div className="main">
        <h2 className="heading">Add products form</h2>
        <ProductsForm /> 
      </div>
    </>
  );
}
