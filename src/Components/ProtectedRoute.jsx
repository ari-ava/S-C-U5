import { Navigate } from "react-router-dom";
import { useAuth } from "../services/useAuth";

export default function ProtectedRoute({ roles, children }) {
  const { usuario, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  // Invitado no logueado
  if (!usuario) {
    return <Navigate to="/login" />;
  }

  // Rol no permitido
  if (!roles.includes(usuario.rol)) {
    return <Navigate to="/" />;
  }

  return children;
}
