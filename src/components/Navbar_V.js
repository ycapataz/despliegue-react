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
    /* const handleLogout = () => {
        // Limpiar datos de usuario y token de autenticación
        setUser(null);
        localStorage.removeItem('token');
        // Redirigir al usuario a la página de inicio de sesión
        navigate('/iniciosesion');
    }; */

    const handleLogout = (e) => {
        e.preventDefault(); // Evita la navegación inmediata
    
        Swal.fire({
            title: 'Deseas cerra sesión',
            //text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
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
                    <NavLink to='/' exact className='px-1 w-100 d-inline-bock py-2' activeClassName="active"><FaIcons.FaClinicMedical className='me-3' />Inicio</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/notificacion' exact className='px-1 w-100 d-inline-bock py-2' activeClassName="active"><FaIcons.FaFolderOpen className='me-3' />Ingresos</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/registroClinico' className='px-1 w-100 d-inline-bock py-2'><FaIcons.FaFolderOpen className='me-3' />Registro Clinico</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/Fomula_Medica' className='px-1 w-100 d-inline-bock py-2'><FaIcons.FaBookMedical className='me-3' />Formula Medica</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/iniciosesion' onClick={handleLogout}  className='px-1 w-100 d-inline-bock py-2'><FaIcons6.FaRightToBracket className='me-3' />Salir</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;