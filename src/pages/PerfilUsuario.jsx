import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase"; // Asegúrate de importar la instancia de autenticación
import { Link } from "react-router-dom";

const RoutineCardPrivate = ({ title, description, to }) => (
  <Link
    to={to}
    className="block relative rounded-lg overflow-hidden text-neutral-800 cursor-pointer transform transition-transform duration-300 hover:scale-105 border border-yellow-300"
    style={{
      background: "linear-gradient(to right, #4b5563, #1f2937)", // Degradado de tonos oscuros
    }}
  >
    <div className="relative p-6 z-10">
      <h2 className="text-2xl font-semibold mb-2 text-yellow-300">{title}</h2>
      <p className="text-yellow-100">{description}</p>
    </div>
  </Link>
);

function PerfilUsuario() {
  const [user, setUser] = useState(null);

  // Obtener la información del usuario al montar el componente
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser); // Guardamos los datos del usuario autenticado
    }
  }, []);

  return (
    <div className="p-6 bg-neutral-900 mt-10">
      <h1 className="text-3xl font-bold mb-4 text-yellow-300">Mi Perfil</h1>
      <p className="text-lg text-yellow-100 mb-8">
        Aquí puedes ver y gestionar tus rutinas personales.
      </p>

      {/* Información del usuario */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user?.photoURL || "https://via.placeholder.com/80"} // Mostramos la foto del usuario o un placeholder
          alt="Perfil"
          className="w-20 h-20 rounded-full border-4 border-yellow-300"
        />
        <div>
          <p className="text-2xl font-semibold text-yellow-100">
            {user?.displayName || "Usuario"} {/* Nombre del usuario */}
          </p>
          <p className="text-yellow-300">{user?.email}</p>{" "}
          {/* Email del usuario */}
        </div>

        {/* Botón para acceder a las Rutinas Guardadas */}
        <Link
          to="/rutinas-guardadas"
          className="ml-auto bg-yellow-100 text-neutral-800 py-2 px-4 rounded-lg hover:bg-yellow-200 transition-all"
        >
          Rutinas Guardadas
        </Link>
      </div>

      {/* Rutinas del usuario */}
      <div className="space-y-6">
        <RoutineCardPrivate
          title="PIERNAS"
          description="Tus rutinas personales para piernas."
          to="/piernasprivado"
        />
        <RoutineCardPrivate
          title="CORE"
          description="Fortalece tu núcleo con estas rutinas personales."
          to="/coreprivado"
        />
        <RoutineCardPrivate
          title="Tronco Superior"
          description="Rutinas para mejorar tu fuerza en la parte superior del tronco."
          to="/mis-rutinas/troncoSuperior"
        />
        <RoutineCardPrivate
          title="FULL BODY"
          description="Rutinas completas para todo el cuerpo."
          to="/mis-rutinas/fullbody"
        />
        <RoutineCardPrivate
          title="MOVILIDAD/ACTIVACIÓN"
          description="Rutinas para mejorar tu movilidad."
          to="/mis-rutinas/movilidadActivacion"
        />
      </div>
    </div>
  );
}

export default PerfilUsuario;
