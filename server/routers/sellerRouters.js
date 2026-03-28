const express = require('express');
const { getSellerStats } = require('../controllers/sellerController');
const verifyToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// All seller routes are protected and restricted to 'seller' role
router.use(verifyToken);
router.use(authorizeRoles('seller'));

router.get('/stats', getSellerStats);

module.exports = router;
