const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName, birthday, gender } = req.body;

  try {
    console.log(`Attempting to register user with email: ${email}`);

    // Check if user already exists
    let user = await User.findOne({ email });
    console.log(`User found: ${user}`);

    if (user) return res.status(400).json({ msg: "User already exists" });

    // Create new user
    user = new User({ email, password, firstName, lastName, birthday, gender });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();

    console.log(`User saved: ${user}`);

    // Generate JWT
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Login request payload:", req.body);
    const user = await User.findOne({ email });
    console.log("User found:", user);
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });
    // res.json({ token });
    // Return token and user information (including user ID)
    res.json({
      token,
      user: {
        _id: user.id, // include user ID in response
        email: user.email
      }
    });
  } catch (err) {
    console.error("Error in login route:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});
// Middleware to authenticate and attach user to request
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Get user profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update user profile
router.put("/update", authMiddleware, async (req, res) => {
  const { email, password, firstName, lastName, birthday, gender } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Update fields if provided
    if (email) user.email = email;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (birthday) user.birthday = birthday;
    if (gender) user.gender = gender;

    // Update password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Save updated user
    await user.save();
    res.json({ msg: "Profile updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update user password
router.put("/changePassword", authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  console.log("2nd");
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Current password is incorrect" });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Save updated user
    await user.save();
    res.json({ msg: "Password updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete user account
router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Optionally, handle any cleanup here, like deleting related data

    res.json({ msg: "Account deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
