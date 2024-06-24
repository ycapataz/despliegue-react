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
import NotificacionesRecep from './CrudComponents/CrudNotificacionRecep';
import { SelectedIngresoProvider } from './context/SelectedIngresoContext';
import { SelectedRegistroClinicoProvider } from './context/SelectedRegistroContext';
import CrudEmpleado from './CrudComponents/Crud_empleado';
import ProtectedRoute from './routes/ProtectedRoute';
import CrudMascota from './CrudComponents/Crud_mascota';
import PasswordResetRequest from './components/PasswordResetRequest';
import PasswordReset from './components/PasswordReset';
import Crud_entradas from './CrudComponents/Crud_entradas';
import Crud_salidas from './CrudComponents/Crud_salidas';

function App() {
  return (
    <>
      <UserProvider>
        <SelectedIngresoProvider>
        <SelectedRegistroClinicoProvider>
          <Router>
            <div className="App">
              <Routes>

                //URL publicas
                <Route path="/" element={<Home />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/servicios" element={<Modulo />} />
                <Route path="/red-de-atencion" element={<RedDeAtencion />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/iniciosesion" element={<IniciarSesion />} />
                <Route path="/registrarse" element={<Registrarse />} />
                <Route path="/mapa_del_sitio" element={<MapaSitio />} />

                {/* Rutas de restablecimiento de contraseña */}
                <Route path="/reset-password-request" element={<PasswordResetRequest />} />
                <Route path="/reset-password" element={<PasswordReset />} />

                //Modulo protegido gestión de inventario.
                <Route
                  path="/producto" 
                  element={<ProtectedRoute component={CrudProducto} />} 
                />
                <Route
                  path="/proveedor" 
                  element={<ProtectedRoute component={CrudProveedor} />}
                />
                <Route
                  path="/Salidas"
                  element={<ProtectedRoute component={Crud_salidas} />}
                />
                <Route
                  path="/Entradas"
                  element={<ProtectedRoute component={Crud_entradas} />}
                />
                
                
                //Modulo protegido gestión de agendamiento e ingreso.
                <Route 
                  path="/notificacionR" 
                  element={<ProtectedRoute component={NotificacionesRecep} />} />
                <Route 
                  path="/mascota" 
                  element={<ProtectedRoute component={CrudMascota} />} />
                <Route 
                  path="/clientes" 
                  element={<ProtectedRoute component={CrudClientes} />} />
                <Route 
                  path="/cita" 
                  element={<ProtectedRoute component={CrudCitas} />} 
                  />
                <Route 
                  path="/empleado" 
                  element={<ProtectedRoute component={CrudEmpleado} />} />    

                //Modulo protegido registro clínico
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
        </SelectedRegistroClinicoProvider>
        </SelectedIngresoProvider>
      </UserProvider>
    </>
  );
}

export default App;