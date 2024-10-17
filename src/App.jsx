import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar1 from "./components/Navbar";
import Home from "./pages/Home";
import Routines from "./pages/Routines";
import Nutrition from "./pages/Nutrition";
import Calendar from "./pages/Calendar";
import Sensations from "./pages/Sensations";
import Footer1 from "./components/Footer";
import Piernas from "./pages/area/Piernas.jsx";
import SubirRutina from "./pages/SubirRutina.jsx";
import Core from "./pages/area/Core.jsx";
import FullBody from "./pages/area/FullBody.jsx";
import MovilidadActivacion from "./pages/area/MovilidadActivacion.jsx";
import TroncoSuperior from "./pages/area/TroncoSuperior.jsx";
import Login from "./authentication/Login.jsx";
import SignUpForm from "./authentication/SignUpForm.jsx";
import AuthProvider from "./components/AuthProvider.jsx";
import RequireAuth from "./components/RequireAuth"; // Importa RequireAuth
import PerfilUsuario from "./pages/PerfilUsuario.jsx";
import CorePrivado from "./pages/areaPrivada/CorePrivado.jsx";
import TroncoPrivado from "./pages/areaPrivada/TroncoPrivado.jsx";
import PiernasPrivado from "./pages/areaPrivada/PiernasPrivado.jsx";
import FullPrivado from "./pages/areaPrivada/FullPrivado.jsx";
import MovilidadPrivado from "./pages/areaPrivada/MovilidadPrivado.jsx";
import RutinasGuardadas from "./pages/areaPrivada/RutinasGuardadas.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="bg-neutral-800 min-h-screen">
          <Navbar1 />
          <div className="bg-neutral-800 p-8 rounded-lg border-2 border-yellow-100 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/routines" element={<Routines />} />
              <Route path="/nutrition" element={<Nutrition />} />

              <Route
                path="/sensations"
                element={
                  <RequireAuth>
                    <Sensations />
                  </RequireAuth>
                }
              />

              {/* Rutas protegidas */}
              <Route
                path="/calendar"
                element={
                  <RequireAuth>
                    <Calendar />
                  </RequireAuth>
                }
              />
              <Route path="/subirRutina" element={<SubirRutina />} />

              {/* Rutas de áreas específicas */}
              <Route path="/piernas" element={<Piernas />} />
              <Route path="/core" element={<Core />} />
              <Route path="/fullbody" element={<FullBody />} />
              <Route
                path="/movilidadActivacion"
                element={<MovilidadActivacion />}
              />
              <Route path="/troncoSuperior" element={<TroncoSuperior />} />

              {/* Rutas de autenticación */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUpForm />} />

              <Route
                path="/perfil"
                element={
                  <RequireAuth>
                    <PerfilUsuario />
                  </RequireAuth>
                }
              />
              <Route path="/coreprivado" element={<CorePrivado />} />
              <Route
                path="/mis-rutinas/troncoSuperior"
                element={<TroncoPrivado />}
              />
              <Route path="/piernasprivado" element={<PiernasPrivado />} />
              <Route path="/mis-rutinas/fullbody" element={<FullPrivado />} />
              <Route
                path="/mis-rutinas/movilidadActivacion"
                element={<MovilidadPrivado />}
              />
              <Route path="/rutinas-guardadas" element={<RutinasGuardadas />} />
            </Routes>
          </div>
          <Footer1 />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
