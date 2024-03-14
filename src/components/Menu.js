import { NavLink } from 'react-router-dom';
import "../assets/css/menu.css";
import logo from  "../assets/images/logo.png";

function Menu() {
    return (
    <>
            <div className="Menu">
                <nav>
                    {/* se agrega un icono de font awesome para la casilla de verificacion con la clase checkbtn */}
                    <input type="checkbox" id="check" />
                    <label htmlFor="check" className="checkbtn">
                        <i className="fas fa-bars"></i>
                    </label>
                    {/* se agrega una clase enlace */}
                    <a href="#" className="enlace">
                        {/* se agrega el logo para el menu mediante la clase logo */}
                        <img src={logo} alt="" className="logo" />
                        <p className="nombre"><b> VPETSOFT </b></p>
                    </a>
                    {/* lista de menu */}
                    <ul>
                        <li><NavLink exact to="/" activeClassName="active">Inicio</NavLink></li>
                        <li><NavLink to="/nosotros" activeClassName="active">¿Quienes somos?</NavLink></li>
                        <li><NavLink to="/servicios" activeClassName="active">Servicios</NavLink></li>
                        <li><NavLink to="/red-de-atencion" activeClassName="active">Red de atencion</NavLink></li>
                        <li><NavLink to="/contacto" activeClassName="active">Contactenos</NavLink></li>
                    </ul>
                </nav>
            </div>
    </>
    );
}

export default Menu;
