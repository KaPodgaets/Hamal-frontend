import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  updateCitizenThunk,
  clearError,
  clearCurrentCitizen,
} from "../store/slices/citizensSlice";
import type { AppDispatch, RootState } from "../store/store";

interface CitizenFormData {
  streetName: string;
  buildingNumber: string;
  flatNumber: string;
  firstName: string;
  lastName: string;
  familyNumber: number;
  isLonely: boolean;
  isAddressWrong: boolean;
  newStreetName: string | null;
  newBuildingNumber: string | null;
  newFlatNumber: string | null;
  phone1: string | null;
  phone2: string | null;
  phone3: string | null;
  isAnsweredTheCall: boolean;
}

const CitizenFormPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentCitizen, loading, error } = useSelector(
    (state: RootState) => state.citizens
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CitizenFormData>({
    mode: "onChange", // Enable real-time validation
  });

  // Populate form when citizen data is available
  useEffect(() => {
    if (currentCitizen) {
      reset(currentCitizen);
    }
  }, [currentCitizen, reset]);

  // Redirect if no citizen is selected
  useEffect(() => {
    if (!currentCitizen) {
      navigate("/operator");
    }
  }, [currentCitizen, navigate]);

  const onSubmit = async (data: CitizenFormData) => {
    console.log("Form submitted with data:", data);
    console.log("Form errors:", errors);
    console.log("Form is valid:", isValid);

    if (!currentCitizen) {
      console.error("No current citizen available");
      return;
    }

    console.log("Submitting form data:", data);
    console.log("Citizen ID:", currentCitizen.id);

    dispatch(clearError());

    // Ensure all required fields are present and properly formatted
    const formattedData: CitizenFormData = {
      streetName: data.streetName || "",
      buildingNumber: data.buildingNumber || "",
      flatNumber: data.flatNumber || "",
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      familyNumber: data.familyNumber || 1,
      isLonely: data.isLonely || false,
      isAddressWrong: data.isAddressWrong || false,
      newStreetName: data.newStreetName || null,
      newBuildingNumber: data.newBuildingNumber || null,
      newFlatNumber: data.newFlatNumber || null,
      phone1: data.phone1 || null,
      phone2: data.phone2 || null,
      phone3: data.phone3 || null,
      isAnsweredTheCall: data.isAnsweredTheCall || false,
    };

    console.log("Formatted data for API:", formattedData);

    try {
      const result = await dispatch(
        updateCitizenThunk({ id: currentCitizen.id, data: formattedData })
      );

      console.log("Update result:", result);

      if (updateCitizenThunk.fulfilled.match(result)) {
        console.log("Update successful, redirecting to /operator");
        // Clear the current citizen to force a fresh fetch
        dispatch(clearCurrentCitizen());
        // Redirect back to get next citizen page
        navigate("/operator");
      } else if (updateCitizenThunk.rejected.match(result)) {
        console.error("Update failed:", result.payload);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const handleCancel = () => {
    // Simple alert to confirm button click
    alert("Cancel button clicked! Attempting navigation...");

    try {
      navigate("/operator", { replace: true });
      console.log("React Router navigation called successfully");
    } catch (error) {
      console.error("React Router navigation failed:", error);
      console.log("Falling back to window.location...");
      // Fallback to window.location
      window.location.href = "/operator";
    }

    // Additional test - try immediate navigation
    setTimeout(() => {
      console.log("Testing navigation after 1 second...");
      if (window.location.pathname !== "/operator") {
        console.log("Navigation didn't work, forcing with window.location");
        window.location.href = "/operator";
      }
    }, 1000);
  };

  if (!currentCitizen) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading citizen data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Citizen Information
            </h1>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name *
                  </label>
                  <input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name *
                  </label>
                  <input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Family Number *
                  </label>
                  <input
                    {...register("familyNumber", {
                      required: "Family number is required",
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "Family number must be at least 1",
                      },
                    })}
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.familyNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.familyNumber.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      {...register("isLonely")}
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Is Lonely
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Address */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Current Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Street Name *
                  </label>
                  <input
                    {...register("streetName", {
                      required: "Street name is required",
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.streetName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.streetName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Building Number *
                  </label>
                  <input
                    {...register("buildingNumber", {
                      required: "Building number is required",
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.buildingNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.buildingNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Flat Number *
                  </label>
                  <input
                    {...register("flatNumber", {
                      required: "Flat number is required",
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.flatNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.flatNumber.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center">
                  <input
                    {...register("isAddressWrong")}
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Address is Wrong
                  </label>
                </div>
              </div>
            </div>

            {/* New Address (if address is wrong) */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                New Address (if current address is wrong)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Street Name
                  </label>
                  <input
                    {...register("newStreetName")}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Building Number
                  </label>
                  <input
                    {...register("newBuildingNumber")}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Flat Number
                  </label>
                  <input
                    {...register("newFlatNumber")}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Phone Numbers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone 1
                  </label>
                  <input
                    {...register("phone1")}
                    type="tel"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone 2
                  </label>
                  <input
                    {...register("phone2")}
                    type="tel"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone 3
                  </label>
                  <input
                    {...register("phone3")}
                    type="tel"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Call Status */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Call Status
              </h3>
              <div className="flex items-center">
                <input
                  {...register("isAnsweredTheCall")}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Citizen Answered The Call
                </label>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => {
                  console.log("Test navigation clicked");
                  navigate("/operator", { replace: true });
                }}
                className="px-4 py-2 border border-green-300 rounded-md text-sm font-medium text-green-700 hover:bg-green-50"
              >
                Test Nav
              </button>
              <button
                type="submit"
                disabled={loading || !isValid}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>

          {/* Cancel button outside form to prevent form interference */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                alert("Direct navigation test");
                window.location.href = "/operator";
              }}
              className="px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
            >
              Direct Nav Test
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCancel();
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenFormPage;
