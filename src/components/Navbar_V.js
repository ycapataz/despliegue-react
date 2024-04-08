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
                    <NavLink to='/' exact className='px-1 w-100 d-inline-bock py-2' activeClassName="active"><FaIcons.FaClinicMedical className='me-3' />Inicio</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/registroClinico' className='px-1 w-100 d-inline-bock py-2'><FaIcons.FaFolderOpen className='me-3' />Registro Clinico</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/Fomula_Medica' className='px-1 w-100 d-inline-bock py-2'><FaIcons.FaBookMedical className='me-3' />Formula Medica</NavLink>
                </li>
                {/* <li className={styleNavL.navIl}>
                    <NavLink to='/equipo-de-trabajo' className='px-1 w-100 d-inline-bock py-2'><FaIcons.FaFileMedical className='me-3' />Equipo de trabajo</NavLink>
                </li>
                <li className={styleNavL.navIl}>
                    <NavLink to='/notificaciones' className='px-1 w-100 d-inline-bock py-2'><FaIcons.FaCommentMedical className='me-3' />Notificaciones</NavLink>
                </li> */}
                <li className={styleNavL.navIl}>
                    <NavLink to='/' className='px-1 w-100 d-inline-bock py-2'><FaIcons6.FaRightToBracket className='me-3' />Salir</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;