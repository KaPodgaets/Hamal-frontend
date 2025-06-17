import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Sign out
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Citizen Data Management */}
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Citizen Data Management
              </h3>
              <p className="text-gray-600 mb-4">
                Download, upload, and manage citizen data in bulk.
              </p>
              <button
                onClick={() => navigate("/admin/citizen-data")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Manage Citizen Data
              </button>
            </div>

            {/* User Management */}
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                User Management
              </h3>
              <p className="text-gray-600 mb-4">
                Create, update, and delete user accounts.
              </p>
              <button
                onClick={() => navigate("/admin/users")}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Manage Users
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
