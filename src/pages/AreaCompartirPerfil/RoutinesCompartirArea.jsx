import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getRutinasPorAreaYUsuario,
  getRutinasPorArea,
  auth,
} from "../../firebase/firebase";

const RoutinesCompartirArea = () => {
  const { userId, area } = useParams();
  const [rutinas, setRutinas] = useState([]);
  const [error, setError] = useState("");
  const user = auth.currentUser;

  const cargarRutinas = async () => {
    try {
      let rutinasUsuario;
      if (userId) {
        // Obtenemos las rutinas del usuario específico para el área
        rutinasUsuario = await getRutinasPorAreaYUsuario(area, userId);
        console.log("las obtuvimos lpmm"); // Corregido: console.log en lugar de console
      } else {
        // Si no hay userId, obtenemos todas las rutinas públicas del área
        rutinasUsuario = await getRutinasPorArea(area);
      }

      console.log("Rutinas cargadas:", rutinasUsuario);
      setRutinas(rutinasUsuario);
    } catch (error) {
      console.error(`Error al cargar rutinas de ${area}:`, error);
      setError(`Hubo un error al cargar las rutinas de ${area}.`);
    }
  };

  useEffect(() => {
    cargarRutinas();
  }, [area, userId]);

  return (
    <div className="p-6 bg-neutral-900 mt-10">
      {error && <p className="text-red-500">{error}</p>}
      <h1 className="text-3xl font-bold mb-4 text-yellow-300">
        Rutinas de {area.charAt(0).toUpperCase() + area.slice(1)}
      </h1>

      <div className="space-y-6 mt-5">
        {rutinas.length > 0 ? (
          rutinas.map((rutina, index) => (
            <div
              key={rutina.id}
              className="relative rounded-lg overflow-hidden text-yellow-100 cursor-pointer transform transition-transform duration-300 hover:scale-105 border border-yellow-300"
              style={{
                background: "linear-gradient(to right, #4b5563, #1f2937)",
              }}
            >
              <div className="relative p-6 z-10">
                <h2 className="text-2xl font-semibold mb-2 text-yellow-300">
                  {`${index + 1}. ${rutina.nombre}`}
                </h2>
                <p className="text-yellow-100">{rutina.descripcion}</p>

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
            No hay rutinas disponibles para {area}.
          </p>
        )}
      </div>
    </div>
  );
};

export default RoutinesCompartirArea;
