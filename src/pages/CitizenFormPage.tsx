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
  OpenInNew,
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
  isDead: boolean;
  isLeftTheCity: boolean;
  hasTemporaryAddress: boolean;
  isTemporaryAbroad: boolean;
  temporaryStreetName: string | null;
  temporaryBuildingNumber: string | null;
  temporaryFlat: string | null;
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

  const hasTemporaryAddress = watch("hasTemporaryAddress");
  const isAnswered = watch("isAnsweredTheCall");
  const isDead = watch("isDead");
  const isLeftTheCity = watch("isLeftTheCity");

  const otherControlsDisabled = !isAnswered || isDead || isLeftTheCity;

  const NAHARIYA_INFO_URL = "https://www.nahariya.muni.il/237";

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
    const formattedData = {
      ...data,
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
      isDead: data.isDead || false,
      isLeftTheCity: data.isLeftTheCity || false,
      hasTemporaryAddress: data.hasTemporaryAddress || false,
      isTemporaryAbroad: data.isTemporaryAbroad || false,
      temporaryStreetName: data.hasTemporaryAddress
        ? data.temporaryStreetName
        : null,
      temporaryBuildingNumber: data.hasTemporaryAddress
        ? data.temporaryBuildingNumber
        : null,
      temporaryFlat: data.hasTemporaryAddress ? data.temporaryFlat : null,
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

    window.location.href = "/operator";
  };

  const handleOpenMokedLink = () => {
    window.open(NAHARIYA_INFO_URL, "_blank", "noopener,noreferrer");
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
              פרטים
            </Typography>
            <Box>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<OpenInNew />}
                onClick={handleOpenMokedLink}
                sx={{ mr: 2 }}
              >
                לפתוח קריאה מוקד 106
              </Button>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={handleCancel}
                sx={{ minWidth: 120 }}
              >
                ביטול
              </Button>
            </Box>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {/* Phone Numbers */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Phone sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">פרטי התקשרות</Typography>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(3, 1fr)",
                  },
                  gap: 2,
                }}
              >
                <TextField
                  {...register("phone1")}
                  label="טלפון 1"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  variant="filled"
                />
                <TextField
                  {...register("phone2")}
                  label="טלפון 2"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  variant="filled"
                />
                <TextField
                  {...register("phone3")}
                  label="טלפון 3"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  variant="filled"
                />
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("isAnsweredTheCall")}
                      defaultChecked={currentCitizen.isAnsweredTheCall}
                    />
                  }
                  label="בן אדם ענה לשיחה"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("isDead")}
                      defaultChecked={currentCitizen.isDead}
                      disabled={!isAnswered}
                    />
                  }
                  label="האם בן אדם נפטר"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("isLeftTheCity")}
                      defaultChecked={currentCitizen.isLeftTheCity}
                      disabled={!isAnswered}
                    />
                  }
                  label="האם בן אדם עזב את העיר באופן קבוע"
                />
              </Box>
            </Paper>

            {/* Address Info */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Home sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">כתובת</Typography>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2 }}>
                <TextField
                  {...register("streetName")}
                  label="רחוב"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                />
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 2,
                  }}
                >
                  <TextField
                    {...register("buildingNumber")}
                    label="מספר בית"
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                  <TextField
                    {...register("flatNumber")}
                    label="דירה"
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("isAddressWrong")}
                      defaultChecked={currentCitizen.isAddressWrong}
                      disabled={otherControlsDisabled}
                    />
                  }
                  label="כתובת שגויה"
                />
                {watch("isAddressWrong") && (
                  <>
                    <TextField
                      {...register("newStreetName", {
                        required: "שדה חובה",
                      })}
                      label="רחוב חדש"
                      fullWidth
                      disabled={otherControlsDisabled}
                      error={!!errors.newStreetName}
                      helperText={errors.newStreetName?.message}
                    />
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 2,
                      }}
                    >
                      <TextField
                        {...register("newBuildingNumber", {
                          required: "שדה חובה",
                        })}
                        label="מספר בית חדש"
                        fullWidth
                        disabled={otherControlsDisabled}
                        error={!!errors.newBuildingNumber}
                        helperText={errors.newBuildingNumber?.message}
                      />
                      <TextField
                        {...register("newFlatNumber", {
                          required: "שדה חובה",
                        })}
                        label="דירה חדשה"
                        fullWidth
                        disabled={otherControlsDisabled}
                        error={!!errors.newFlatNumber}
                        helperText={errors.newFlatNumber?.message}
                      />
                    </Box>
                  </>
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("hasTemporaryAddress")}
                      defaultChecked={currentCitizen.hasTemporaryAddress}
                      disabled={otherControlsDisabled}
                    />
                  }
                  label="כתובת זמנית"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("isTemporaryAbroad")}
                      defaultChecked={currentCitizen.isTemporaryAbroad}
                      disabled={otherControlsDisabled}
                    />
                  }
                  label="האם בן אדם בחול זמני"
                />
                {hasTemporaryAddress && (
                  <>
                    <TextField
                      {...register("temporaryStreetName", {
                        required: "שדה חובה",
                      })}
                      label="רחוב זמני"
                      fullWidth
                      error={!!errors.temporaryStreetName}
                      helperText={errors.temporaryStreetName?.message}
                      disabled={otherControlsDisabled}
                    />
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 2,
                      }}
                    >
                      <TextField
                        {...register("temporaryBuildingNumber", {
                          required: "שדה חובה",
                        })}
                        label="מספר בית זמני"
                        fullWidth
                        error={!!errors.temporaryBuildingNumber}
                        helperText={errors.temporaryBuildingNumber?.message}
                        disabled={otherControlsDisabled}
                      />
                      <TextField
                        {...register("temporaryFlat", {
                          required: "שדה חובה",
                        })}
                        label="דירה זמנית"
                        fullWidth
                        error={!!errors.temporaryFlat}
                        helperText={errors.temporaryFlat?.message}
                        disabled={otherControlsDisabled}
                      />
                    </Box>
                  </>
                )}
              </Box>
            </Paper>

            {/* Personal Info */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Person sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">פרטים אישיים</Typography>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(3, 1fr)",
                  },
                  gap: 2,
                }}
              >
                <TextField
                  {...register("firstName")}
                  label="שם פרטי"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                />
                <TextField
                  {...register("lastName")}
                  label="שם משפחה"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                />
                <TextField
                  {...register("familyNumber", {
                    valueAsNumber: true,
                  })}
                  label="מספר נפשות"
                  type="number"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                />
              </Box>
            </Paper>

            {/* General Info & Status */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Person sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">מידע כללי</Typography>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  },
                  gap: 1,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("isLonely")}
                      defaultChecked={currentCitizen.isLonely}
                      disabled={otherControlsDisabled}
                    />
                  }
                  label="אזרח בודד"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("hasMamad")}
                      defaultChecked={currentCitizen.hasMamad}
                      disabled={otherControlsDisabled}
                    />
                  }
                  label='יש ממ"ד'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("hasMiklatPrati")}
                      defaultChecked={currentCitizen.hasMiklatPrati}
                      disabled={otherControlsDisabled}
                    />
                  }
                  label="יש מקלט פרטי"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("hasMiklatZiburi")}
                      defaultChecked={currentCitizen.hasMiklatZiburi}
                      disabled={otherControlsDisabled}
                    />
                  }
                  label="יש מקלט ציבורי"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("hasMobilityRestriction")}
                      defaultChecked={currentCitizen.hasMobilityRestriction}
                      disabled={otherControlsDisabled}
                    />
                  }
                  label="מוגבלות תנועה"
                />
              </Box>
            </Paper>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Save />}
                disabled={loading || !isValid || !isAnswered}
                sx={{ minWidth: 120, mr: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : "שמור שינויים"}
              </Button>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={handleCancel}
                sx={{ minWidth: 120 }}
              >
                ביטול
              </Button>
            </Box>
            {error && (
              <Alert severity="error" sx={{ mt: 3 }}>
                {error}
              </Alert>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CitizenFormPage;
