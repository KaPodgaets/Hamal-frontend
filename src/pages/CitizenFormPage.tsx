import { useParams } from 'react-router-dom'

const CitizenFormPage = () => {
  const { citizenId } = useParams()

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Citizen Form - ID: {citizenId}
        </h1>
        <p className="text-gray-600 mb-4">
          This form will be implemented to display and edit citizen information.
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Update Citizen
        </button>
      </div>
    </div>
  )
}

export default CitizenFormPage 