/**
 * Seed Script — Inserts sample clothing products into MongoDB.
 *
 * Usage:
 *   cd server
 *   node scripts/seedProducts.js
 *
 * This script:
 *   1. Connects to MongoDB using your .env MONGO_URI
 *   2. Creates a "seed-seller" user if it doesn't exist (role: seller)
 *   3. Inserts 20 sample clothing products
 *   4. Logs results and exits
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const User = require('../models/user');
const Product = require('../models/product');

const SAMPLE_PRODUCTS = [
  // ── Men's Collection ───────────────────────────────────
  {
    name: 'Classic Oxford Shirt',
    price: 49.99,
    stock: 50,
    description: 'A timeless Oxford button-down shirt crafted from premium 100% cotton. Perfect for both formal meetings and casual weekends.',
    category: 'men',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Pink'],
  },
  {
    name: 'Slim Fit Chinos',
    price: 59.99,
    stock: 40,
    description: 'Modern slim-fit chinos with stretch fabric for all-day comfort. Features a tapered leg and flat front design.',
    category: 'men',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Navy', 'Khaki', 'Olive', 'Charcoal'],
  },
  {
    name: 'Premium Leather Jacket',
    price: 199.99,
    stock: 15,
    description: 'Genuine leather biker jacket with quilted lining. A wardrobe essential that gets better with age.',
    category: 'men',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown'],
  },
  {
    name: 'Merino Wool Sweater',
    price: 79.99,
    stock: 30,
    description: 'Ultra-soft merino wool crew neck sweater. Lightweight yet warm, perfect for layering in cooler weather.',
    category: 'men',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Charcoal', 'Navy', 'Burgundy', 'Forest Green'],
  },

  // ── Women's Collection ─────────────────────────────────
  {
    name: 'Floral Maxi Dress',
    price: 89.99,
    stock: 25,
    description: 'Flowing floral maxi dress with adjustable waist tie. Features a V-neckline and flutter sleeves for an elegant silhouette.',
    category: 'women',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Rose', 'Sage', 'Navy Floral'],
  },
  {
    name: 'High-Waist Tailored Trousers',
    price: 69.99,
    stock: 35,
    description: 'Sophisticated high-waist trousers with a wide leg silhouette. Made from wrinkle-resistant fabric for effortless chic.',
    category: 'women',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Cream', 'Taupe'],
  },
  {
    name: 'Cashmere Blend Cardigan',
    price: 119.99,
    stock: 20,
    description: 'Luxuriously soft cashmere-blend cardigan with pearl button details. The ultimate cozy layering piece for any season.',
    category: 'women',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Ivory', 'Blush', 'Heather Grey'],
  },
  {
    name: 'Silk Blend Blouse',
    price: 74.99,
    stock: 28,
    description: 'Elegant silk-blend blouse with a relaxed fit and subtle sheen. Transitions perfectly from office to evening.',
    category: 'women',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Champagne', 'Black', 'Dusty Rose'],
  },

  // ── Kids' Collection ───────────────────────────────────
  {
    name: 'Rainbow Stripe T-Shirt',
    price: 24.99,
    stock: 60,
    description: 'Fun and colorful rainbow stripe t-shirt made from soft organic cotton. Perfect for active kids who love to play.',
    category: 'kids',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500',
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    colors: ['Rainbow', 'Blue Stripe', 'Pink Stripe'],
  },
  {
    name: 'Denim Dungarees',
    price: 39.99,
    stock: 45,
    description: 'Classic denim dungarees with adjustable straps and fun patch pockets. Durable enough for everyday adventures.',
    category: 'kids',
    image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=500',
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'],
    colors: ['Classic Blue', 'Light Wash'],
  },
  {
    name: 'Cozy Fleece Hoodie',
    price: 34.99,
    stock: 55,
    description: 'Super soft fleece hoodie with kangaroo pocket. keeps kids warm and stylish during cooler days.',
    category: 'kids',
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500',
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'],
    colors: ['Red', 'Navy', 'Grey', 'Purple'],
  },

  // ── Accessories ────────────────────────────────────────
  {
    name: 'Leather Crossbody Bag',
    price: 89.99,
    stock: 20,
    description: 'Minimalist genuine leather crossbody bag with adjustable strap. Features multiple compartments for practical organization.',
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500',
    sizes: ['One Size'],
    colors: ['Tan', 'Black', 'Cognac'],
  },
  {
    name: 'Aviator Sunglasses',
    price: 45.99,
    stock: 70,
    description: 'Classic aviator sunglasses with UV400 protection and polarized lenses. Lightweight metal frame for all-day comfort.',
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
    sizes: ['One Size'],
    colors: ['Gold/Green', 'Silver/Blue', 'Black/Grey'],
  },
  {
    name: 'Wool Blend Scarf',
    price: 35.99,
    stock: 40,
    description: 'Luxuriously soft wool-blend scarf with elegant fringe detail. Adds a touch of sophistication to any outfit.',
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=500',
    sizes: ['One Size'],
    colors: ['Camel', 'Burgundy', 'Grey', 'Navy'],
  },

  // ── Footwear ───────────────────────────────────────────
  {
    name: 'Minimalist White Sneakers',
    price: 99.99,
    stock: 35,
    description: 'Clean white leather sneakers with a minimalist design. Premium cushioned insole for superior comfort all day long.',
    category: 'footwear',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White', 'White/Gum'],
  },
  {
    name: 'Chelsea Leather Boots',
    price: 149.99,
    stock: 22,
    description: 'Classic Chelsea boots in premium leather with elastic side panels. Goodyear welted sole for durability and easy resoling.',
    category: 'footwear',
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'Tan', 'Dark Brown'],
  },

  // ── Activewear ─────────────────────────────────────────
  {
    name: 'Performance Running Shorts',
    price: 39.99,
    stock: 50,
    description: 'Lightweight performance shorts with moisture-wicking fabric and built-in liner. Reflective details for low-light visibility.',
    category: 'activewear',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Electric Blue'],
  },
  {
    name: 'Seamless Sports Bra',
    price: 44.99,
    stock: 45,
    description: 'High-support seamless sports bra with removable padding. Breathable mesh panels for maximum ventilation during workouts.',
    category: 'activewear',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Dusty Pink', 'Lavender'],
  },
  {
    name: 'Compression Leggings',
    price: 64.99,
    stock: 38,
    description: 'High-waist compression leggings with squat-proof fabric. Features a hidden waistband pocket for keys or cards.',
    category: 'activewear',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Dark Green', 'Wine Red'],
  },
];

async function seed() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Create or find a seed seller user
    let seller = await User.findOne({ email: 'seedseller@mystore.com' });
    if (!seller) {
      const hashedPassword = await bcrypt.hash('SeedSeller123!', 10);
      seller = await User.create({
        name: 'My Store Official',
        email: 'seedseller@mystore.com',
        password: hashedPassword,
        role: 'seller',
      });
      console.log('✅ Seed seller created: seedseller@mystore.com / SeedSeller123!');
    } else {
      console.log('ℹ️  Seed seller already exists');
    }

    // Remove previously seeded products (by this seller)
    const deleted = await Product.deleteMany({ seller: seller._id });
    console.log(`🗑️  Removed ${deleted.deletedCount} old seeded products`);

    // Add seller reference to each product
    const productsWithSeller = SAMPLE_PRODUCTS.map((p) => ({
      ...p,
      seller: seller._id,
    }));

    // Insert all products
    const inserted = await Product.insertMany(productsWithSeller);
    console.log(`✅ Inserted ${inserted.length} sample products`);

    console.log('\n📦 Seeded products by category:');
    const categories = {};
    inserted.forEach((p) => {
      if (!categories[p.category]) categories[p.category] = [];
      categories[p.category].push(`  - ${p.name} ($${p.price})`);
    });
    Object.entries(categories).forEach(([cat, items]) => {
      console.log(`\n  ${cat.toUpperCase()} (${items.length}):`);
      items.forEach((item) => console.log(item));
    });

    console.log('\n🎉 Seeding complete! You can now browse products in the shop.');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

seed();
