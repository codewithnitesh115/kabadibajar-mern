const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
console.log("pickupRoutes loaded ✅");

// Schema
const pickupSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  scrapType: String,
});

const Pickup = mongoose.model("Pickup", pickupSchema);
// POST - Create pickup
router.post("/", async (req, res) => {
  try {
    const pickup = new Pickup(req.body);
    await pickup.save();
    res.json({ message: "Pickup booked successfully ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET - All pickups
router.get("/", async (req, res) => {
  try {
    const pickups = await Pickup.find();
    res.json(pickups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE pickup by ID
router.delete("/:id", async (req, res) => {
  try {
    await Pickup.findByIdAndDelete(req.params.id);
    res.json({ message: "Pickup deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
