//server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const ShopAuthRoutes = require("./routes/Shopauth"); // Adjust the path to auth.js

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3050;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const URL = process.env.MONGODB_URL;
if (!URL) {
  console.error("MONGODB_URL is not defined in .env file");
  process.exit(1); // Exit if no MongoDB URL is defined
}

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connection success!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// Use the routes defined in auth.js
app.use("/api", ShopAuthRoutes);
app.use("/api/Shopauth", ShopAuthRoutes);

//tiny
// Import and use authentication routes
const authRouter = require("./routes/auth"); // Ensure this path is correct
app.use("/api/auth", authRouter);

// Import and use shop routes
const shopRouter = require("./routes/shopRoutes");
app.use("/api/shops", shopRouter);

// Import and use feedback routes
const feedbackRouter = require("./routes/feedbackRoutes");
app.use("/api/feedbacks", feedbackRouter);

// Import and use item routes
const itemRouter = require("./routes/itemRoutes");
app.use("/api/items", itemRouter);

// Import and use search routes
const searchRouter = require("./routes/searchRoutes");
app.use("/api", searchRouter);

// Import and use wishlist routes
const wishlistRoutes = require("./routes/wishlistRoutes");
app.use("/api/wishlist", wishlistRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
