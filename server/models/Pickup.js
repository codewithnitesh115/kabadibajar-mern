const mongoose = require("mongoose");

const PickupSchema = new mongoose.Schema({
	  name: String,
	  phone: String,
	  address: String,
	  item: String,
}, { timestamps: true });

module.exports = mongoose.model("Pickup", PickupSchema);
