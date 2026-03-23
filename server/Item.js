const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
	  name: String,
	  price: Number,
	  location: String
});

module.exports = mongoose.model("Item", itemSchema);
