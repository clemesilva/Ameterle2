import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithGooglePopup } from "../firebase/firebase";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controlar el estado de carga

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Maneja el inicio de sesión con Google
  const handleGoogleSignIn = async () => {
    setLoading(true); // Mostrar el indicador de carga
    try {
      await signInWithGooglePopup();
      alert("Inicio de sesión con Google exitoso");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      setError("Error al iniciar sesión con Google. Inténtalo más tarde.");
    } finally {
      setLoading(false); // Ocultar el indicador de carga
    }
  };

  return (
    <div className="max-w-md mx-auto bg-neutral-800 p-8 rounded-lg border-2 border-neutral-600 mt-24">
      <h2 className="text-2xl font-semibold text-yellow-100 text-center mb-6">
        Iniciar Sesión
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <button
        onClick={handleGoogleSignIn}
        className="w-full bg-yellow-100 text-neutral-800 py-2 px-4 rounded-lg font-bold hover:bg-yellow-200 transition-all"
        disabled={loading} // Deshabilitar el botón mientras está cargando
      >
        {loading ? "Cargando..." : "Iniciar sesión con Google"}{" "}
        {/* Cambiar texto */}
      </button>
    </div>
  );
};

export default Login;
