import React, { useState, useEffect } from "react";
import {
  getRutinasPorAreaYUsuario,
  getRutinasPorArea, // Para obtener las rutinas públicas del área
  toggleLikeRutina,
  auth,
} from "../../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function AreaPrivadaComponent({ area }) {
  const [rutinas, setRutinas] = useState([]);
  const [likes, setLikes] = useState({});
  const [error, setError] = useState("");
  const user = auth.currentUser;

  const cargarRutinas = async () => {
    try {
      if (user) {
        // Obtenemos las rutinas del usuario para el área privada
        const rutinasUsuario = await getRutinasPorAreaYUsuario(area, user.uid);

        // Obtenemos las rutinas públicas del área para obtener likes actualizados
        const rutinasPublicas = await getRutinasPorArea(area);

        // Creamos un mapa para asociar las rutinas privadas con los likes públicos
        const likesEstado = {};
        rutinasUsuario.forEach((rutinaUsuario) => {
          const rutinaPublica = rutinasPublicas.find(
            (r) => r.id === rutinaUsuario.id
          );
          if (rutinaPublica) {
            // Asignamos los likes de la rutina pública a la privada
            rutinaUsuario.likes = rutinaPublica.likes || 0;
            rutinaUsuario.likesBy = rutinaPublica.likesBy || [];

            // Verificamos si el usuario actual ha dado like
            if (rutinaUsuario.likesBy.includes(user.uid)) {
              likesEstado[rutinaUsuario.id] = true;
            }
          }
        });

        setLikes(likesEstado);
        setRutinas(rutinasUsuario);
      }
    } catch (error) {
      console.error(`Error al cargar rutinas de ${area}:`, error);
      setError(`Hubo un error al cargar tus rutinas de ${area}.`);
    }
  };

  useEffect(() => {
    cargarRutinas();
  }, [user]);

  const handleLike = async (rutinaId) => {
    try {
      setError("");
      await toggleLikeRutina(rutinaId);
      setLikes((prevLikes) => ({
        ...prevLikes,
        [rutinaId]: !prevLikes[rutinaId],
      }));
      cargarRutinas(); // Recargar las rutinas para actualizar los likes
    } catch (error) {
      console.error("Error al dar o quitar like:", error);
      setError(error.message);
    }
  };

  return (
    <div className="p-6 bg-neutral-900 mt-10">
      <h1 className="text-3xl font-bold mb-4 text-yellow-300">
        Mis Rutinas de {area}
      </h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-6 mt-5">
        {rutinas.length > 0 ? (
          rutinas.map((rutina, index) => (
            <div
              key={rutina.id}
              className="relative rounded-lg overflow-hidden text-yellow-100 cursor-pointer transform transition-transform duration-300 hover:scale-105 border border-yellow-300"
              style={{
                background: "linear-gradient(to right, #4b5563, #1f2937)", // Fondo oscuro degradado
              }}
            >
              <div className="relative p-6 z-10">
                <h2 className="text-2xl font-semibold mb-2 text-yellow-300">
                  {`${index + 1}. ${rutina.nombre}`}
                </h2>
                <p className="text-yellow-100">{rutina.descripcion}</p>

                <div className="mt-4 flex items-center space-x-2">
                  <button
                    onClick={() => handleLike(rutina.id)}
                    className={`focus:outline-none transition-transform duration-300 ${
                      likes[rutina.id]
                        ? "text-yellow-300"
                        : "text-neutral-800 hover:scale-105"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="2x"
                      style={{
                        stroke: "#fef9c3",
                        strokeWidth: "20px",
                      }}
                    />
                  </button>
                  <p className="text-yellow-100">{rutina.likes ?? 0}</p>
                </div>

                <a
                  href={rutina.fileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-yellow-300 text-neutral-800 font-bold py-2 px-4 rounded-lg border border-yellow-300 transition duration-300 hover:bg-yellow-400"
                >
                  Ver Rutina
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-yellow-100">
            No has subido ninguna rutina de {area}.
          </p>
        )}
      </div>
    </div>
  );
}

export default AreaPrivadaComponent;
