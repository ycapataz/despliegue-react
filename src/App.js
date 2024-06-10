import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import RedDeAtencion from './pages/Error_404';
import Contacto from './pages/Contactenos';
import IniciarSesion from './pages/IniciarSesion';
import Registrarse from './pages/Registrarse';
import MapaSitio from './pages/MapaSitio';
import Modulo from './pages/Modulo';
import CrudCitas from './CrudComponents/Crud_citas';
import CrudRegistroClinico from './CrudComponents/CrudRegistroClinico';
import CrudClientes from './CrudComponents/Crud_Clientes';
import CrudProducto from './CrudComponents/Crud_producto';
import CrudFormulaMedica from './CrudComponents/CrudFormulaMedica';
import CrudProveedor from './CrudComponents/Crud_proveedor';
import { UserProvider } from './context/UserContext';
import Notificacionesve from './CrudComponents/CrudNotifiicacionesV';
import { SelectedIngresoProvider } from './context/SelectedIngresoContext';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <>
      <UserProvider>
        <SelectedIngresoProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/servicios" element={<Modulo />} />
                <Route path="/red-de-atencion" element={<RedDeAtencion />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/iniciosesion" element={<IniciarSesion />} />
                <Route path="/registrarse" element={<Registrarse />} />
                <Route path="/mapa_del_sitio" element={<MapaSitio />} />
                <Route path="/cita" element={<CrudCitas />} />
                <Route path="/clientes" element={<CrudClientes />} />
                <Route path="/producto" element={<CrudProducto />} />
                <Route path="/proveedor" element={<CrudProveedor />} />
                <Route 
                  path="/registroClinico" 
                  element={<ProtectedRoute component={CrudRegistroClinico} />} 
                />
                <Route 
                  path="/fomula_Medica" 
                  element={<ProtectedRoute component={CrudFormulaMedica} />} 
                />
                <Route 
                  path="/notificacion" 
                  element={<ProtectedRoute component={Notificacionesve} />} 
                />
              </Routes>
            </div>
          </Router>
        </SelectedIngresoProvider>
      </UserProvider>
    </>
  );
}

export default App;