import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Servicios from './pages/Modulo';
import RedDeAtencion from './pages/Error_404';
import Contacto from './pages/Contactenos';
import IniciarSesion from './pages/IniciarSesion';
import Registrarse from './pages/Registrarse';
import Footer from './components/Footer';
import MapaSitio from './pages/MapaSitio';
import Modulo from './pages/Modulo';

function App() {
  return (
    <Router>
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios" element={<Modulo />} />
        <Route path="/red-de-atencion" element={<RedDeAtencion />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/iniciosesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/mapa_del_sitio" element={<MapaSitio />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;