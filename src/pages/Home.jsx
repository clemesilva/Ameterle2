import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-neutral-800 text-yellow-100 min-h-screen relative">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Fondo decorativo superior */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-yellow-200 to-yellow-500 opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        {/* Contenido principal del Hero */}
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-yellow-300 ring-1 ring-yellow-200 hover:ring-yellow-300">
              Próximos eventos de entrenamiento.{" "}
              <a href="#" className="font-semibold text-yellow-400">
                <span aria-hidden="true" className="absolute inset-0" />
                Ver más <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-yellow-100 sm:text-6xl">
              Bienvenido a AmeTerle
            </h1>
            <p className="mt-6 text-lg leading-8 text-yellow-300">
              Todo lo que necesitas para compartir y expl tus entrenamientos en
              un solo lugar.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/routines"
                className="rounded-md bg-yellow-100 px-3.5 py-2.5 text-sm font-semibold text-neutral-800 shadow-sm hover:bg-yellow-200"
              >
                Explorar Rutinas
              </Link>
              <Link
                to="/subirRutina"
                className="text-sm font-semibold leading-6 text-yellow-100 hover:text-yellow-200"
              >
                Subir Rutina <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Fondo decorativo inferior */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-yellow-300 to-yellow-500 opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
}
