// Import user models
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User register
const createUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User Already Exists' });
    }

    // Only allow 'customer' or 'seller' via public registration
    const allowedRoles = ['customer', 'seller'];
    const assignedRole = allowedRoles.includes(role) ? role : 'customer';

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: assignedRole,
    });
    await newUser.save();

    res.status(201).json({ message: 'User Registered Successfully' });
  } catch (error) {
    next(error);
  }
};

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find().select('-password'); // Exclude password field
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

// User login
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid Email Or Password' });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({ message: 'Invalid Email Or Password' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.status(200).json({
      message: 'Login Successful',
      token,
      user: userResponse,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

// Delete user
const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }
    
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User Deleted Successfully' });
  } catch (error) {
    next(error);
  }
};

// Update user
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  
  try {
    const updateData = {};
    
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    
    // Hash password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    
    const userToUpdate = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!userToUpdate) {
      return res.status(404).json({ message: 'User Not Found' });
    }
    
    res.status(200).json({
      message: 'User Updated Successfully',
      user: userToUpdate,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, getAllUsers, loginUser, deleteUser, updateUser };