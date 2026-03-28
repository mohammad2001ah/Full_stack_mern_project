const Product = require("../models/product");

const getAllProducts = async (req, res, next) => {
  try {
    let query = {};
    // If user is a seller, only return their products
    if (req.user && req.user.role === 'seller') {
      query.seller = req.user.id;
    }
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  const { name, price, stock, description } = req.body;
  try {
    const newProduct = new Product({ 
      name, 
      price, 
      stock, 
      description,
      seller: req.user.id // Always set seller from token
    });
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, stock, description } = req.body;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Verify ownership if seller
    if (req.user.role === 'seller' && product.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied: Not your product" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, stock, description },
      { new: true, runValidators: true }
    );
    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Verify ownership if seller
    if (req.user.role === 'seller' && product.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied: Not your product" });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };
