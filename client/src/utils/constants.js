// API Endpoints
export const API_ENDPOINTS = {
  USERS: {
    CREATE: '/api/users/create',
    LOGIN: '/api/users/login',
    ALL: '/api/users/all',
    DELETE: (id) => `/api/users/delete/${id}`,
    UPDATE: (id) => `/api/users/update/${id}`,
  },
  PRODUCTS: {
    ALL: '/api/products/all',
    CREATE: '/api/products/create',
    DELETE: (id) => `/api/products/delete/${id}`,
    UPDATE: (id) => `/api/products/update/${id}`,
    BROWSE: '/api/products/shop/browse',
    DETAIL: (id) => `/api/products/shop/${id}`,
  },
  CART: {
    GET: '/api/cart',
    ADD: '/api/cart/add',
    UPDATE: '/api/cart/update',
    REMOVE: (productId) => `/api/cart/remove/${productId}`,
  },
  SELLER: {
    STATS: '/api/seller/stats',
  },
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  COLLECTION: '/collection',
  SHOP: '/shop',
  PRODUCT_DETAIL: (id) => `/shop/${id}`,
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  SIGNUP: '/signup',
  ADMIN: '/admin',
  SELLER: '/seller',
  CART: '/cart',
  PROFILE: '/profile',
  ORDERS: '/orders',
};

// User Roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  SELLER: 'seller',
  ADMIN: 'admin',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  ROLE: 'role',
};

// Color Scheme (for reference - use CSS variables in actual styling)
export const COLORS = {
  PRIMARY: '#343834',
  PRIMARY_DARK: '#1f1f1f',
  PRIMARY_LIGHT: '#584f4f',
  BACKGROUND: '#f9f9f9',
  TEXT: '#333',
  TEXT_LIGHT: '#555',
  WHITE: '#ffffff',
  BORDER: '#ccc',
};

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: '375px',
  TABLET: '768px',
  DESKTOP: '1024px',
  LARGE: '1920px',
};

// Form Validation
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};
