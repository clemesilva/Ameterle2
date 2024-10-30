import React, { useEffect, useState } from "react";
import { auth, storage } from "../firebase/firebase"; // Importa Firebase auth y storage
import { updateProfile } from "firebase/auth"; // Para actualizar el perfil del usuario
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Para subir archivos a Storage
import { Link } from "react-router-dom";

const RoutineCardPrivate = ({ title, description, to }) => (
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

function PerfilUsuario() {
  const [user, setUser] = useState(auth.currentUser); // Obtener el usuario actual de Firebase
  const [photoURL, setPhotoURL] = useState(user?.photoURL); // Manejar la foto del usuario
  const [uploading, setUploading] = useState(false); // Estado para manejar la subida

  // Subir la imagen seleccionada y actualizar el perfil
  const handleImageUpload = async (event) => {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    if (!file) return;

    setUploading(true);
    try {
      // Subir la imagen a Firebase Storage
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);
      await uploadBytes(storageRef, file);

      // Obtener la URL de descarga de la imagen subida
      const downloadURL = await getDownloadURL(storageRef);

      // Actualizar la foto de perfil en Firebase Authentication
      await updateProfile(user, { photoURL: downloadURL });

      // Actualizar la foto de perfil en la UI
      setPhotoURL(downloadURL);

      setUploading(false);
      alert("Foto de perfil actualizada con éxito.");
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Hubo un error al subir la foto.");
      setUploading(false);
    }
  };

  const handleClick = () => {
    // Abrir el diálogo de selección de archivos
    document.getElementById("fileInput").click();
  };

  const handleCompartirPerfil = () => {
    if (user) {
      const url = `${window.location.origin}/perfil/${user.uid}/compartir`;
      navigator.clipboard.writeText(url);
      alert("¡Enlace copiado! Comparte este enlace: " + url);
    }
  };

  return (
    <div className="p-6 mt-10">
      <h1 className="text-3xl font-bold mb-4 text-yellow-300">Mi Perfil</h1>
      <p className="text-lg text-yellow-100 mb-8">
        Aquí puedes ver y gestionar tus rutinas personales.
      </p>

      {/* Información del usuario */}
      <div className="flex items-center space-x-4 mb-6">
        {/* Foto de perfil del usuario */}
        <img
          src={photoURL || "https://via.placeholder.com/80"} // Mostrar la foto actual o un placeholder
          alt="Perfil"
          className="w-20 h-20 rounded-full border-4 border-yellow-300 cursor-pointer"
          onClick={handleClick} // Abrir el selector de archivos al hacer clic
        />
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: "none" }} // Ocultar el input
          onChange={handleImageUpload}
        />
        <div>
          <p className="text-2xl font-semibold text-yellow-100">
            {user?.displayName || "Usuario"}{" "}
            {/* Mostrar el nombre del usuario */}
          </p>
          <p className="text-yellow-300">{user?.email}</p>{" "}
          {/* Mostrar el email */}
        </div>

        {/* Botón para acceder a las Rutinas Guardadas */}
        <Link
          to="/rutinas-guardadas"
          className="ml-auto bg-yellow-100 text-neutral-800 py-2 px-4 rounded-lg hover:bg-yellow-200 transition-all"
        >
          Rutinas Guardadas
        </Link>
      </div>

      {uploading && (
        <p className="text-yellow-300">Actualizando foto de perfil...</p>
      )}

      {/* Botón de compartir perfil */}
      <div className="mb-8">
        <button
          onClick={handleCompartirPerfil}
          className="bg-yellow-300 text-neutral-800 font-bold py-2 px-4 rounded-lg border border-yellow-300 transition duration-300 hover:bg-yellow-400"
        >
          Compartir Perfil
        </button>
      </div>

      {/* Rutinas del usuario */}
      <div className="space-y-6">
        <RoutineCardPrivate
          title="PIERNAS"
          description="Tus rutinas personales para piernas."
          to="/piernasprivado"
        />
        <RoutineCardPrivate
          title="CORE"
          description="Fortalece tu núcleo con estas rutinas personales."
          to="/coreprivado"
        />
        <RoutineCardPrivate
          title="Tronco Superior"
          description="Rutinas para mejorar tu fuerza en la parte superior del tronco."
          to="/mis-rutinas/troncoSuperior"
        />
        <RoutineCardPrivate
          title="FULL BODY"
          description="Rutinas completas para todo el cuerpo."
          to="/mis-rutinas/fullbody"
        />
        <RoutineCardPrivate
          title="MOVILIDAD/ACTIVACIÓN"
          description="Rutinas para mejorar tu movilidad."
          to="/mis-rutinas/movilidadActivacion"
        />
      </div>
    </div>
  );
}

export default PerfilUsuario;
