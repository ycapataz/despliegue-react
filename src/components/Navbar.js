import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styleNavL from '../assets/css/avg_encabezado.module.scss';
import 'bootstrap/scss/bootstrap.scss';
import * as  FaIcons from 'react-icons/fa';
import * as  FaIcons6 from  "react-icons/fa6";

function Navbar() {
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
                    <NavLink to='/Mascotas' className='px-1 w-100 d-inline-bock py-2'><FaIcons.FaBookMedical className='me-3' />Mascotas</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/Cita' className='px-1 w-100 d-inline-bock py-2'><FaIcons.FaFileMedical className='me-3' />Citas</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/Empleados' className='px-1 w-100 d-inline-bock py-2'><FaIcons.FaCommentMedical className='me-3' />Equipo de trabajo</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/' className='px-1 w-100 d-inline-bock py-2'><FaIcons6.FaRightToBracket className='me-3' />Salir</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;