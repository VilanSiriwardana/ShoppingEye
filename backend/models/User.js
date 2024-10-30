//models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true // Ensures email uniqueness in the database
  },
  // phone: {
  //   type: String,
  //   required: false
  // },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: false
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: false
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
