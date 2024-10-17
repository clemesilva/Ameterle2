import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRutinasDeUsuario } from "../../firebase/firebase"; // Función modificada

const PerfilPublico = () => {
  const { userId } = useParams(); // Obtener el userId de la URL
  const [rutinas, setRutinas] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        if (!userId) {
          setError("No se proporcionó un ID de usuario válido.");
          return;
        }

        // Obtener las rutinas y la información del usuario
        const { userInfo, rutinas } = await getRutinasDeUsuario(userId);
        setUserInfo(userInfo);
        setRutinas(rutinas);
      } catch (err) {
        console.error("Error al cargar el perfil:", err);
        setError("Hubo un error al cargar el perfil.");
      }
    };

    cargarPerfil();
  }, [userId]);

  return (
    <div className="p-6 bg-neutral-900 mt-10">
      {error && <p className="text-red-500">{error}</p>}
      {userInfo ? (
        <>
          <h1 className="text-3xl font-bold mb-4 text-yellow-300">
            Perfil de {userInfo.displayName || "Usuario"}
          </h1>
          <p className="text-lg text-yellow-100 mb-8">
            {userInfo.displayName} ha compartido las siguientes rutinas:
          </p>

          <div className="space-y-6">
            {rutinas.length > 0 ? (
              rutinas.map((rutina, index) => (
                <div
                  key={rutina.id}
                  className="relative rounded-lg overflow-hidden text-yellow-100 cursor-pointer transform transition-transform duration-300 hover:scale-105 border border-yellow-100"
                  style={{
                    background: "linear-gradient(to right, #3f3f46, #18181b)",
                  }}
                >
                  <div className="relative p-6 z-10">
                    <h2 className="text-2xl font-semibold mb-2 text-yellow-100">
                      {`${index + 1}. ${rutina.nombre}`}
                    </h2>
                    <p className="text-white">{rutina.descripcion}</p>

                    <a
                      href={rutina.fileURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block bg-yellow-100 text-neutral-800 font-bold py-2 px-4 rounded-lg border border-yellow-100 transition duration-300 hover:bg-yellow-200"
                    >
                      Ver Rutina
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-yellow-100">No hay rutinas disponibles.</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-yellow-100">Cargando perfil...</p>
      )}
    </div>
  );
};

export default PerfilPublico;
