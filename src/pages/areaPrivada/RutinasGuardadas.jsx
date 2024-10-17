import React, { useState, useEffect } from "react";
import { getDocs, collection, query, where } from "firebase/firestore"; // No necesitamos user.uid en Firestore
import { db, auth } from "../../firebase/firebase"; // Importamos auth para obtener el usuario autenticado

const RutinasGuardadas = () => {
  const [savedRoutines, setSavedRoutines] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarRutinasGuardadas = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("Debes iniciar sesión para ver tus rutinas guardadas.");
          return;
        }

        // Consultar todas las rutinas que el usuario ha guardado (donde user.uid esté en savedBy)
        const rutinasRef = collection(db, "rutinas");
        const q = query(
          rutinasRef,
          where("savedBy", "array-contains", user.uid)
        );
        const rutinasSnapshot = await getDocs(q);

        // Mapear las rutinas guardadas
        const rutinasGuardadas = rutinasSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSavedRoutines(rutinasGuardadas);
      } catch (error) {
        console.error("Error al cargar rutinas guardadas:", error);
        setError("Hubo un error al cargar las rutinas guardadas.");
      }
    };

    cargarRutinasGuardadas();
  }, []);

  return (
    <div className="p-6 bg-neutral-900 mt-10">
      <h1 className="text-3xl font-bold mb-4 text-yellow-300">
        Mis Rutinas Guardadas
      </h1>
      <p className="text-lg text-yellow-100 mb-8">
        Estas son las rutinas que has guardado.
      </p>

      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-6">
        {savedRoutines.length > 0 ? (
          savedRoutines.map((rutina, index) => (
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

                {/* Botón para ver la rutina guardada */}
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
          <p className="text-yellow-100">No tienes rutinas guardadas aún.</p>
        )}
      </div>
    </div>
  );
};

export default RutinasGuardadas;
