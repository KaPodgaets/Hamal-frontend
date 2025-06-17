const AdminPanel = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">User Management</h2>
          <p className="text-gray-600">Manage call center operators</p>
          {/* User management component will be added here */}
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Operations</h2>
          <p className="text-gray-600">Export, clear, and upload citizen data</p>
          {/* Data operations component will be added here */}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel 