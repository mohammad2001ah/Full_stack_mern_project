# MyStore - Full-Stack E-Commerce Platform

A production-ready fashion e-commerce application built with the **MERN stack** (MongoDB, Express, React, Node.js). Features multi-role authentication, a seller dashboard, admin panel, shopping cart, and advanced product search with filtering and pagination.

---

## Features

### Customer Experience
- Browse products by category (Men, Women, Kids, Accessories, Footwear, Activewear)
- Full-text search across product names and descriptions
- Filter by price range, sort by price/name/date, with pagination
- Shopping cart with real-time quantity updates and totals
- Responsive UI built with React-Bootstrap

### Seller Dashboard
- Create, edit, and delete product listings
- View personal sales statistics (products, orders, revenue)
- Ownership-based access control — sellers can only manage their own products

### Admin Dashboard
- Platform-wide statistics overview (users, products, orders, revenue)
- Manage all users and products
- Role-based user management

### Security & Auth
- JWT-based authentication with role-based access control (customer / seller / admin)
- Password hashing with bcrypt
- Helmet.js security headers
- Rate limiting (100 requests per 15 minutes per IP)
- Input validation with express-validator

---

## Tech Stack

| Layer      | Technology                                                     |
|------------|----------------------------------------------------------------|
| Frontend   | React 19, React Router 7, Bootstrap 5, Axios, FontAwesome     |
| Backend    | Express 5, Node.js, Mongoose 8, JWT, Helmet, Multer           |
| Database   | MongoDB Atlas                                                  |
| Deployment | Docker (multi-stage build), Vercel (serverless)                |

---

## Project Structure

```
├── client/                    # React frontend
│   └── src/
│       ├── components/        # Pages & UI components
│       ├── context/           # AuthContext, CartContext
│       └── utils/             # Axios instance, API constants
│
├── server/                    # Express backend
│   ├── config/                # MongoDB connection
│   ├── models/                # User, Product, Cart schemas
│   ├── routers/               # API route definitions
│   ├── controllers/           # Business logic
│   └── middleware/             # Auth, validation, error handling
│
├── Dockerfile                 # Multi-stage Docker build
└── vercel.json                # Vercel deployment config
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB instance)

### 1. Clone the repository
```bash
git clone https://github.com/mohammad2001ah/Full_stack_mern_project.git
cd Full_stack_mern_project
```

### 2. Set up environment variables

Create `/server/.env`:
```env
MONGO_URI=<your-mongodb-connection-string>
PORT=5000
JWT_SECRET=<your-secret-key>
```

### 3. Install dependencies
```bash
cd server && npm install
cd ../client && npm install
```

### 4. Run the app
```bash
# Terminal 1 — Backend (port 5000)
cd server && npm run dev

# Terminal 2 — Frontend (port 3000)
cd client && npm start
```

### 5. (Optional) Seed the database
```bash
cd server && npm run seed
```

---

## API Endpoints

| Method | Endpoint                  | Access          | Description              |
|--------|---------------------------|-----------------|--------------------------|
| POST   | `/api/users/create`       | Public          | Register a new user      |
| POST   | `/api/users/login`        | Public          | Login & receive JWT      |
| GET    | `/api/users/all`          | Admin           | List all users           |
| GET    | `/api/products/shop/browse` | Public        | Browse products (filters, search, pagination) |
| GET    | `/api/products/shop/:id`  | Public          | Get product details      |
| POST   | `/api/products/create`    | Seller / Admin  | Create a product         |
| PUT    | `/api/products/update/:id`| Seller / Admin  | Update a product         |
| DELETE | `/api/products/delete/:id`| Seller / Admin  | Delete a product         |
| GET    | `/api/cart`               | Authenticated   | Get user's cart          |
| POST   | `/api/cart/add`           | Authenticated   | Add item to cart         |
| PUT    | `/api/cart/update`        | Authenticated   | Update cart item         |
| DELETE | `/api/cart/remove/:id`    | Authenticated   | Remove item from cart    |
| GET    | `/api/seller/stats`       | Seller          | Get seller statistics    |

---

## Deployment

### Docker
```bash
docker build -t mystore .
docker run -p 5000:5000 --env-file ./server/.env mystore
```

### Vercel
The project includes a `vercel.json` configuration that routes `/api/*` to the Express backend and serves the React build for all other paths.

---

## Architecture Highlights

- **MVC pattern** on the backend with clean separation: routers -> controllers -> models
- **Context-based state management** on the frontend (AuthContext + CartContext)
- **Axios interceptor** automatically attaches JWT tokens to every API request
- **Protected routes** with role-based redirection on both client and server
- **MongoDB indexes** for optimized text search and category/price filtering

---

## License

This project is open source and available under the [MIT License](LICENSE).
