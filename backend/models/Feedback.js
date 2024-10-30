// models/Feedback.js
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop", // Reference to the Shop model
      required: true
    },
    user: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;