import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getRutinasPorAreaYUsuario,
  getRutinasPorArea,
  toggleLikeRutina,
} from "../../firebase/firebase"; // Asegúrate de que esta función existe en este archivo

const RoutinesCompartirArea = () => {
  const { userId, area } = useParams(); // Obtener userId y area de la URL
  const [rutinas, setRutinas] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarRutinas = async () => {
      try {
        const rutinasCargadas = await getRutinasPorAreaYUsuario(area, userId);
        setRutinas(rutinasCargadas);
      } catch (err) {
        console.error("Error al cargar rutinas:", err);
        setError("Hubo un error al cargar las rutinas.");
      }
    };

    cargarRutinas();
  }, [area, userId]);

  return (
    <div className="p-6 bg-neutral-900 mt-10">
      {error && <p className="text-red-500">{error}</p>}
      <h1 className="text-3xl font-bold mb-4 text-yellow-300">
        Rutinas de {area.charAt(0).toUpperCase() + area.slice(1)}
      </h1>

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
    </div>
  );
};

export default RoutinesCompartirArea;
