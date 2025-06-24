import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Paper,
  Grid,
} from "@mui/material";
import type { RootState, AppDispatch } from "../store/store";
import {
  clearCurrentCitizen,
  post106CaseThunk,
} from "../store/slices/citizensSlice";
import CopyableField from "../components/CopyableField";

const Case106DataPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { currentCitizen, loading, error } = useSelector(
    (state: RootState) => state.citizens
  );
  const [caseNumber, setCaseNumber] = useState("");
  const [isValidCaseNumber, setIsValidCaseNumber] = useState(false);

  // Redirect if no current citizen
  useEffect(() => {
    if (!currentCitizen) {
      navigate("/operator");
    }
  }, [currentCitizen, navigate]);

  // Validate case number (must be 6 digits)
  useEffect(() => {
    setIsValidCaseNumber(/^\d{6}$/.test(caseNumber));
  }, [caseNumber]);

  // Navigate to operator page on successful submission
  useEffect(() => {
    if (!loading && !error && !currentCitizen) {
      navigate("/operator");
    }
  }, [loading, error, currentCitizen, navigate]);

  const handleCancel = () => {
    dispatch(clearCurrentCitizen());
    navigate("/operator");
  };

  const handleSave = async () => {
    if (currentCitizen && isValidCaseNumber) {
      await dispatch(
        post106CaseThunk({
          id: currentCitizen.id,
          caseNumber: caseNumber,
        })
      );
    }
  };

  const municipalityMessage = `שלום, אני מתקשר/ת לגבי אזרח/ית בשם ${
    currentCitizen?.firstName || ""
  } ${currentCitizen?.lastName || ""}, ת.ז. ${
    currentCitizen?.id || ""
  }, טלפון ${currentCitizen?.phone1 || ""}, כתובת ${
    currentCitizen?.streetName || ""
  } ${currentCitizen?.buildingNumber || ""}. נדרש לפתוח תיק 106.`;

  if (!currentCitizen) {
    return null; // Will redirect via useEffect
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        פתיחת תיק 106
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          פרטי האזרח/ית
        </Typography>

        <Grid container spacing={2}>
          <Grid>
            <CopyableField
              label="שם פרטי"
              value={currentCitizen.firstName || ""}
            />
          </Grid>
          <Grid>
            <CopyableField
              label="שם משפחה"
              value={currentCitizen.lastName || ""}
            />
          </Grid>
          <Grid>
            <CopyableField label="טלפון" value={currentCitizen.phone1 || ""} />
          </Grid>
          <Grid>
            <CopyableField
              label="רחוב"
              value={currentCitizen.streetName || ""}
            />
          </Grid>
          <Grid>
            <CopyableField
              label="מספר בית"
              value={currentCitizen.buildingNumber || ""}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          הודעה למוקד העירוני
        </Typography>
        <CopyableField label="הודעה למוקד" value={municipalityMessage} />
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          מספר תיק 106
        </Typography>
        <TextField
          label="מספר תיק (6 ספרות)"
          value={caseNumber}
          onChange={(e) => setCaseNumber(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 6 }}
          error={caseNumber.length > 0 && !isValidCaseNumber}
          helperText={
            caseNumber.length > 0 && !isValidCaseNumber
              ? "מספר התיק חייב להכיל 6 ספרות"
              : ""
          }
        />
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={handleCancel} disabled={loading}>
          ביטול
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading || !isValidCaseNumber}
        >
          {loading ? "שומר..." : "שמור"}
        </Button>
      </Box>
    </Container>
  );
};

export default Case106DataPage;
