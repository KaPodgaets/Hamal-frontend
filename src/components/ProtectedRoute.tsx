import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import type { RootState } from "../store/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: number;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { token, role } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // Check if user is authenticated
  if (!token) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  if (requiredRole !== undefined && role !== requiredRole) {
    // Redirect to appropriate dashboard based on user's role
    const redirectPath = role === 0 ? "/admin" : "/operator";
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
