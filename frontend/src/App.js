// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/forms/Loginform.js";
import SignupForm from "./components/forms/SignupForm.js";
import FeedbackPage from "./components/FeedbackPage.js";
import Home from "./pages/Home.js";
import Logout from "./pages/Logout.js";
import Services from "./pages/Services.js";
import Products from "./pages/Products.js";
import Shops from "./pages/Shops.js";
import AddProducts from "./pages/AddProducts.js";
import ProductDescription from "./pages/ProductDescription.js";
import SignupDetails from "./pages/SignupDetails";
import { AuthContextProvider } from "./context/AuthContext.js";
import { ProductProvider } from "./pages/ProductContext.js"; // Import the ProductProvider
import AnalyticsPage from "./pages/AnalyticsPage.js";

//tiny
// import React, { useState } from "react";
import {
  BrowserRouter as Router,
  // Route,
  // Routes,
  Navigate
} from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProfilePage from "./components/ProfilePage";
import UpdateProfilePage from "./components/UpdateProfilePage";
import ChangePasswordPage from "./components/ChangePasswordPage";
import ShopsListPage from "./components/ShopsList";
import ShopProfilePage from "./components/ShopProfilePage";
import ItemsListPage from "./components/ItemsList";
import ItemPage from "./components/ItemPage";
import SearchResults from "./components/SearchResults";
import ViewWishList from "./components/ViewWishList";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";

// yasiru

import ShopQR from "./pages/shopQR.jsx";
import Map from "./pages/map.jsx";
import ScanQR from "./pages/scanQR.jsx";
import Locations from "./pages/locations.jsx";

// Vilan

import AddMeasurements from './pages/Recommendations/AddMeasurements.jsx';
import ListMeasurements from './pages/Recommendations/ListMeasurements.jsx';
import MyRecommendations from './pages/Recommendations/MyRecommendations.jsx';
import BodyTypeForm from './pages/Recommendations/BodyTypeForm.jsx';
import ListBodyTypes from './pages/Recommendations/ListBodyTypes.jsx';
import TestPage from './pages/Recommendations/TestPage.jsx';

function App() {

  return (

      <Router>
        <AuthProvider>

                  {/* <Header /> */}
        <Routes>
          {/* <Route path="/" element={<Navigate to="/home" />} /> */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/profile"
            element={<ProtectedRoute element={ProfilePage} />}
          />
          <Route
            path="/update-profile"
            element={<ProtectedRoute element={UpdateProfilePage} />}
          />
          <Route
            path="/change-password"
            element={<ProtectedRoute element={ChangePasswordPage} />}
          />
          <Route path="/shops" element={<ShopsListPage />} />
          <Route path="/shops/:id" element={<ShopProfilePage />} />
          <Route path="/items" element={<ItemsListPage />} />
          <Route path="/items/:id" element={<ItemPage />} />
          <Route path="/wishlist" element={<ViewWishList />} />
          <Route path="/search" element={<SearchResults />} />

          {/* yasiru */}

          <Route path='/qr' element={<ShopQR />} />
          <Route path='/map' element={<Map />} />
          <Route path='/scanqr' element={<ScanQR />} />
          <Route path='/locations/:locationId' element={<Locations />} />
          <Route path='/locations/' element={<Locations />} />

          {/* Vilan */}
          <Route path="/addMeasurements" element={<AddMeasurements />} />
          <Route path="/listMeasurements" element={<ListMeasurements />} />
          <Route path="/myRecommendations/:measurementsId" element={<MyRecommendations />} />
          <Route path="/myRecommendations" element={<MyRecommendations />} />
          <Route path='/updateMyMeasurements/:measurementsId' element={<AddMeasurements />} />
          <Route path='/bodyTypeForm' element={<BodyTypeForm />} />
          <Route path='/updateBodyType/:bodyTypesId' element={<BodyTypeForm />} />
          <Route path='/listBodyTypes' element={<ListBodyTypes />} />
          {/* <Route path='/myRecommendations/:measurementsId' element={<TestPage />} /> */}

        </Routes>

        </AuthProvider>

              {/* Second Project with its own AuthContextProvider and ProductProvider */}
      <AuthContextProvider>
        <ProductProvider>
          <Routes>
            <Route path="/shop-login" element={<LoginForm />} />
            <Route path="/services" element={<Services />} />
            <Route path="/shop-home" element={<Home />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/products" element={<Products />} />
            <Route path="/shop-profile" element={<Shops />} />
            <Route path="/addproducts" element={<AddProducts />} />
            <Route path="/product/:id" element={<ProductDescription />} />
            <Route path="/shop-signup" element={<SignupDetails />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </ProductProvider>
      </AuthContextProvider>
      </Router>


    
  );
}

export default App;
