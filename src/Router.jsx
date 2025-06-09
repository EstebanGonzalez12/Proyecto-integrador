import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RutaProtegida from "./components/RutaProtegida";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reservas from "./pages/Reservas";
import QuienesSomos from "./modules/QuienesSomos";
import Cartagena from "./modules/Cartagena";
import Madrid from "./modules/Madrid";
import PuntaCana from "./modules/PuntaCana";
import RioDeJaneiro from "./modules/RioDeJaneiro";
import Destinations from "./modules/Destinations";
import Lima from "./modules/Lima";
import Panama from "./modules/Panama";
import Contactanos from "./modules/Contactanos";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuienesSomos />} />
        <Route path="/cartagena" element={<Cartagena />} />
        <Route path="/madrid" element={<Madrid />} />
        <Route path="/punta-cana" element={<PuntaCana />} />
        <Route path="/rio-de-janeiro" element={<RioDeJaneiro />} />
        <Route path="/destinos" element={<Destinations />} />
        <Route path="/lima" element={<Lima />} />
        <Route path="/ciudad-de-panama" element={<Panama />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contactanos" element={<Contactanos />} />
        <Route
          path="/reservas"
          element={
            <RutaProtegida>
              <Reservas />
            </RutaProtegida>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
