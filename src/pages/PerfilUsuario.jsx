import React, { useState } from "react";
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
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);
      await updateProfile(user, { photoURL: downloadURL });
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
    document.getElementById("fileInput").click();
  };

  const handleCompartirPerfil = () => {
    if (user) {
      const url = `${window.location.origin}/perfil/${user.uid}/compartir`;

      // Intenta copiar con navigator.clipboard.writeText()
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("¡Enlace copiado! Comparte este enlace: " + url);
        })
        .catch(() => {
          // Método de respaldo usando document.execCommand()
          const textArea = document.createElement("textarea");
          textArea.value = url;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          alert("¡Enlace copiado! Comparte este enlace: " + url);
        });
    }
  };

  return (
    <div className="p-6 mt-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-yellow-300 text-center lg:text-left">
        Mi Perfil
      </h1>
      <p className="text-lg text-yellow-100 mb-8 text-center lg:text-left">
        Aquí puedes ver y gestionar tus rutinas personales.
      </p>

      {/* Información del usuario y botones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center mb-6">
        <div className="flex justify-center lg:justify-start">
          <img
            src={photoURL || "https://via.placeholder.com/80"}
            alt="Perfil"
            className="w-20 h-20 rounded-full border-4 border-yellow-300 cursor-pointer"
            onClick={handleClick}
          />
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
        <div className="text-center lg:text-left">
          <p className="text-2xl font-semibold text-yellow-100">
            {user?.displayName || "Usuario"}
          </p>
          <p className="text-yellow-300">{user?.email}</p>
        </div>
        <Link
          to="/rutinas-guardadas"
          className="bg-yellow-100 text-neutral-800 py-2 px-4 rounded-lg hover:bg-yellow-200 transition-all max-w-max mx-auto lg:ml-auto"
        >
          Rutinas Guardadas
        </Link>
      </div>

      {uploading && (
        <p className="text-yellow-300 text-center lg:text-left">
          Actualizando foto de perfil...
        </p>
      )}

      <div className="mb-8 text-center lg:text-left">
        <button
          onClick={handleCompartirPerfil}
          className="bg-yellow-300 text-neutral-800 font-bold py-2 px-4 rounded-lg border border-yellow-300 transition duration-300 hover:bg-yellow-400"
        >
          Compartir Perfil
        </button>
      </div>

      {/* Rutinas del usuario en grid */}
      <div className="grid grid-cols-1  gap-6">
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
