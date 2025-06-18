import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Container,
  Card,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import {
  People,
  Settings,
  Logout,
  Download,
  Upload,
} from "@mui/icons-material";
import { logout } from "../store/slices/authSlice";
import type { AppDispatch } from "../store/store";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/login");
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
              Admin Dashboard
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Logout />}
              onClick={handleSignOut}
              sx={{ minWidth: 120 }}
            >
              Sign out
            </Button>
          </Box>

          {/* Dashboard Cards */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            {/* Citizen Data Management */}
            <Card
              sx={{
                flex: "1 1 400px",
                minWidth: 0,
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                },
              }}
              onClick={() => navigate("/admin/citizen-data")}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <People sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 600 }}
                  >
                    Citizen Data Management
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Download, upload, and manage citizen data in bulk. Export data
                  for analysis and import new records.
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Download sx={{ fontSize: 20, color: "primary.main" }} />
                  <Upload sx={{ fontSize: 20, color: "primary.main" }} />
                </Box>
              </CardContent>
            </Card>

            {/* User Management */}
            <Card
              sx={{
                flex: "1 1 400px",
                minWidth: 0,
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                },
              }}
              onClick={() => navigate("/admin/users")}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Settings
                    sx={{ fontSize: 40, color: "secondary.main", mr: 2 }}
                  />
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 600 }}
                  >
                    User Management
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Create, update, and delete user accounts. Manage roles and
                  permissions for operators and administrators.
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <People sx={{ fontSize: 20, color: "secondary.main" }} />
                  <Settings sx={{ fontSize: 20, color: "secondary.main" }} />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminDashboard;
