import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { API_ENDPOINTS } from "../utils/constants";
import "./usersManagement.css";

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get(API_ENDPOINTS.USERS.ALL);
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      setMessage("Failed to load users");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(API_ENDPOINTS.USERS.DELETE(id));
      setUsers(users.filter((u) => u._id !== id));
      setMessage("User deleted successfully");
    } catch (err) {
      setMessage("An error occurred while deleting");
    }
  };

  return (
    <div className="users-container">
      <h2>User Management</h2>

      {message && <p className="message">{message}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="users-table" id="users-list-table" data-testid="testid-users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} id={`row-user-${user._id}`} data-testid="testid-user-row">
                <td id={`cell-user-name-${user._id}`}>{user.name}</td>
                <td id={`cell-user-email-${user._id}`}>{user.email}</td>
                <td id={`cell-user-role-${user._id}`}>{user.role}</td>
                <td>
                  <button
                    id={`delete-user-btn-${user._id}`}
                    data-testid="testid-delete-user"
                    className="delete-btn"
                    onClick={() => handleDelete(user._id)}
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
