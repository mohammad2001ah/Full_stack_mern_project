import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faFilter,
  faShoppingCart,
  faChevronLeft,
  faChevronRight,
  faTimes,
  faSpinner,
  faTags,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../utils/constants';
import './customerShop.css';

const CATEGORIES = [
  { value: 'all', label: 'All Products', icon: '🛍️' },
  { value: 'men', label: "Men's", icon: '👔' },
  { value: 'women', label: "Women's", icon: '👗' },
  { value: 'kids', label: "Kids", icon: '🧒' },
  { value: 'accessories', label: 'Accessories', icon: '👜' },
  { value: 'footwear', label: 'Footwear', icon: '👟' },
  { value: 'activewear', label: 'Activewear', icon: '🏃' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-az', label: 'Name: A → Z' },
  { value: 'name-za', label: 'Name: Z → A' },
];

export default function CustomerShop() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  // State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [toast, setToast] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Filters from URL
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'newest';
  const page = Number(searchParams.get('page')) || 1;
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  // Local filter state for price inputs (only applied on submit)
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [searchInput, setSearchInput] = useState(search);

  // Scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (category && category !== 'all') params.set('category', category);
      if (sort) params.set('sort', sort);
      if (minPrice) params.set('minPrice', minPrice);
      if (maxPrice) params.set('maxPrice', maxPrice);
      params.set('page', page);
      params.set('limit', 12);

      const response = await api.get(`/api/products/shop/browse?${params.toString()}`);
      setProducts(response.data.products);
      setTotal(response.data.total);
      setPages(response.data.pages);
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [search, category, sort, page, minPrice, maxPrice]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Show toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Update URL search params
  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    // Reset page when filters change
    if (key !== 'page') newParams.set('page', '1');
    setSearchParams(newParams);
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    updateFilter('search', searchInput);
  };

  // Handle price filter submit
  const handlePriceFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    if (localMinPrice) newParams.set('minPrice', localMinPrice);
    else newParams.delete('minPrice');
    if (localMaxPrice) newParams.set('maxPrice', localMaxPrice);
    else newParams.delete('maxPrice');
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchInput('');
    setLocalMinPrice('');
    setLocalMaxPrice('');
    setSearchParams({});
  };

  // Add to cart handler
  const handleAddToCart = async (productId, productName) => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      showToast('Please log in to add items to cart', 'info');
      return;
    }
    const result = await addToCart(productId, 1);
    if (result.success) {
      showToast(`${productName} added to cart! 🛒`, 'success');
    } else {
      showToast(result.message, 'error');
    }
  };

  // Check if any filter is active
  const hasActiveFilters = search || category !== 'all' || minPrice || maxPrice || sort !== 'newest';

  return (
    <div className="customer-shop">
      {/* Toast Notification */}
      {toast && (
        <div className={`shop-toast ${toast.type}`} role="alert" id="shop-toast" data-testid="testid-shop-toast">
          {toast.message}
        </div>
      )}

      {/* Hero Banner */}
      <section className="shop-hero" id="shop-hero" data-testid="testid-shop-hero">
        <div className="shop-hero-content">
          <h1 id="shop-heading">Shop Our Collection</h1>
          <p>Discover premium clothing & accessories for every style</p>
          <div className="shop-hero-stats">
            <span id="stat-total-products"><strong>{total}</strong> Products</span>
            <span className="stat-divider">|</span>
            <span id="stat-categories-count"><strong>6</strong> Categories</span>
            <span className="stat-divider">|</span>
            <span id="stat-free-shipping"><strong>Free</strong> Shipping</span>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="shop-search-section">
        <form className="shop-search-bar" onSubmit={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input
            type="text"
            placeholder="Search products by name or description..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Search products"
            id="shop-search-input"
          />
          <button type="submit" className="search-submit-btn">Search</button>
        </form>
        <button
          className="filter-toggle-btn"
          onClick={() => setShowFilters(!showFilters)}
          aria-label="Toggle filters"
        >
          <FontAwesomeIcon icon={faFilter} />
          <span>Filters</span>
          {hasActiveFilters && <span className="filter-badge">●</span>}
        </button>
      </section>

      {/* Category Pills */}
      <section className="shop-categories" aria-label="Product categories" id="category-pills-container">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            id={`cat-pill-${cat.value}`}
            data-testid={`testid-cat-pill-${cat.value}`}
            className={`category-pill ${category === cat.value ? 'active' : ''}`}
            onClick={() => updateFilter('category', cat.value)}
            aria-pressed={category === cat.value}
          >
            <span className="pill-icon">{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </section>

      <div className="shop-layout">
        {/* Sidebar Filters */}
        <aside className={`shop-sidebar ${showFilters ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h3>
              <FontAwesomeIcon icon={faFilter} /> Filters
            </h3>
            <button className="sidebar-close" onClick={() => setShowFilters(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Sort */}
          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select
              value={sort}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="filter-select"
              id="sort-select"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="filter-group">
            <label className="filter-label">Price Range</label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={localMinPrice}
                onChange={(e) => setLocalMinPrice(e.target.value)}
                min="0"
                className="price-input"
                id="min-price-input"
              />
              <span className="price-dash">—</span>
              <input
                type="number"
                placeholder="Max"
                value={localMaxPrice}
                onChange={(e) => setLocalMaxPrice(e.target.value)}
                min="0"
                className="price-input"
                id="max-price-input"
              />
            </div>
            <button className="apply-price-btn" onClick={handlePriceFilter}>
              Apply Price
            </button>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              <FontAwesomeIcon icon={faTimes} /> Clear All Filters
            </button>
          )}
        </aside>

        {/* Product Grid */}
        <main className="shop-main">
          {/* Results info & sort (mobile) */}
          <div className="shop-results-bar">
            <p className="results-count">
              {loading ? 'Loading...' : `Showing ${products.length} of ${total} products`}
            </p>
            <select
              value={sort}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="mobile-sort"
              id="mobile-sort-select"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Active Filters Tags */}
          {hasActiveFilters && (
            <div className="active-filters">
              <FontAwesomeIcon icon={faTags} />
              {search && (
                <span className="filter-tag">
                  Search: "{search}"
                  <button onClick={() => { setSearchInput(''); updateFilter('search', ''); }}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </span>
              )}
              {category !== 'all' && (
                <span className="filter-tag">
                  {category}
                  <button onClick={() => updateFilter('category', 'all')}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </span>
              )}
              {(minPrice || maxPrice) && (
                <span className="filter-tag">
                  ${minPrice || '0'} — ${maxPrice || '∞'}
                  <button onClick={() => { setLocalMinPrice(''); setLocalMaxPrice(''); updateFilter('minPrice', ''); updateFilter('maxPrice', ''); }}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="shop-loading">
              <FontAwesomeIcon icon={faSpinner} spin size="2x" />
              <p>Loading products...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="shop-error">
              <p>⚠️ {error}</p>
              <button onClick={fetchProducts}>Try Again</button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <div className="shop-empty">
              <div className="empty-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
              {hasActiveFilters && (
                <button className="clear-filters-btn" onClick={clearFilters}>
                  Clear All Filters
                </button>
              )}
            </div>
          )}

          {/* Product Grid */}
          {!loading && !error && products.length > 0 && (
            <div className="product-grid" id="product-grid" data-testid="testid-product-grid">
              {products.map((product, index) => (
                <article
                  id={`product-card-${product._id}`}
                  data-testid={`testid-product-card-${product._id}`}
                  className="product-card test-product-card"
                  key={product._id}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Product Image */}
                  <div
                    id={`product-img-wrapper-${product._id}`}
                    className="product-image-wrapper"
                    onClick={() => navigate(`/shop/${product._id}`)}
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(`/shop/${product._id}`)}
                  >
                    {product.image ? (
                      <img
                        id={`product-img-${product._id}`}
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="product-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://via.placeholder.com/400x500/343834/ffffff?text=${encodeURIComponent(product.name)}`;
                        }}
                      />
                    ) : (
                      <div className="product-image-placeholder">
                        <span>{product.name.charAt(0)}</span>
                      </div>
                    )}
                    <span className="product-category-badge">{product.category}</span>
                    {product.stock <= 5 && (
                      <span className="product-low-stock-badge">Low Stock</span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="product-info">
                    <h3
                      id={`product-title-${product._id}`}
                      data-testid={`testid-product-title-${product._id}`}
                      className="product-name"
                      onClick={() => navigate(`/shop/${product._id}`)}
                    >
                      {product.name}
                    </h3>
                    <p className="product-description" id={`product-desc-${product._id}`}>
                      {product.description?.substring(0, 80)}
                      {product.description?.length > 80 ? '...' : ''}
                    </p>

                    {/* Sizes */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="product-sizes" id={`product-sizes-${product._id}`}>
                        {product.sizes.slice(0, 4).map((size) => (
                          <span key={size} className="size-tag">{size}</span>
                        ))}
                        {product.sizes.length > 4 && (
                          <span className="size-tag more">+{product.sizes.length - 4}</span>
                        )}
                      </div>
                    )}

                    {/* Colors */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="product-colors-info">
                        <span className="colors-count">
                          {product.colors.length} color{product.colors.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}

                    {/* Price + Action */}
                    <div className="product-footer">
                      <div className="product-price">
                        <span className="price-current" id={`product-price-${product._id}`}>${product.price.toFixed(2)}</span>
                      </div>
                      <button
                        id={`add-cart-btn-${product._id}`}
                        data-testid={`testid-add-cart-${product._id}`}
                        className="add-cart-btn test-add-btn"
                        onClick={() => handleAddToCart(product._id, product.name)}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <nav className="shop-pagination" aria-label="Product pages">
              <button
                className="page-btn"
                disabled={page <= 1}
                onClick={() => updateFilter('page', String(page - 1))}
                aria-label="Previous page"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`page-btn ${p === page ? 'active' : ''}`}
                  onClick={() => updateFilter('page', String(p))}
                  aria-current={p === page ? 'page' : undefined}
                >
                  {p}
                </button>
              ))}
              <button
                className="page-btn"
                disabled={page >= pages}
                onClick={() => updateFilter('page', String(page + 1))}
                aria-label="Next page"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </nav>
          )}
        </main>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          className="scroll-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </div>
  );
}
