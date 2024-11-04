import React from "react";
import { Link } from "react-router-dom";
import logo2 from "./logo2.jpg";

function Footer1() {
  return (
    <footer className="bg-neutral-800 rounded-lg shadow m-4 bottom-0 left-0 right-0">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src={logo2} className="h-24 opacity-75" alt="App Logo" />{" "}
            {/* Agrega opacity-75 */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-yellow-100"></span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-yellow-100 sm:mb-0">
            <li>
              <Link to="/routines" className="hover:underline me-4 md:me-6">
                Rutinas
              </Link>
            </li>
            <li>
              <Link to="/subirRutina" className="hover:underline me-4 md:me-6">
                Subir Rutina
              </Link>
            </li>
            <li>
              <Link to="/sensations" className="hover:underline me-4 md:me-6">
                Sensaciones
              </Link>
            </li>
            <li>
              <Link to="/perfil" className="hover:underline me-4 md:me-6">
                Perfil
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-yellow-100 sm:mx-auto" />
        <span className="block text-sm text-yellow-100 sm:text-center">
          © 2024{" "}
          <Link to="/" className="hover:underline">
            Ameterle
          </Link>
          . Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
}

export default Footer1;
