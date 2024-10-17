// Importamos las funciones necesarias de Firebase SDK
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  doc,
  setDoc,
  collection,
  getFirestore,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
  addDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCGV_BWJ4F5SGCayBq35AtXRJVTZcrSFgA",
  authDomain: "ameterle.firebaseapp.com",
  projectId: "ameterle",
  storageBucket: "ameterle.appspot.com",
  messagingSenderId: "795301336365",
  appId: "1:795301336365:web:417c3a655639ce1c85afa4",
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Configuramos Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Autenticación con Google Popup y Redirect
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Función para crear un usuario en Firestore
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        savedRoutines: [],
        ...additionalInformation,
      });
    } catch (error) {
      console.error("Error al crear el usuario", error.message);
    }
  }

  return userDocRef;
};

// Función para agregar una nueva sensación a Firestore
export const addSensacion = async (sensacionText) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Debes estar autenticado para agregar una sensación.");
  }

  const sensacionRef = collection(db, "sensaciones");

  await addDoc(sensacionRef, {
    userId: user.uid, // Asociamos la sensación con el ID del usuario
    sensacion: sensacionText,
    createdAt: new Date(),
  });
};

// Función para obtener sensaciones por usuario
export const getSensationsByUser = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Debes estar autenticado para ver tus sensaciones.");
  }

  const sensacionesRef = collection(db, "sensaciones");
  const q = query(sensacionesRef, where("userId", "==", user.uid));

  const querySnapshot = await getDocs(q);
  const sensaciones = querySnapshot.docs.map((doc) => doc.data());

  return sensaciones;
};

//función para likear rutina
export const toggleLikeRutina = async (rutinaId) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Debe iniciar sesión para dar o quitar like.");
  }

  const rutinaRef = doc(db, "rutinas", rutinaId);
  const rutinaSnapshot = await getDoc(rutinaRef);

  if (rutinaSnapshot.exists()) {
    const rutinaData = rutinaSnapshot.data();

    // Verificar si el usuario ya ha dado like
    if (rutinaData.likesBy && rutinaData.likesBy.includes(user.uid)) {
      // Si ya ha dado like, quitamos su UID del array y reducimos el número de likes
      await updateDoc(rutinaRef, {
        likes: increment(-1),
        likesBy: arrayRemove(user.uid),
      });
    } else {
      // Si no ha dado like, lo añadimos al array y aumentamos el número de likes
      await updateDoc(rutinaRef, {
        likes: increment(1),
        likesBy: arrayUnion(user.uid),
      });
    }
  } else {
    throw new Error("Rutina no encontrada.");
  }
};

// Función para registrar usuario con email y contraseña
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth, // La instancia de autenticación de Firebase
      email, // Correo electrónico del usuario
      password // Contraseña del usuario
    );
    return userCredential.user; // Devuelve el usuario autenticado
  } catch (error) {
    console.error("Error al autenticar:", error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

// Función para agregar una rutina a Firestore
export const addRutina = async (infoPersonal, rutinaData) => {
  try {
    const user = auth.currentUser; // Obtener el usuario autenticado
    if (!user) {
      throw new Error("Debes estar autenticado para subir una rutina.");
    }

    if (!rutinaData.rutinaFile) {
      throw new Error("No se ha proporcionado ningún archivo.");
    }

    // Subimos el archivo a Firebase Storage
    const storageRef = ref(storage, `rutinas/${rutinaData.rutinaFile.name}`);
    const snapshot = await uploadBytes(storageRef, rutinaData.rutinaFile);
    console.log("Archivo subido con éxito:", snapshot);

    // Obtenemos la URL de descarga del archivo
    const downloadURL = await getDownloadURL(storageRef);
    console.log("URL de descarga obtenida:", downloadURL);

    // Guardamos la rutina en Firestore
    const docRef = doc(collection(db, "rutinas"));

    // Guardamos la rutina en Firestore junto con el ID del documento y el array likesBy
    await setDoc(docRef, {
      ...infoPersonal,
      area: rutinaData.area,
      fileURL: downloadURL,
      descripcion: rutinaData.descripcion,
      nombre: infoPersonal.nombre,
      userId: user.uid, // Asociamos la rutina al usuario autenticado
      id: docRef.id,
      likes: 0, // Inicializamos los likes en 0
      likesBy: [], // Inicializamos el array de likesBy vacío
    });

    console.log("Rutina guardada con éxito en Firestore.");
  } catch (error) {
    console.error("Error al agregar la rutina:", error);
    throw error;
  }
};

// Función para obtener rutinas filtradas por área
export const getRutinasPorArea = async (area) => {
  try {
    const rutinasRef = collection(db, "rutinas");
    const q = query(rutinasRef, where("area", "==", area));

    const querySnapshot = await getDocs(q);
    const rutinas = querySnapshot.docs.map((doc) => doc.data());

    console.log(`Rutinas del área ${area}:`, rutinas);
    return rutinas;
  } catch (error) {
    console.error("Error al obtener las rutinas:", error);
    return [];
  }
};

// Función para obtener las rutinas filtradas por área y usuario autenticado EN MI PERFIIIIL
export const getRutinasPorAreaYUsuario = async (area, userId) => {
  try {
    const rutinasRef = collection(db, "rutinas");
    const q = query(
      rutinasRef,
      where("area", "==", area),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);

    const rutinas = [];
    querySnapshot.forEach((doc) => {
      rutinas.push({ id: doc.id, ...doc.data() });
    });

    console.log(
      `Rutinas encontradas para ${area} y usuario ${userId}:`,
      rutinas
    );
    return rutinas;
  } catch (error) {
    console.error("Error al obtener rutinas por área y usuario:", error);
    throw error;
  }
};
// Función para guardar o quitar una rutina de los favoritos del usuario

// Función para guardar o quitar una rutina de los favoritos del usuario
export const toggleSaveRutina = async (rutinaId) => {
  const user = auth.currentUser; // Usuario actual autenticado
  if (!user) {
    throw new Error("Debes iniciar sesión para guardar o quitar una rutina.");
  }

  // Referencia a la rutina que se va a guardar/quitar
  const rutinaRef = doc(db, "rutinas", rutinaId);
  const rutinaSnapshot = await getDoc(rutinaRef);

  if (rutinaSnapshot.exists()) {
    const rutinaData = rutinaSnapshot.data();

    // Verificar si el usuario ya ha guardado esta rutina
    const isAlreadySaved = rutinaData.savedBy?.includes(user.uid); // Verificamos si ya la guardó

    if (isAlreadySaved) {
      // Si ya está guardada, la quitamos de la lista de guardados
      await updateDoc(rutinaRef, {
        savedBy: arrayRemove(user.uid), // Quitamos el UID del usuario de la lista de guardados
        savedCount: increment(-1), // Disminuimos el conteo de guardados
      });
    } else {
      // Si no está guardada, la añadimos a la lista de guardados
      await updateDoc(rutinaRef, {
        savedBy: arrayUnion(user.uid), // Añadimos el UID del usuario a la lista de guardados
        savedCount: increment(1), // Aumentamos el conteo de guardados
      });
    }
  } else {
    throw new Error("Rutina no encontrada.");
  }
};

// Función para obtener las rutinas subidas por un usuario específico
export const getRutinasDeUsuario = async (userId) => {
  if (!userId) {
    throw new Error("No se proporcionó un ID de usuario válido.");
  }

  const rutinasRef = collection(db, "rutinas");
  const q = query(rutinasRef, where("userId", "==", userId));

  const rutinasSnapshot = await getDocs(q);

  if (rutinasSnapshot.empty) {
    throw new Error("No se encontraron rutinas para este usuario.");
  }

  // Obtenemos las rutinas y la información del usuario de la primera rutina
  const rutinas = rutinasSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Usamos la primera rutina para obtener el nombre y el email del usuario
  const firstRutina = rutinas[2];
  const userInfo = {
    displayName: firstRutina.nombre, // Nombre del usuario que subió la rutina
    email: firstRutina.email, // Email del usuario que subió la rutina
  };

  return { userInfo, rutinas };
};
