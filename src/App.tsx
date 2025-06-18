import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import LoginPage from "./pages/LoginPage";
import GetNextCitizenPage from "./pages/GetNextCitizenPage";
import CitizenFormPage from "./pages/CitizenFormPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDataManagementPage from "./pages/AdminDataManagementPage";
import AdminUserManagementPage from "./pages/AdminUserManagementPage";
import ProtectedRoute from "./components/ProtectedRoute";
import type { RootState } from "./store/store";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  const { token, role } = useSelector((state: RootState) => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole={0}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/citizen-data"
              element={
                <ProtectedRoute requiredRole={0}>
                  <AdminDataManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRole={0}>
                  <AdminUserManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/operator"
              element={
                <ProtectedRoute requiredRole={1}>
                  <GetNextCitizenPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/operator/citizen-form"
              element={
                <ProtectedRoute requiredRole={1}>
                  <CitizenFormPage />
                </ProtectedRoute>
              }
            />

            {/* Default redirect */}
            <Route
              path="/"
              element={
                token ? (
                  <Navigate to={role === 0 ? "/admin" : "/operator"} replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
