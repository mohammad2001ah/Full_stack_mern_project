const Product = require("../models/product");

// GET /api/products/all — Get all products (sellers see only their own)
const getAllProducts = async (req, res, next) => {
  try {
    let query = {};
    // If user is a seller, only return their products
    if (req.user && req.user.role === 'seller') {
      query.seller = req.user.id;
    }
    const products = await Product.find(query).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:id — Get single product by ID (public)
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'name');
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// GET /api/products/shop/browse — Public product browsing with search & filters
const browseProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sort = 'newest',
      page = 1,
      limit = 12,
    } = req.query;

    let query = {};

    // Text search (name & description)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Category filter
    if (category && category !== 'all') {
      query.category = category.toLowerCase();
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Only show in-stock items for customers
    query.stock = { $gt: 0 };

    // Sort options
    let sortOption = {};
    switch (sort) {
      case 'price-low':
        sortOption = { price: 1 };
        break;
      case 'price-high':
        sortOption = { price: -1 };
        break;
      case 'name-az':
        sortOption = { name: 1 };
        break;
      case 'name-za':
        sortOption = { name: -1 };
        break;
      case 'newest':
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit))
        .populate('seller', 'name'),
      Product.countDocuments(query),
    ]);

    // Get distinct categories for filter sidebar
    const categories = await Product.distinct('category');

    res.status(200).json({
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      categories,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/products/create — Create product (seller/admin)
const createProduct = async (req, res, next) => {
  const { name, price, stock, description, category, image, sizes, colors } = req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      stock,
      description,
      category,
      image,
      sizes: sizes || ['M'],
      colors: colors || ['Black'],
      seller: req.user.id,
    });
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    next(error);
  }
};

// PUT /api/products/update/:id — Update product (seller/admin)
const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, stock, description, category, image, sizes, colors } = req.body;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Verify ownership if seller
    if (req.user.role === 'seller' && product.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied: Not your product" });
    }

    const updateData = { name, price, stock, description };
    if (category) updateData.category = category;
    if (image !== undefined) updateData.image = image;
    if (sizes) updateData.sizes = sizes;
    if (colors) updateData.colors = colors;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/products/delete/:id — Delete product (seller/admin)
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

module.exports = {
  getAllProducts,
  getProductById,
  browseProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
