const multer = require('multer');
const path = require('path');
const Shop = require('../models/Shop.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'); // Add this line
const cloudinary = require('../config/cloudinary');


// Signup Controller
exports.signup = async (req, res) => {
  console.log(req.body);
console.log(req.file);
  const { shopName, ownerName, shopCategory, location, phone, email, password } = req.body;
  const shopLogo = req.file;  // Get the uploaded image


  try {
    // Check if all required fields are provided
    if (!shopName || !ownerName || !shopCategory || !location || !phone || !email || !password) {
      return res.status(400).json({ message: "Required fields are missing" });
    }
    let shopUrl = '';
    if (shopLogo) {
      const result = await cloudinary.uploader.upload(shopLogo.path);
      shopUrl = result.secure_url;
    }

    // Check if the shop already exists
    const existingShop = await Shop.findOne({ email });
    if (existingShop) {
      return res.status(400).json({ message: "Shop already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);


   

    // Create a new shop with all the provided details
    const newShop = new Shop({
      shopName,
      ownerName,
      shopCategory,
      location,
      phone,
      shopLogo: shopUrl, // Save only the URL here
      email,
      password: hashedPassword
    });

    // Save the new shop to the database
    await newShop.save();

    // Generate JWT token
    const token = jwt.sign({ shopId: newShop._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send success response
    res.status(201).json({ message: "Shop created successfully", token });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const shop = await Shop.findOne({ email });
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const isMatch = await bcrypt.compare(password, shop.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ shopId: shop._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      shopName: shop.shopName,
      ownerName: shop.ownerName,
      shopCategory: shop.shopCategory,
      location: shop.location,
      phone: shop.phone,
     
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// exports.updateShopDetails = async (req, res) => {
//   try {
//     const { shopName, ownerName, location, phone, email, password } = req.body;
//     const shopLogo = req.file; // Get the uploaded image

//     const shop = await Shop.findOne({ email });

//     if (!shop) {
//       return res.status(404).json({ message: 'Shop not found' });
//     }

//     shop.shopName = shopName || shop.shopName;
//     shop.ownerName = ownerName || shop.ownerName;
//     shop.location = location || shop.location;
//     shop.phone = phone || shop.phone;

//     if (shopLogo) {
//       const result = await cloudinary.uploader.upload(shopLogo.path);
//       shop.shopUrl = result.secure_url;
//     }

//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       shop.password = await bcrypt.hash(password, salt);
//     }

//     await shop.save();

//     res.status(200).json({ message: 'Shop details updated successfully', shopUrl: shop.shopUrl });
//   } catch (err) {
//     console.error('Error updating shop details:', err);
//     res.status(500).json({ message: 'Error updating shop details', error: err.message });
//   }
// };

// Get Single Shop by ID Controller
exports.getShopById = (req, res) => {
  const shopId = req.params.id;

  // Validate the ObjectId format
  if (!mongoose.Types.ObjectId.isValid(shopId)) {
    return res.status(400).json({ message: 'Invalid shop ID' });
  }

  Shop.findById(shopId)
    .then(shop => {
      if (!shop) {
        return res.status(404).json({ message: 'Shop not found' });
      }
      res.json(shop);
    })
    .catch(err => res.status(500).json({ message: 'Error retrieving shop', error: err }));
};

// Update Shop by ID Controller
exports.updateShopById = async (req, res) => {
  const { id } = req.params;
  const { shopName, ownerName, shopCategory, location, phone, email, password } = req.body;
  const image = req.file;  // Get the uploaded image

  try {
    const shop = await Shop.findById(id);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Update Shop details
    shop.shopName = shopName || shop.shopName;
    shop.ownerName = ownerName || shop.ownerName;
    shop.shopCategory = shopCategory || shop.shopCategory;
    shop.location = location || shop.location;
    shop.phone = phone || shop.phone;
    shop.email = email || shop.email;
    shop.password = password || shop.password;
    
    // Handle image update
    if (image) {
      // Upload image to Cloudinary and get URL
      const result = await cloudinary.uploader.upload(image.path);
      shop.shopLogo = result.secure_url;
    }

    await shop.save();
    res.status(200).json({ message: "Shop updated successfully", shop });
  } catch (error) {
    console.error("Error updating shop:", error);
    res.status(500).json({ message: "An error occurred while updating the shop." });
  }
};