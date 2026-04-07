const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB connected successfully");
    }
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

module.exports = connectDB;