import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Crear el contexto de autenticación
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Cambia el estado de carga cuando el usuario ha sido verificado
    });

    // Limpia el observador cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al estado de autenticación
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
