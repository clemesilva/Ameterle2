import React, { useState, useEffect } from "react";
import {
  getSensationsByUser,
  auth,
  addSensacion,
  deleteSensacion,
} from "../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Footer1 from "../components/Footer";

function Sensations() {
  const [sensaciones, setSensaciones] = useState([]);
  const [nuevaSensacion, setNuevaSensacion] = useState("");
  const [error, setError] = useState("");

  const cargarSensaciones = async () => {
    try {
      const sensacionesUsuario = await getSensationsByUser();
      setSensaciones(sensacionesUsuario);
    } catch (error) {
      console.error("Error al cargar sensaciones:", error);
      setError("Hubo un error al cargar las sensaciones.");
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      cargarSensaciones();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await addSensacion(nuevaSensacion);
      setNuevaSensacion("");
      cargarSensaciones();
    } catch (error) {
      console.error("Error al agregar sensación:", error);
      setError("Hubo un error al agregar tu sensación.");
    }
  };

  const handleDelete = async (sensacionId) => {
    try {
      await deleteSensacion(sensacionId);
      cargarSensaciones();
    } catch (error) {
      console.error("Error al eliminar sensación:", error);
      setError("Hubo un error al eliminar la sensación.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-800">
      <div className="flex-grow p-6 mt-10">
        <h1 className="text-3xl font-bold mb-4 text-yellow-100">
          Mis Sensaciones
        </h1>
        <p className="text-lg mb-8 text-white">
          Aquí puedes escribir y ver tus sensaciones. Solo tú puedes ver lo que
          escribes.
        </p>
        {error && <p className="text-red-500">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="flex items-center space-x-4 mb-6"
        >
          <input
            type="text"
            value={nuevaSensacion}
            onChange={(e) => setNuevaSensacion(e.target.value)}
            className="flex-1 p-3 border border-neutral-600 rounded-lg bg-neutral-700 text-yellow-100"
            placeholder="Añade una nueva sensación..."
            required
          />
          <button
            type="submit"
            className="bg-yellow-100 text-neutral-800 font-bold py-2 px-4 rounded-lg transition duration-300 hover:bg-yellow-200"
          >
            Comentar
          </button>
        </form>
        <div className="space-y-6 mt-5 max-h-[300px] overflow-y-scroll">
          {sensaciones.length > 0 ? (
            sensaciones.map((sensacion) => (
              <div
                key={sensacion.id}
                className="p-4 rounded-lg border border-neutral-600 text-yellow-100 bg-neutral-700 relative"
              >
                <p>{sensacion.sensacion}</p>
                <p className="text-xs text-neutral-400">
                  {new Date(
                    sensacion.createdAt.seconds * 1000
                  ).toLocaleString()}
                </p>
                <button
                  onClick={() => handleDelete(sensacion.id)}
                  className="absolute top-2 right-2 text-yellow-100 hover:text-yellow-200 transition-colors"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-lg" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-white">Aún no has escrito ninguna sensación.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sensations;
