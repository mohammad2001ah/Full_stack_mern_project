# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the App Locally
Both server and client must run simultaneously:

```bash
# Terminal 1 — Backend (Express on port 5000)
cd server && npm run dev

# Terminal 2 — Frontend (React CRA on port 3000)
cd client && npm start
```

### Other Server Commands
```bash
cd server && npm start        # Production mode (no nodemon)
cd server && npm run seed     # Seed MongoDB with product data
```

### Building for Production
```bash
cd client && npm run build    # Outputs to client/build/
```

## Environment Variables

**Server (`/server/.env`):**
```
MONGO_URI=<MongoDB Atlas connection string>
PORT=5000
JWT_SECRET=<secret>
```

**Client** uses `REACT_APP_API_URL` (defaults to `http://127.0.0.1:5000` if not set).

## Architecture Overview

This is a MERN monorepo with `/client` (React) and `/server` (Express) directories.

### Frontend (`/client/src`)

- **Entry:** `index.js` wraps `<App>` with `BrowserRouter`, `AuthProvider`, and `CartProvider`
- **Routing:** `App.js` defines all routes; dashboards (`/admin`, `/seller`) hide the navbar
- **State:** Two React Context providers:
  - `AuthContext.js` — user auth state, login/register/logout, token storage in localStorage
  - `CartContext.js` — cart item state
- **API calls:** All go through `utils/api.js` — an Axios instance that automatically attaches the JWT token from localStorage via request interceptor
- **Constants:** `utils/constants.js` holds all API endpoint strings, route paths, roles, and localStorage keys — use these instead of hardcoding strings

### Backend (`/server`)

- **Entry:** `index.js` sets up Express with Helmet, CORS, rate limiting (100 req/15 min per IP), mounts routes, serves static React build in production
- **Route structure:** `/api/users`, `/api/products`, `/api/cart`, `/api/seller`
- **Pattern:** routers → controllers → models (Mongoose). Middleware in `/middleware/`
- **Auth middleware:** `middleware/auth.js` verifies JWT; `middleware/authorizeRoles.js` enforces role-based access
- **User roles:** `customer`, `seller`, `admin` (enum on User model)
- **Validation:** `middleware/validation.js` uses `express-validator`; always apply before controller logic

### Key Data Flow

1. Client authenticates → JWT stored in localStorage → `api.js` interceptor sends it in `Authorization: Bearer <token>` header
2. Server `auth.js` middleware decodes token, attaches user to `req.user`
3. `authorizeRoles.js` checks `req.user.role` against allowed roles

### Deployment

- **Docker:** Multi-stage build (`Dockerfile` at root) — builds React, then serves it from Express
- **Vercel:** `vercel.json` routes `/api/*` to server, all other routes to client static build
