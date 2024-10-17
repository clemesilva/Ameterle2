import React from "react";
import { Link, useParams } from "react-router-dom";

const RoutineCard = ({ title, description, to }) => (
  <Link
    to={to}
    className="block relative rounded-lg overflow-hidden text-neutral-800 cursor-pointer transform transition-transform duration-300 hover:scale-105 border border-yellow-300"
    style={{
      background: "linear-gradient(to right, #4b5563, #1f2937)",
    }}
  >
    <div className="relative p-6 z-10">
      <h2 className="text-2xl font-semibold mb-2 text-yellow-300">{title}</h2>
      <p className="text-yellow-100">{description}</p>
    </div>
  </Link>
);

const RoutinesCompartir = () => {
  const { userId } = useParams();

  return (
    <div className="p-6 bg-neutral-800 mt-10">
      <h1 className="text-3xl font-bold mb-4 text-yellow-100">
        Rutinas compartidas
      </h1>
      <p className="text-lg text-white mb-8">
        Explora las rutinas compartidas por este usuario.
      </p>
      <div className="space-y-6">
        <RoutineCard
          title="PIERNAS"
          description="Desarrolla fuerza y resistencia en tus piernas."
          to={`/perfil/${userId}/piernas`}
        />
        <RoutineCard
          title="CORE"
          description="Fortalece tu tronco con estas rutinas de entrenamiento."
          to={`/perfil/${userId}/core`}
        />
        <RoutineCard
          title="Tronco Superior"
          description="Mejora tu fuerza en la parte superior del tronco."
          to={`/perfil/${userId}/troncoSuperior`}
        />
        <RoutineCard
          title="FULL BODY"
          description="Entrenamiento de cuerpo completo."
          to={`/perfil/${userId}/fullbody`}
        />
        <RoutineCard
          title="MOVILIDAD/ACTIVACIÓN"
          description="Una buena rutina para mejorar la movilidad."
          to={`/perfil/${userId}/movilidadActivacion`}
        />
      </div>
    </div>
  );
};

export default RoutinesCompartir;
