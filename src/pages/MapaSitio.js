import { NavLink } from 'react-router-dom';
import '../assets/css/mapaSitio.css';
import React from 'react'
import Menu from '../components/Menu';

function MapaSitio() {
    return (
        <>
        <Menu />
        <div className="mSite">
            <ul>
                <h1>Mapa del Sitio</h1>
                <li><NavLink exact to="/" activeClassName="active">Inicio</NavLink></li>
                <ul>
                    <li><NavLink to="/nosotros" activeClassName="active">¿Quienes somos?</NavLink></li>
                    <li><NavLink to="/servicios" activeClassName="active">Servicios</NavLink></li>
                    <li><NavLink to="/red-de-atencion" activeClassName="active">Red de atencion</NavLink></li>
                    <li><NavLink to="/contacto" activeClassName="active">Contactenos</NavLink></li>
                    <li><NavLink to="/registrarse" activeClassName="active">Registrarse</NavLink></li>
                    <li><NavLink to="/iniciosesion" activeClassName="active">Inicio sesion</NavLink></li>

                </ul>
                <li><a href="#">Multimedia</a></li>
                <ul>
                    <li><a href="https://youtu.be/3yLoofhSdVc">Perros</a></li>
                    <li><a href="https://youtu.be/YpXrH6t6th8">Gatos</a></li>
                    <li><a href="https://laika.com.co">Cuida su dieta</a></li>
                    <li><a href="https://www.agrocampo.com.co/plan-de-vacunacion">Su salud primero</a></li>
                    <li><a href="#">Eventos</a></li>
                </ul>
                <li><a href="#">Compañia</a></li>
                <ul>
                    <li><NavLink to="/nosotros" activeClassName="active">Nosotros</NavLink></li>
                    <li><NavLink to="/servicios" activeClassName="active">Nuestros Sevicios</NavLink></li>
                    <li><NavLink to="/red-de-atencion" activeClassName="active">Red de atención</NavLink></li>
                    <li><NavLink to="/mapa_del_sitio" activeClassName="active">Mapa del sitio</NavLink></li>
                </ul>
                <li><a href="#">Redes sociales</a></li>
                <ul>
                    <li><a href="https://www.facebook.com/profile.php?id=100092412408020&sk=about">Facebook</a></li>
                    <li><a href="https://twitter.com/petsoft_1">Twitter</a></li>
                    <li><a href="https://instagram.com/petsoftpetsoft?igshid=NTc4MTIwNjQ2YQ==">Instagram</a></li>
                    <li><a href="https://www.youtube.com/@proyectosena-se8xb/featured">Youtube</a></li>
                </ul>
            </ul>
        </div>
        </>
    );
}

export default MapaSitio;
