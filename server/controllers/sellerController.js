const Product = require("../models/product");

const getSellerStats = async (req, res, next) => {
  try {
    const sellerId = req.user.id;

    // Get count of products owned by this seller
    const productCount = await Product.countDocuments({ seller: sellerId });

    // Since there's no Order model yet, these are placeholders
    // In a real scenario, you'd aggregate orders filtered by the products belonging to this seller
    const stats = {
      productCount,
      pendingOrders: 0,
      completedOrders: 0,
      revenue: 0,
    };

    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

module.exports = { getSellerStats };
