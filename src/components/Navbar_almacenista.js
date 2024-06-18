import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styleNavL from '../assets/css/avg_encabezado.module.scss';
import 'bootstrap/scss/bootstrap.scss';
import * as  FaIcons from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import * as  FaIcons6 from  "react-icons/fa6";
import UserContext from '../context/UserContext';
import Swal from 'sweetalert2';

function Navbar_almacenista() {
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
                    <NavLink to='/Producto' exact className='px-1 w-100 d-inline-bock py-2' activeClassName="active"><FaIcons.FaClinicMedical className='me-3' />Inicio</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/Producto' className='px-1 w-100 d-inline-bock py-2'><FaIcons.FaFolderOpen className='me-3' />Productos</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/Proveedor' className='px-1 w-100 d-inline-bock py-2'><FaIcons.FaBookMedical className='me-3' />Proveedores</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/Entradas' className='px-1 w-100 d-inline-bock py-2'><FaIcons.FaFileMedical className='me-3' />Entradas inventario</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/Salidas' className='px-1 w-100 d-inline-bock py-2'><FaIcons.FaCommentMedical className='me-3' />Salidas inventario</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/iniciosesion' onClick={handleLogout} className='px-1 w-100 d-inline-bock py-2'><FaIcons6.FaRightToBracket className='me-3' />Salir</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Navbar_almacenista;