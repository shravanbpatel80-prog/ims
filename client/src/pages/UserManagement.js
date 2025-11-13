import React, { useEffect, useState } from "react";
import api from "../utils/axiosConfig";
import { Plus, Edit, Trash2, X, Search } from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterColumn, setFilterColumn] = useState("All Columns");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    full_name: "",
    email: "",
    role: "Staff",
  });

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await api.get('/api/auth/users');
      setUsers(res.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      console.error("Error details:", err.response?.data);
      console.error("Error status:", err.response?.status);
      
      if (err.response?.status === 401) {
        alert("Authentication required. Please login again.");
        window.location.href = '/login';
      } else if (err.response?.status === 403) {
        alert("You don't have permission to view users. Admin access required.");
      } else if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')) {
        alert("Cannot connect to backend server. Make sure it's running on port 5000.");
      } else {
        const errorMsg = err.response?.data?.message || "Failed to load users.";
        alert(errorMsg);
      }
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search
  const filteredUsers = users.filter((user) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    if (filterColumn === "All Columns") {
      return (
        user.username?.toLowerCase().includes(searchLower) ||
        user.full_name?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        user.role?.toLowerCase().includes(searchLower)
      );
    } else if (filterColumn === "Username") {
      return user.username?.toLowerCase().includes(searchLower);
    } else if (filterColumn === "Full Name") {
      return user.full_name?.toLowerCase().includes(searchLower);
    } else if (filterColumn === "Email") {
      return user.email?.toLowerCase().includes(searchLower);
    } else if (filterColumn === "Role") {
      return user.role?.toLowerCase().includes(searchLower);
    }
    return true;
  });

  // Open modal for adding new user
  const openAddModal = () => {
    setEditingUserId(null);
    setNewUser({
      username: "",
      password: "",
      full_name: "",
      email: "",
      role: "Staff",
    });
    setIsModalOpen(true);
  };

  // Handle editing a user
  const handleEditUser = (user) => {
    setEditingUserId(user.user_id);
    setNewUser({
      username: user.username,
      password: "", // Not used in edit mode
      full_name: user.full_name,
      email: user.email || "",
      role: user.role,
    });
    setIsModalOpen(true);
  };

  // Handle form submission (Create or Update)
  const handleAddUser = async (e) => {
    e.preventDefault();

    // Validation
    if (!newUser.username.trim()) {
      return alert("Username is required.");
    }
    if (!newUser.full_name.trim()) {
      return alert("Full name is required.");
    }
    if (!newUser.role) {
      return alert("Role is required.");
    }
    if (!editingUserId && !newUser.password) {
      return alert("Password is required for new users.");
    }
    if (newUser.password && newUser.password.length < 6) {
      return alert("Password must be at least 6 characters long.");
    }
    if (newUser.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      return alert("Please enter a valid email address.");
    }

    try {
      if (editingUserId) {
        // Update user - Only email can be updated
        // Note: Backend doesn't have update endpoint, so this will show an alert
        // In production, you'd need a backend endpoint like PUT /api/users/:id
        alert("User update functionality requires backend endpoint. Currently only user creation is supported via /api/auth/register");
        setIsModalOpen(false);
      } else {
        // Create new user using register endpoint
        const payload = {
          username: newUser.username.trim(),
          password: newUser.password,
          full_name: newUser.full_name.trim(),
          role: newUser.role,
          email: newUser.email.trim() || null,
        };

        const res = await api.post("/api/auth/register", payload);
        
        console.log("Register response:", res.data);
        
        // User created successfully - refresh the list and reset form
        alert("User created successfully!");
        setIsModalOpen(false);
        setNewUser({
          username: "",
          password: "",
          full_name: "",
          email: "",
          role: "Staff",
        });
        
        // Refresh users list from backend (similar to ItemMaster)
        await fetchUsers();
      }
    } catch (err) {
      console.error("Error saving user:", err);
      console.error("Error response:", err.response);
      console.error("Error details:", err.response?.data);
      
      let errorMsg = "Failed to save user.";
      
      if (err.response) {
        // Server responded with error
        errorMsg = err.response.data?.message || err.response.data?.error || `Server error: ${err.response.status}`;
        console.error("Server error:", err.response.status, err.response.data);
      } else if (err.request) {
        // Request was made but no response received
        errorMsg = "Cannot connect to backend server. Make sure it's running on port 5000.";
        console.error("No response received:", err.request);
      } else {
        // Error in request setup
        errorMsg = err.message || "Failed to save user.";
        console.error("Request setup error:", err.message);
      }
      
      alert(errorMsg);
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (userId, username) => {
    if (!window.confirm(`Are you sure you want to delete user "${username}"?`)) {
      return;
    }

    try {
      // Note: Backend doesn't have DELETE /api/users/:id endpoint
      // This would require a backend endpoint
      alert("User deletion requires backend endpoint. Currently not supported.");
      // If endpoint existed, it would be:
      // await api.delete(`/api/users/${userId}`);
      // setUsers(users.filter((u) => u.user_id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="h-5 w-5" />
          Add New User
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-4 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterColumn}
          onChange={(e) => setFilterColumn(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>All Columns</option>
          <option>Username</option>
          <option>Full Name</option>
          <option>Email</option>
          <option>Role</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    {users.length === 0
                      ? "No users found. Create a new user to get started."
                      : "No users match your search criteria."}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.user_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.user_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.full_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === "Admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.user_id, user.username)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editingUserId ? "Edit User" : "Add New User"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddUser}>
              <div className="space-y-4">
                {!editingUserId && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username *
                      </label>
                      <input
                        type="text"
                        value={newUser.username}
                        onChange={(e) =>
                          setNewUser({ ...newUser, username: e.target.value })
                        }
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter username"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password *
                      </label>
                      <input
                        type="password"
                        value={newUser.password}
                        onChange={(e) =>
                          setNewUser({ ...newUser, password: e.target.value })
                        }
                        required
                        minLength={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter password (min 6 chars)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={newUser.full_name}
                        onChange={(e) =>
                          setNewUser({ ...newUser, full_name: e.target.value })
                        }
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role *
                      </label>
                      <select
                        value={newUser.role}
                        onChange={(e) =>
                          setNewUser({ ...newUser, role: e.target.value })
                        }
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Staff">Staff</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Email field - shown for both create and edit, but only editable in edit mode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email {editingUserId && "*"}
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    required={!!editingUserId}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={editingUserId ? "Enter email" : "Enter email (optional)"}
                  />
                  {editingUserId && (
                    <p className="text-xs text-gray-500 mt-1">
                      Only email can be updated. Username, Full Name, and Role cannot be changed.
                    </p>
                  )}
                </div>

                {/* Show read-only fields in edit mode */}
                {editingUserId && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        value={newUser.username}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={newUser.full_name}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        value={newUser.role}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  {editingUserId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

