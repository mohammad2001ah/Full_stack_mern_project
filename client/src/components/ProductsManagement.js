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

      <div className="product-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newProduct.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
          min="0"
          step="0.01"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={handleChange}
          min="0"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
        />
        <button onClick={handleCreate}>Add Product</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="products-table">
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
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${Number(product.price).toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>{product.description}</td>
                <td>
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
