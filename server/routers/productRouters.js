const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const verifyToken = require("../middleware/auth");
const authorizeRoles = require("../middleware/authorizeRoles");

const router = express.Router();


router.get("/all", verifyToken, getAllProducts);
router.post("/create", verifyToken, authorizeRoles('admin', 'seller'), createProduct);
router.put("/update/:id", verifyToken, authorizeRoles('admin', 'seller'), updateProduct);
router.delete("/delete/:id", verifyToken, authorizeRoles('admin', 'seller'), deleteProduct);

module.exports = router;
