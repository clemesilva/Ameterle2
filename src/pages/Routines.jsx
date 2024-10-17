import React from "react";
import { Link } from "react-router-dom";

const RoutineCard = ({ title, description, to }) => (
  <Link
    to={to}
    className="block relative rounded-lg overflow-hidden text-yellow-100 cursor-pointer transform transition-transform duration-300 hover:scale-105 border border-yellow-100"
    style={{
      background: "linear-gradient(to right, #3f3f46, #18181b)", // Degradado de bg-neutral-700 a bg-neutral-900
    }}
  >
    <div className="relative p-6 z-10">
      <h2 className="text-2xl font-semibold mb-2 text-yellow-100">{title}</h2>
      <p className="text-white">{description}</p>
    </div>
  </Link>
);

function Routines() {
  return (
    <div className="p-6 bg-neutral-800 mt-10">
      <h1 className="text-3xl font-bold mb-4 text-yellow-100">Rutinas</h1>
      <p className="text-lg text-white mb-8">
        Explora nuestras rutinas de entrenamiento diseñadas para todos los
        niveles y objetivos.
      </p>
      <div className="space-y-6">
        <RoutineCard
          title="PIERNAS"
          description="Desarrolla fuerza y resistencia en tus piernas con estas rutinas."
          to="/piernas"
        />
        <RoutineCard
          title="CORE"
          description="Fortalece tu tronco con estas rutinas de entrenamiento."
          to="/core"
        />
        <RoutineCard
          title="Tronco Superior"
          description="Mejora tu fuerza en la parte superior del tronco con estas rutinas."
          to="/troncoSuperior"
        />
        <RoutineCard
          title="FULL BODY"
          description="Entrenamiento de cuerpo completo."
          to="/fullbody"
        />
        <RoutineCard
          title="MOVILIDAD/ACTIVACIÓN"
          description="Una buena rutina para mejorar la movilidad."
          to="/movilidadActivacion"
        />
      </div>
    </div>
  );
}

export default Routines;
