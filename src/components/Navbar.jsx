import React, { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthProvider"; // Para gestionar autenticación
import logo2 from "./logo2.jpg";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Rutinas", href: "/routines" },
  { name: "Subir Rutina", href: "/subirRutina" },
  { name: "Mi Perfil", href: "/perfil" },
  { name: "Sensaciones", href: "/sensations" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, handleLogout } = useAuth(); // Accedemos al estado de autenticación y función de logout

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8 mb-24"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">AmèTerle</span>
            <img
              alt="AmèTerle Logo"
              src={logo2} // Reemplaza la URL por el logo importado
              className="h-16 w-auto opacity-75" // Añade opacity-75 para la transparencia
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-yellow-100"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-semibold leading-6 text-yellow-100 hover:text-yellow-200"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Botón de autenticación */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <button
              onClick={handleLogout}
              className="text-sm font-semibold leading-6 text-yellow-100 hover:text-yellow-200"
            >
              Log out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold leading-6 text-yellow-100 hover:text-yellow-200"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
              {/* <Link
                to="/signup"
                className="ml-4 text-sm font-semibold leading-6 text-yellow-100 hover:text-yellow-200"
              >
                Sign Up
              </Link> */}
            </>
          )}
        </div>
      </nav>

      {/* Menú móvil */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-neutral-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">AmèTerle</span>
              <img
                alt="AmèTerle Logo"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=yellow&shade=100"
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-yellow-100"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          {/* Enlaces del menú móvil */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-yellow-100 hover:bg-gray-700"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Autenticación en el menú móvil */}
              <div className="py-6">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-yellow-100 hover:bg-gray-700"
                  >
                    Log out
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-yellow-100 hover:bg-gray-700"
                    >
                      Log in
                    </Link>
                    {/* <Link
                      to="/signup"
                      className="-mx-3 mt-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-yellow-100 hover:bg-gray-700"
                    >
                      Sign Up
                    </Link> */}
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
