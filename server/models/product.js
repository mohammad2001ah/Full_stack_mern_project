const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: [0, 'Price cannot be negative'] },
  stock: { type: Number, default: 0, min: [0, 'Stock cannot be negative'] },
  description: { type: String, default: '' },
  category: {
    type: String,
    enum: ['men', 'women', 'kids', 'accessories', 'footwear', 'activewear'],
    default: 'men',
    lowercase: true,
  },
  image: { type: String, default: '' },
  sizes: {
    type: [String],
    default: ['M'],
  },
  colors: {
    type: [String],
    default: ['Black'],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

// Index for search and filtering
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, price: 1 });

module.exports = mongoose.model("Product", productSchema);
