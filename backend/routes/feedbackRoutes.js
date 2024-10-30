// routes/feedbackRoutes.js
const express = require("express");
const Feedback = require("../models/Feedback");

const router = express.Router();

// POST feedback
router.post("/", async (req, res) => {
  try {
    const { shopId, user, comment, rating } = req.body;

    const feedback = new Feedback({
      shopId,
      user,
      comment,
      rating
    });

    await feedback.save();

    res.status(201).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating feedback" });
  }
});

// GET feedback by shop ID
router.get("/:shopId", async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ shopId: req.params.shopId });
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching feedbacks" });
  }
});

module.exports = router;
