const Feedback = require('../models/Feedback');
const Shop = require('../models/Shop');

// Add feedback to a specific shop
exports.addFeedback = async (req, res) => {
  const { shopId } = req.params;
  const { user, comment, rating } = req.body;

  try {
    const shop = await Shop.findById(shopId);

    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    const feedback = new Feedback({
      shopId: shopId,
      user,
      comment,
      rating,
    });

    await feedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error adding feedback', error: error.message });
  }
};

// Get feedback for a specific shop
exports.getFeedbackByShop = async (req, res) => {
  const { shopId } = req.params;

  try {
    const feedbacks = await Feedback.find({ shopId }).populate('shopId', 'shopName');

    if (!feedbacks.length) {
      return res.status(404).json({ message: 'No feedback found for this shop' });
    }

    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
};


// Get all feedback (for admin use or general viewing)
exports.getAllFeedback = async (req, res) => {
    try {
      const feedbacks = await Feedback.find();
      res.status(200).json(feedbacks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching feedback', error: error.message });
    }
  };