import { useNavigate } from 'react-router-dom'

const OperatorDashboard = () => {
  const navigate = useNavigate()

  const handleGetNextForm = () => {
    // This will be implemented to call the API and navigate to the form
    navigate('/form/123') // Placeholder ID
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Operator Dashboard
        </h1>
        <button
          onClick={handleGetNextForm}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Get Next Form
        </button>
      </div>
    </div>
  )
}

export default OperatorDashboard 