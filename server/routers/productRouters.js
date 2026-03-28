const express = require("express");
const {
  getAllProducts,
  getProductById,
  browseProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const verifyToken = require("../middleware/auth");
const authorizeRoles = require("../middleware/authorizeRoles");

const router = express.Router();

// ── Public routes (no auth required) ──────────────────────
router.get("/shop/browse", browseProducts);       // Browse with search/filter/sort
router.get("/shop/:id", getProductById);           // Single product detail

// ── Protected routes ──────────────────────────────────────
router.get("/all", verifyToken, getAllProducts);
router.post("/create", verifyToken, authorizeRoles('admin', 'seller'), createProduct);
router.put("/update/:id", verifyToken, authorizeRoles('admin', 'seller'), updateProduct);
router.delete("/delete/:id", verifyToken, authorizeRoles('admin', 'seller'), deleteProduct);

module.exports = router;
