const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: [0, 'Price cannot be negative'] },
  stock: { type: Number, default: 0 },
  description: { type: String },
  // image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
