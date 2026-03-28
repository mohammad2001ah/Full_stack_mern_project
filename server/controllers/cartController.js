const Cart = require('../models/cart');

// GET /api/cart — Fetch user's cart
const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate(
      'items.product',
      'name price stock description'
    );

    if (!cart) {
      cart = { items: [] };
    }

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// POST /api/cart/add — Add item to cart
const addToCart = async (req, res, next) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // Check if product already exists in cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    // Populate product details before returning
    await cart.populate('items.product', 'name price stock description');

    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    next(error);
  }
};

// PUT /api/cart/update — Update item quantity
const updateCartItem = async (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId || quantity == null) {
    return res
      .status(400)
      .json({ message: 'Product ID and quantity are required' });
  }

  if (quantity < 1) {
    return res.status(400).json({ message: 'Quantity must be at least 1' });
  }

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    await cart.save();

    await cart.populate('items.product', 'name price stock description');

    res.status(200).json({ message: 'Cart updated', cart });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/cart/remove/:productId — Remove item from cart
const removeFromCart = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    await cart.populate('items.product', 'name price stock description');

    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart };
