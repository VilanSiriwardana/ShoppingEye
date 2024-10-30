const mongoose = require('mongoose'); // Add this line
const Item = require('../models/Item.js');
const cloudinary = require('../config/cloudinary');

// Add Item Controller
exports.addItem = async (req, res) => {
  const { shopName, productName, category, tags, price, size, shopLocation, itemLocation, description } = req.body;
  const image = req.file;  // Get the uploaded image

  try {
    if (!shopName || !productName || !category || !tags || !price || !size || !shopLocation || !itemLocation) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Upload image to Cloudinary and get URL
    let imageUrl = '';
    if (image) {
      const result = await cloudinary.uploader.upload(image.path);
      imageUrl = result.secure_url;
    }

    const newItem = new Item({
      shopName,
      productName,
      category,
      tags,
      price,
      size,
      shopLocation,
      itemLocation,
      description, // Added description field
      imageUrl  // Save image URL
    });

    await newItem.save();

    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (error) {
    console.error("Add item error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Get All Items Controller
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error("Get items error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Single Item by ID Controller
exports.getItemById = (req, res) => {
  const itemId = req.params.id;

  // Validate the ObjectId format
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).json({ message: 'Invalid item ID' });
  }

  Item.findById(itemId)
    .then(item => {
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(item);
    })
    .catch(err => res.status(500).json({ message: 'Error retrieving item', error: err }));
};

// Update Item by ID Controller
exports.updateItemById = async (req, res) => {
  const { id } = req.params;
  const { shopName, productName, category, tags, price, size, shopLocation, itemLocation, description } = req.body;
  const image = req.file;  // Get the uploaded image

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Update item details
    item.shopName = shopName || item.shopName;
    item.productName = productName || item.productName;
    item.category = category || item.category;
    item.tags = tags || item.tags;
    item.price = price || item.price;
    item.size = size || item.size;
    item.shopLocation = shopLocation || item.shopLocation;
    item.itemLocation = itemLocation || item.itemLocation;
    item.description = description || item.description;


    // Handle image update
    if (image) {
      // Upload image to Cloudinary and get URL
      const result = await cloudinary.uploader.upload(image.path);
      item.imageUrl = result.secure_url;
    }

    await item.save();
    res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "An error occurred while updating the item." });
  }
};

// Delete Item by ID Controller
exports.deleteItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Item.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Delete item error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};