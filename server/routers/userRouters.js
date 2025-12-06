const express = require('express');
const rateLimit = require('express-rate-limit');
const { createUser, getAllUsers, loginUser, deleteUser, updateUser } = require('../controllers/userController');
const verifyToken = require('../middleware/auth.js');
const isAdmin = require('../middleware/isAdmin.js');
const {
  validateUserRegistration,
  validateUserLogin,
  validateUserUpdate,
  handleValidationErrors,
} = require('../middleware/validation');

const router = express.Router();

// Rate limiter for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Public routes
router.post(
  '/create',
  authLimiter,
  validateUserRegistration,
  handleValidationErrors,
  createUser
);

router.post(
  '/login',
  authLimiter,
  validateUserLogin,
  handleValidationErrors,
  loginUser
);

// Protected routes
router.get('/all', verifyToken, isAdmin, getAllUsers);

router.delete('/delete/:id', verifyToken, deleteUser);

router.put(
  '/update/:id',
  verifyToken,
  validateUserUpdate,
  handleValidationErrors,
  updateUser
);

module.exports = router;