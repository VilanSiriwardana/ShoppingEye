// wishlistRoutes.js
const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist"); // Ensure this path is correct
const Item = require("../models/Item");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Get the 'Authorization' header
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    console.log("No token provided");
    return res.sendStatus(401); // No token found
  }

  console.log("Token being verified:", token); // Log the token being verified

  // Check if JWT_SECRET is defined
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined in the environment variables.");
    return res.sendStatus(500); // Internal server error
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err.message);
      return res.sendStatus(403); // Invalid token
    }
    req.user = user; // Store user info in request
    next(); // Call the next middleware
  });
};

// POST endpoint to update the wishlist
// router.post("/", async (req, res) => {
//   console.log("Route hit");
//   const { userId, itemId } = req.body;

//   try {
//     const existingWishlist = await Wishlist.findOne({ userId, itemId });

//     if (existingWishlist) {
//       return res.status(400).json({ msg: "Item already in wishlist" });
//     }

//     const newWishlistItem = new Wishlist({ userId, itemId });
//     await newWishlistItem.save();

//     res.status(200).json({ msg: "Item added to wishlist!" });
//   } catch (error) {
//     console.error("Error saving wishlist item:", error);
//     res.status(500).json({ msg: "Server error" });
//   }
// });
// Add items to a wishlist
router.post("/", async (req, res) => {
  const { userId, itemIds } = req.body; // Assume itemIds is an array of item IDs
  console.log("Received request to add items to wishlist:", req.body);

  try {
    // Find the existing wishlist for the user
    let wishlist = await Wishlist.findOne({ userId });
    console.log("Found wishlist:", wishlist);

    if (!wishlist) {
      // Create a new wishlist if none exists
      wishlist = new Wishlist({ userId, items: [] });
      console.log("No existing wishlist found. Created a new one.");
    } else {
      console.log("Existing wishlist found. Updating items.");
    }

    // Ensure item IDs are valid
    const items = await Item.find({ _id: { $in: itemIds } });
    console.log("Valid items found:", items);

    if (items.length === 0) {
      return res.status(400).json({ message: "Invalid item IDs." });
    }

    // Add the item IDs to the wishlist if they are not already present
    wishlist.items = [...new Set([...wishlist.items, ...itemIds])]; // Avoid duplicates
    console.log("Updated wishlist items:", wishlist.items);

    // Save the wishlist to the database
    await wishlist.save();
    res.status(201).json(wishlist);
  } catch (error) {
    console.error("Error adding items to wishlist:", error);
    res.status(500).json({ message: "Failed to add items to wishlist." });
  }
});

// Fetch wishlist for a user by userId
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId; // Get userId from request parameters

  try {
    const wishlist = await Wishlist.find({ userId: userId }); // Fetch wishlist items for the specified user
    res.json(wishlist); // Respond with the fetched wishlist items
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE request to remove an item from a user's wishlist
router.delete("/:userId/:itemId", async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    // Find the wishlist by userId and remove the itemId
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { items: itemId } },
      { new: true }
    );

    if (!wishlist) {
      return res.status(404).send("Wishlist not found");
    }

    res.status(200).send(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
