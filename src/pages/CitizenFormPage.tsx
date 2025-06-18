import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";
import {
  Person,
  Home,
  Phone,
  Save,
  Cancel,
  ArrowBack,
} from "@mui/icons-material";
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
  hasMamad: boolean;
  hasMiklatPrati: boolean;
  hasMiklatZiburi: boolean;
  hasMobilityRestriction: boolean;
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
    watch,
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
      hasMamad: data.hasMamad || false,
      hasMiklatPrati: data.hasMiklatPrati || false,
      hasMiklatZiburi: data.hasMiklatZiburi || false,
      hasMobilityRestriction: data.hasMobilityRestriction || false,
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
    console.log("=== CANCEL BUTTON DEBUG ===");
    console.log("Cancel button clicked");
    console.log("navigate function:", typeof navigate);
    console.log("Current location:", window.location.href);

    // Simple alert to confirm button click
    alert("Cancel button clicked! Attempting navigation...");

    try {
      console.log("Attempting React Router navigation...");
      // Try React Router navigation first
      navigate("/operator", { replace: true });
      console.log("React Router navigation called successfully");
    } catch (error) {
      console.error("React Router navigation failed:", error);
      console.log("Falling back to window.location...");
      // Fallback to window.location
      window.location.href = "/operator";
      console.log("window.location.href set to /operator");
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
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Loading citizen data...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Card>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              Citizen Information
            </Typography>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={handleCancel}
              sx={{ minWidth: 120 }}
            >
              Cancel
            </Button>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {/* Phone Numbers - Moved to top */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Phone sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6" component="h2">
                  Phone Numbers
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                  <TextField
                    {...register("phone1")}
                    fullWidth
                    label="Phone 1"
                    type="tel"
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      "& .MuiInputBase-input.Mui-readOnly": {
                        backgroundColor: "grey.100",
                      },
                    }}
                  />
                </Box>

                <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                  <TextField
                    {...register("phone2")}
                    fullWidth
                    label="Phone 2"
                    type="tel"
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      "& .MuiInputBase-input.Mui-readOnly": {
                        backgroundColor: "grey.100",
                      },
                    }}
                  />
                </Box>

                <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                  <TextField
                    {...register("phone3")}
                    fullWidth
                    label="Phone 3"
                    type="tel"
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      "& .MuiInputBase-input.Mui-readOnly": {
                        backgroundColor: "grey.100",
                      },
                    }}
                  />
                </Box>
              </Box>
            </Paper>

            {/* Personal Information */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Person sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6" component="h2">
                  Personal Information
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                  <TextField
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    fullWidth
                    label="First Name"
                    required
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      "& .MuiInputBase-input.Mui-readOnly": {
                        backgroundColor: "grey.100",
                      },
                    }}
                  />
                </Box>

                <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                  <TextField
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    fullWidth
                    label="Last Name"
                    required
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      "& .MuiInputBase-input.Mui-readOnly": {
                        backgroundColor: "grey.100",
                      },
                    }}
                  />
                </Box>

                <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                  <TextField
                    {...register("familyNumber", {
                      required: "Family number is required",
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "Family number must be at least 1",
                      },
                    })}
                    fullWidth
                    label="Family Number"
                    type="number"
                    required
                    error={!!errors.familyNumber}
                    helperText={errors.familyNumber?.message}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      "& .MuiInputBase-input.Mui-readOnly": {
                        backgroundColor: "grey.100",
                      },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    flex: "1 1 300px",
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register("isAnsweredTheCall")}
                        color="primary"
                      />
                    }
                    label="Citizen Answered The Call"
                  />
                </Box>

                <Box
                  sx={{
                    flex: "1 1 300px",
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox {...register("isLonely")} color="primary" />
                    }
                    label="Is Lonely"
                  />
                </Box>

                <Box
                  sx={{
                    flex: "1 1 300px",
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox {...register("hasMamad")} color="primary" />
                    }
                    label="Has Mamad"
                  />
                </Box>

                <Box
                  sx={{
                    flex: "1 1 300px",
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register("hasMiklatPrati")}
                        color="primary"
                      />
                    }
                    label="Has Miklat Prati"
                  />
                </Box>

                <Box
                  sx={{
                    flex: "1 1 300px",
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register("hasMiklatZiburi")}
                        color="primary"
                      />
                    }
                    label="Has Miklat Ziburi"
                  />
                </Box>

                <Box
                  sx={{
                    flex: "1 1 300px",
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register("hasMobilityRestriction")}
                        color="primary"
                      />
                    }
                    label="Has Mobility Restriction"
                  />
                </Box>
              </Box>
            </Paper>

            {/* Current Address */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Home sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6" component="h2">
                  Current Address
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                  <TextField
                    {...register("streetName", {
                      required: "Street name is required",
                    })}
                    fullWidth
                    label="Street Name"
                    required
                    error={!!errors.streetName}
                    helperText={errors.streetName?.message}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      "& .MuiInputBase-input.Mui-readOnly": {
                        backgroundColor: "grey.100",
                      },
                    }}
                  />
                </Box>

                <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                  <TextField
                    {...register("buildingNumber", {
                      required: "Building number is required",
                    })}
                    fullWidth
                    label="Building Number"
                    required
                    error={!!errors.buildingNumber}
                    helperText={errors.buildingNumber?.message}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      "& .MuiInputBase-input.Mui-readOnly": {
                        backgroundColor: "grey.100",
                      },
                    }}
                  />
                </Box>

                <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                  <TextField
                    {...register("flatNumber", {
                      required: "Flat number is required",
                    })}
                    fullWidth
                    label="Flat Number"
                    required
                    error={!!errors.flatNumber}
                    helperText={errors.flatNumber?.message}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      "& .MuiInputBase-input.Mui-readOnly": {
                        backgroundColor: "grey.100",
                      },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    flex: "1 1 300px",
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register("isAddressWrong")}
                        color="primary"
                      />
                    }
                    label="Address is Wrong"
                  />
                </Box>
              </Box>
            </Paper>

            {/* New Address (if address is wrong) */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
                New Address (if current address is wrong)
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                  <TextField
                    {...register("newStreetName")}
                    fullWidth
                    label="New Street Name"
                    disabled={!watch("isAddressWrong")}
                    sx={{
                      "& .MuiInputBase-root.Mui-disabled": {
                        backgroundColor: "grey.100",
                      },
                    }}
                  />
                </Box>

                <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                  <TextField
                    {...register("newBuildingNumber")}
                    fullWidth
                    label="New Building Number"
                    disabled={!watch("isAddressWrong")}
                    sx={{
                      "& .MuiInputBase-root.Mui-disabled": {
                        backgroundColor: "grey.100",
                      },
                    }}
                  />
                </Box>

                <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                  <TextField
                    {...register("newFlatNumber")}
                    fullWidth
                    label="New Flat Number"
                    disabled={!watch("isAddressWrong")}
                    sx={{
                      "& .MuiInputBase-root.Mui-disabled": {
                        backgroundColor: "grey.100",
                      },
                    }}
                  />
                </Box>
              </Box>
            </Paper>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                pt: 3,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  console.log("Test navigation clicked");
                  navigate("/operator", { replace: true });
                }}
                sx={{ minWidth: 120 }}
              >
                Test Nav
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !isValid}
                startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                sx={{ minWidth: 140 }}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          </Box>

          {/* Cancel button outside form to prevent form interference */}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCancel();
              }}
              sx={{ minWidth: 120 }}
            >
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CitizenFormPage;
