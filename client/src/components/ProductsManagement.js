import React, { useEffect, useState } from "react";
import axios from "axios";
import "./productsManagement.css";

export default function ProductsManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
    description: "",
  });

  // 🔹 جلب كل المنتجات
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://127.0.0.1:5000/api/products/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      setMessage("Failed to load products");
      setLoading(false);
      console.error(err.response?.data || err.message);
    }
  };

  // 🔹 حذف منتج
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:5000/api/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
      setMessage("Product deleted successfully");
    } catch (err) {
      setMessage("Error deleting product");
      console.error(err.response?.data || err.message);
    }
  };

  // 🔹 إنشاء منتج جديد
  const handleCreate = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      setMessage("Please fill all required fields");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://127.0.0.1:5000/api/products/create",
        {
          name: newProduct.name,
          price: newProduct.price,
          stock: newProduct.stock,
          description: newProduct.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setProducts([...products, res.data.product]);
      setNewProduct({ name: "", price: 0, stock: 0, description: "" });
      setMessage("Product created successfully");
    } catch (err) {
      setMessage("Error creating product");
      console.error(err.response?.data || err.message);
    }
  };

  // 🔹 تحديث الحقول
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  return (
    <div className="products-container">
      <h2>Products Management</h2>
      {message && <p className="message">{message}</p>}

      {/* Form لإضافة منتج */}
      <div className="product-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newProduct.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="stock"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={handleChange}
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
                <td>{product.price}</td>
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
