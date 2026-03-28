import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { API_ENDPOINTS } from "../utils/constants";
import "./productsManagement.css";

export default function ProductsManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get(API_ENDPOINTS.PRODUCTS.ALL);
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      setMessage("Failed to load products");
      setLoading(false);
      console.error(err.message || err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
      setProducts(products.filter((p) => p._id !== id));
      setMessage("Product deleted successfully");
    } catch (err) {
      setMessage("Error deleting product");
      console.error(err.message || err);
    }
  };

  const handleCreate = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      setMessage("Please fill all required fields");
      return;
    }
    try {
      const res = await api.post(API_ENDPOINTS.PRODUCTS.CREATE, {
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        description: newProduct.description,
      });

      setProducts([...products, res.data.product]);
      setNewProduct({ name: "", price: "", stock: "", description: "" });
      setMessage("Product created successfully");
    } catch (err) {
      setMessage("Error creating product");
      console.error(err.message || err);
    }
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  return (
    <div className="products-container">
      <h2>Products Management</h2>
      {message && <p className="message">{message}</p>}

      <div className="product-form" id="product-create-form" data-testid="testid-product-form">
        <input
          id="input-product-name"
          data-testid="testid-input-product-name"
          className="form-input"
          type="text"
          name="name"
          placeholder="Name"
          value={newProduct.name}
          onChange={handleChange}
        />
        <input
          id="input-product-price"
          data-testid="testid-input-product-price"
          className="form-input"
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
          min="0"
          step="0.01"
        />
        <input
          id="input-product-stock"
          data-testid="testid-input-product-stock"
          className="form-input"
          type="number"
          name="stock"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={handleChange}
          min="0"
        />
        <input
          id="input-product-description"
          data-testid="testid-input-product-description"
          className="form-input"
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
        />
        <button 
          id="add-product-btn" 
          data-testid="testid-add-product-btn"
          className="btn-add"
          onClick={handleCreate}
        >
          Add Product
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="products-table" id="products-list-table" data-testid="testid-products-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} id={`row-product-${product._id}`} data-testid="testid-product-row">
                <td id={`cell-name-${product._id}`}>{product.name}</td>
                <td id={`cell-price-${product._id}`}>${Number(product.price).toFixed(2)}</td>
                <td id={`cell-stock-${product._id}`}>{product.stock}</td>
                <td id={`cell-desc-${product._id}`}>{product.description}</td>
                <td>
                  <button 
                    id={`delete-btn-${product._id}`} 
                    data-testid="testid-delete-product"
                    className="delete-btn" 
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
