const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const verifyToken = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();


router.get("/all", verifyToken, getAllProducts);
router.post("/create", verifyToken, isAdmin, createProduct);
router.put("/update/:id", verifyToken, isAdmin, updateProduct);
router.delete("/delete/:id", verifyToken, isAdmin, deleteProduct);

module.exports = router;
