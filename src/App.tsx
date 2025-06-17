import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import GetNextCitizenPage from "./pages/GetNextCitizenPage";
import CitizenFormPage from "./pages/CitizenFormPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDataManagementPage from "./pages/AdminDataManagementPage";
import AdminUserManagementPage from "./pages/AdminUserManagementPage";
import ProtectedRoute from "./components/ProtectedRoute";
import type { RootState } from "./store/store";

function App() {
  const { token, role } = useSelector((state: RootState) => state.auth);

  return (
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
  );
}

export default App;
