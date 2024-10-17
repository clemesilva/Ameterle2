import React from "react";

function InputBuscador({ onSearch }) {
  const handleSearch = (e) => {
    onSearch(e.target.value); // Pasamos el valor al componente padre
  };

  return (
    <input
      placeholder="Busca al creador de la rutina por su nombre"
      onChange={handleSearch}
      className="p-2 w-full rounded-lg bg-neutral-700 text-yellow-100 border border-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-200 "
    />
  );
}

export default InputBuscador;
