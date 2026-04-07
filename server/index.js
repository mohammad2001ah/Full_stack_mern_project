const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const userRouters = require('./routers/userRouters');
const productRouters = require('./routers/productRouters');
const cartRouters = require('./routers/cartRouters');
const sellerRouters = require('./routers/sellerRouters');
const { errorHandler, notFound } = require('./middleware/errorHandler');

dotenv.config();

connectDB();

const app = express();

// Security Middleware
app.use(helmet()); // Set security headers

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body Parser Middleware with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Sanitize data to prevent MongoDB injection
// Note: express-mongo-sanitize v2.2.0 is incompatible with Express 5.x getters
// app.use(mongoSanitize());

// Rate Limiting for all routes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(generalLimiter);

// Handle favicon.ico requests (common browser behavior)
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Routes
app.use('/api/users', userRouters);
app.use('/api/products', productRouters);
app.use('/api/cart', cartRouters);
app.use('/api/seller', sellerRouters);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Serve frontend in production environments
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
}
// 404 Handler
app.use(notFound);

// Error Handler Middleware (must be last)
app.use(errorHandler);

// Only listen when run directly (not imported by Vercel serverless)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

// Export for Vercel serverless
module.exports = app;
