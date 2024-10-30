// controllers/wishlistController.js
const Wishlist = require('../models/Wishlist');

// Add an item to the wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Find or create a wishlist for the user
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] });
    }

    // Add item to the wishlist if not already present
    if (!wishlist.items.includes(itemId)) {
      wishlist.items.push(itemId);
      await wishlist.save();
      return res.status(200).json({ message: 'Item added to wishlist' });
    } else {
      return res.status(400).json({ message: 'Item already in wishlist' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error adding to wishlist', error });
  }
};

// Get all items in the user's wishlist
exports.getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.findOne({ userId }).populate('items');

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.json(wishlist.items);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving wishlist', error });
  }
};

// Get all wishlist (for admin use or general viewing)
exports.getAllWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.find().populate('items'); // Ensure you populate items if needed
        res.status(200).json(wishlist); // Send the correct variable
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
    }
};
