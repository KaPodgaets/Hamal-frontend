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
import { OpenInNew } from "@mui/icons-material";
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

  const NAHARIYA_INFO_URL = "https://www.nahariya.muni.il/237";

  const handleOpenMokedLink = () => {
    window.open(NAHARIYA_INFO_URL, "_blank", "noopener,noreferrer");
  };

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

  const formatTimestamp = (timestamp: string | null | undefined) => {
    if (!timestamp) return "";
    // Remove seconds from timestamp (assuming format like "2024-01-01 12:34:56")
    return timestamp.replace(/:\d{2}$/, "");
  };

  const municipalityMessage = `נכתב על ידי חמ"ל
שם: ${currentCitizen?.firstName || ""} ${currentCitizen?.lastName || ""}
טלפון: ${currentCitizen?.phone1 || ""}
${currentCitizen?.phone2 ? `טלפון נוסף: ${currentCitizen.phone2}\n` : ""}${
    currentCitizen?.phone3 ? `טלפון נוסף: ${currentCitizen.phone3}\n` : ""
  }כתובת: ${currentCitizen?.streetName || ""} ${
    currentCitizen?.buildingNumber || ""
  }
התושב לא ענה על השיחות מחמל בתאריך:
${formatTimestamp(currentCitizen?.firstAppearanceTimestamp)}${
    currentCitizen?.secondAppearanceTimestamp
      ? `\n${formatTimestamp(currentCitizen.secondAppearanceTimestamp)}`
      : ""
  }${
    currentCitizen?.thirdAppearanceTimestamp
      ? `\n${formatTimestamp(currentCitizen.thirdAppearanceTimestamp)}`
      : ""
  }`;

  if (!currentCitizen) {
    return null; // Will redirect via useEffect
  }
  const email = "mitnadvim20252025@gmail.com";

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        פתיחת תיק 106
      </Typography>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<OpenInNew />}
        onClick={handleOpenMokedLink}
        sx={{ ml: "auto", display: "block" }}
      >
        לפתוח קריאה מוקד 106
      </Button>

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
            <CopyableField label="email" value={email || ""} />
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
        <CopyableField
          label="הודעה למוקד"
          value={municipalityMessage}
          multiline={true}
          rows={6}
        />
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
