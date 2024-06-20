import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styleNavL from '../assets/css/avg_encabezado.module.scss';
import 'bootstrap/scss/bootstrap.scss';
import * as  FaIcons from 'react-icons/fa';
import * as  FaIcons6 from  "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Swal from 'sweetalert2';

function Navbar() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault(); // Evita la navegación inmediata
    
        Swal.fire({
            title: 'Deseas cerrar sesión',
            //text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#56208C',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Limpiar datos de usuario y token de autenticación
                setUser(null);
                localStorage.removeItem('token');
                // Redirigir al usuario a la página de inicio de sesión
                navigate('/iniciosesion');
        
                navigate('/iniciosesion'); // Redirige a la página de inicio de sesión
                Swal.fire(
                '¡Sesión cerrada!',
                'Tu sesión ha sido cerrada.',
                'success'
                )
            }
            });
    };
    return (
        <div className={styleNavL.sidebar}>
            <ul className={styleNavL.navUl}>
                <li className={styleNavL.navIl}>
                    <NavLink to='/Clientes' exact className='px-1 w-100 d-inline-bock py-2' activeClassName="active"><FaIcons.FaClinicMedical className='me-3' />Inicio</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/Clientes' className='px-1 w-100 d-inline-bock py-2'><FaIcons.FaFolderOpen className='me-3' />Propietario</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/mascota' className='px-1 w-100 d-inline-bock py-2'><FaIcons.FaBookMedical className='me-3' />Mascotas</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/Cita' className='px-1 w-100 d-inline-bock py-2'><FaIcons.FaFileMedical className='me-3' />Citas</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/notificacionR' className='px-1 w-100 d-inline-bock py-2'><FaIcons.FaFileMedical className='me-3' />Ingresos mascotas</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/empleado' className='px-1 w-100 d-inline-bock py-2'><FaIcons.FaCommentMedical className='me-3' />Equipo de trabajo</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                <NavLink to='/iniciosesion' onClick={handleLogout}  className='px-1 w-100 d-inline-bock py-2'><FaIcons6.FaRightToBracket className='me-3' />Salir</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;