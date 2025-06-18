import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Card,
  CardContent,
  Button,
  Typography,
  Alert,
  Paper,
} from "@mui/material";
import {
  ArrowBack,
  Download,
  Upload,
  DeleteForever,
  Warning,
} from "@mui/icons-material";
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
              Citizen Data Management
            </Typography>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate("/admin")}
              sx={{ minWidth: 120 }}
            >
              Back to Dashboard
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Download Section */}
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Download sx={{ fontSize: 32, color: "primary.main", mr: 2 }} />
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 600 }}
                >
                  Download Citizens Data
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Download the current list of all citizens as a CSV file for
                analysis or backup purposes.
              </Typography>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={handleDownloadCitizens}
                sx={{ minWidth: 160 }}
              >
                Download Citizens
              </Button>
            </Paper>

            {/* Upload Section */}
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Upload sx={{ fontSize: 32, color: "primary.main", mr: 2 }} />
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 600 }}
                >
                  Upload Citizens Data
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Upload a CSV file containing citizen data to replace the current
                list. Make sure the file format matches the expected structure.
              </Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<Upload />}
                sx={{ minWidth: 160 }}
              >
                Choose CSV File
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleUploadCitizens}
                  style={{ display: "none" }}
                />
              </Button>
            </Paper>

            {/* Clear Data Section */}
            <Paper
              sx={{
                p: 3,
                border: "2px solid",
                borderColor: "error.main",
                bgcolor: "error.50",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Warning sx={{ fontSize: 32, color: "error.main", mr: 2 }} />
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 600, color: "error.main" }}
                >
                  Clear All Citizen Data
                </Typography>
              </Box>
              <Alert severity="warning" sx={{ mb: 3 }}>
                This action will permanently delete all citizen data from the
                system. This operation cannot be undone.
              </Alert>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteForever />}
                onClick={handleClearAllData}
                sx={{ minWidth: 160 }}
              >
                Clear All Data
              </Button>
            </Paper>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminDataManagementPage;
