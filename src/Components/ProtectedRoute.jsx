import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/useAuth";

export default function ProtectedRoute({ roles, children }) {
  const { usuario, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(usuario.rol)) {
    return <Navigate to="/" />;
  }

  return children;
}
