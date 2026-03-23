require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const pickupRoutes = require("./routes/pickupRoutes");

const app = express();
const productRoutes = require("./routes/productRoutes");
app.use(cors());
app.use(express.json());
app.use("/api/pickup", pickupRoutes);
app.use("/api/products", productRoutes);

// ===== Image Upload Setup =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Serve images
app.use("/uploads", express.static("uploads"));

// Test route
app.get("/", (req, res) => {
  res.send("KabadiBazaar API running 🚀");
});
// Model
const Item = require("./Item"); // make sure your Item model is in server/Item.js
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));
// Routes
//
// Get all items
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items); // return as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Add a new item
app.post("/api/items", async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.json(item); // return saved item as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
