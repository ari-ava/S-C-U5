import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/not-authorized" />;

  return children;
};

export default ProtectedRoute;