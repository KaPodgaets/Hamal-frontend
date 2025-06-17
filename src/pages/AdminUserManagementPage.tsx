import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface User {
  id: number;
  username: string;
  role: number;
}

const AdminUserManagementPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/Users");
      setUsers(response.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const role = parseInt(formData.get("role") as string);

    try {
      await api.post("/api/Users", { username, password, role });
      alert("User created successfully");
      fetchUsers();
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Failed to create user:", error);
      alert("Failed to create user");
    }
  };

  // TODO: Use handleUpdateUser in your component, e.g. in an edit form or inline edit action for users.
  // Example usage in a table row:
  // <button onClick={() => handleUpdateUser(user.id, user.username, user.role)}>Update</button>
  const handleUpdateUser = async (
    id: number,
    username: string,
    role: number
  ) => {
    try {
      await api.put(`/api/Users/${id}`, { username, role });
      alert("User updated successfully");
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user");
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await api.delete(`/api/Users/${id}`);
      alert("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              User Management
            </h1>
            <button
              onClick={() => navigate("/admin")}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back to Admin Dashboard
            </button>
          </div>

          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {/* Create User Form */}
          <div className="mb-8 border rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Create New User
            </h3>
            <form
              onSubmit={handleCreateUser}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <input
                name="username"
                type="text"
                placeholder="Username"
                required
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                name="role"
                required
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Role</option>
                <option value="0">Admin</option>
                <option value="1">Operator</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create User
              </button>
            </form>
          </div>

          {/* Users List */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Users</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
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
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.role === 0 ? "Admin" : "Operator"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagementPage;
