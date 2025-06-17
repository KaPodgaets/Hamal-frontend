import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNextCitizenThunk, clearError } from "../store/slices/citizensSlice";
import { logout } from "../store/slices/authSlice";
import type { AppDispatch, RootState } from "../store/store";

const GetNextCitizenPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentCitizen, queueIsEmpty, loading, error } = useSelector(
    (state: RootState) => state.citizens
  );

  // Redirect to citizen form if we have a citizen
  useEffect(() => {
    if (currentCitizen) {
      navigate("/operator/citizen-form");
    }
  }, [currentCitizen, navigate]);

  const handleGetNextCitizen = async () => {
    dispatch(clearError());
    const result = await dispatch(getNextCitizenThunk());

    if (getNextCitizenThunk.fulfilled.match(result)) {
      if (result.payload) {
        // Citizen found, will be redirected by useEffect
      }
      // If result.payload is null, queueIsEmpty will be set to true
    }
  };

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Operator Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Get the next citizen from the queue
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {queueIsEmpty ? (
            <div className="space-y-4">
              <div className="text-6xl text-gray-400 mb-4">🎉</div>
              <h3 className="text-xl font-semibold text-gray-900">
                No more citizens to call
              </h3>
              <p className="text-gray-600">
                Thank you for your passion and dedication!
              </p>
              <p className="text-sm text-gray-500">
                The queue is currently empty. Please check back later.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-6xl text-blue-500 mb-4">📞</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Ready for the next call?
              </h3>
              <p className="text-gray-600">
                Click the button below to get the next citizen from the queue.
              </p>
              <button
                onClick={handleGetNextCitizen}
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Getting next citizen...
                  </div>
                ) : (
                  "Get Next Citizen"
                )}
              </button>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={handleSignOut}
            className="text-blue-600 hover:text-blue-500 text-sm"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetNextCitizenPage;
