import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AdminDataManagementPage = () => {
  const navigate = useNavigate();

  const handleDownloadCitizens = async () => {
    try {
      const response = await api.get("/api/admin/citizens", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "citizens.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download citizens:", error);
      alert("Failed to download citizens data");
    }
  };

  const handleUploadCitizens = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/api/admin/citizens", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Citizens data uploaded successfully");
    } catch (error) {
      console.error("Failed to upload citizens:", error);
      alert("Failed to upload citizens data");
    }
  };

  const handleClearAllData = async () => {
    if (
      !confirm(
        "Are you sure you want to clear all citizen data? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await api.delete("/api/admin/citizens");
      alert("All citizen data cleared successfully");
    } catch (error) {
      console.error("Failed to clear citizens:", error);
      alert("Failed to clear citizens data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Citizen Data Management
            </h1>
            <button
              onClick={() => navigate("/admin")}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back to Admin Dashboard
            </button>
          </div>

          <div className="space-y-8">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Download Citizens Data
              </h3>
              <p className="text-gray-600 mb-4">
                Download the current list of all citizens as a CSV file.
              </p>
              <button
                onClick={handleDownloadCitizens}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Download Citizens
              </button>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Upload Citizens Data
              </h3>
              <p className="text-gray-600 mb-4">
                Upload a CSV file containing citizen data to replace the current
                list.
              </p>
              <input
                type="file"
                accept=".csv"
                onChange={handleUploadCitizens}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div className="border rounded-lg p-6 border-red-200 bg-red-50">
              <h3 className="text-lg font-medium text-red-900 mb-4">
                Clear All Citizen Data
              </h3>
              <p className="text-red-700 mb-4">
                This action will permanently delete all citizen data from the
                system.
              </p>
              <button
                onClick={handleClearAllData}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDataManagementPage;
