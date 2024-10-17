import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth(); // Accedemos al estado de carga y al usuario

  if (loading) {
    return <p>Cargando...</p>; // Muestra un mensaje mientras espera la autenticación
  }

  if (!user) {
    // Si no hay usuario autenticado, redirige a la página de login
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, renderiza el contenido protegido
  return children;
};

export default RequireAuth;
