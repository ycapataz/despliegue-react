import React from 'react'
import '../assets/css/nosotros.css'
import '../assets/css/consejos.css'
import Logo_Software from '../assets/images/Logo Software sin fondo.png'
import agendamiento from '../assets/images/agendamiento.png'
import historia from '../assets/images/historia.png'
import inventario from '../assets/images/inventario.jpg'
import { Link, NavLink } from 'react-router-dom';
import '../assets/css/nosotros.css';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

function Modulo() {
    return (
    <>
    <Menu />
    <div>
        <div className="wrapper">
            <img src={Logo_Software} alt />
            <div className="text-box">
                <h2>VPETSOFT</h2>
                <h2> ¿Quienes somos?</h2>
                <p className='p-modulo'>
                    VPETSOFT es un proyecto de software enfocado a la veterinaria y a solucionar
                    algunos de sus procesos que se hacian de forma manual, lo que ocasionaba perdida de información
                    y tiempo. Este grupo esta conformado por 3 integrantes del tecnologo de Análisis y desarrollo de software,
                    quienes son Yeison Capataz, Alejandra Velasco y Juan Horta. Se trabajaran con 3 módulos. El sistema a
                    desarrollar es un software de gestión de servicios veterinarios que permitirá a las clínicas y veterinarios
                    llevar a cabo un registro y seguimiento de las citas e ingreso de pacientes, historias clínicas veterinarias y
                    control de inventario. El sistema contará con una interfaz de usuario intuitiva y fácil de usar, que permitirá
                    una gestión eficiente y precisa de los servicios.
                </p>
            </div>
        </div>
        {/*se crea una clase containerr que tendra las 3 tarjetas (nosotros, mision, vision)*/}
        <div className="containerr">
            {/*se crea una clase cardd que contendra la imagen e informacion de la primera tarjeta (NOSOTROS)*/}
            <div className="cardd">
                {/*se usa la etiqueta figure para almacenar la imagen de la primera tarjeta*/}
                <figure>
                    <img src={agendamiento} />
                </figure>
                {/*se crea la clase contenidoo con la informacion de la primera tarjeta (NOSOTROS)*/}
                <div className="contenidoo">
                    <h3>GESTIÓN DE AGENDAMIENTO E INGRESO</h3>
                    <p>
                        Este modulo modulo realiza el correspondiente registro de mascotas junto a su propietario
                        y se gestiona el control de citas.
                    </p>
                    {/*Se crea un enlace*/}
                    {/* <li><NavLink to="/Clientes" activeClassName="active">Agendamiento</NavLink></li> */}
                </div>
            </div>
            {/*se crea una clase cardd que contendra la imagen e informacion de la segunda tarjeta (MISION)*/}
            <div className="cardd">
                {/*se usa la etiqueta figure para almacenar la imagen de la segunda tarjeta*/}
                <figure>
                    <img src={historia} />
                </figure>
                {/*se crea la clase contenidoo con la informacion de la segunda tarjeta (MISION)*/}
                <div className="contenidoo">
                    <h3>GESTIÓN DE HISTORIAS CLÍNICAS</h3>
                    <p>
                        Este módulo permitirá a los veterinarios llevar a cabo un registro detallado de las historias clínicas
                        de las mascotas, incluyendo sus datos médicos, tratamientos, exámenes médicos
                        y medicaciones.
                    </p>
                    {/*Se crea un enlace*/}
                    {/* <li><NavLink to="/Fomula_Medica" activeClassName="active">Historias Clinicas</NavLink></li> */}
                </div>
            </div>
            {/*se crea una clase cardd que contendra la imagen e informacion de la tercera tarjeta (VISION)*/}
            <div className="cardd">
                {/*se usa la etiqueta figure para almacenar la imagen de la tercera tarjeta*/}
                <figure>
                    <img src={inventario} />
                </figure>
                {/*se crea la clase contenidoo con la informacion de la tercera tarjeta (VISION)*/}
                <div className="contenidoo">
                    <h3>GESTIÓN DE INVENTARIO</h3>
                    <p>
                        Este módulo permitirá al almacenista llevar a cabo un registro detallado del inventario de productos
                        y suministros utilizados en la clínica veterinaria, incluyendo su cantidad y fecha de vencimiento y
                        distinta información de los productos, además de poder ver distinta información de los proveedores.
                    </p>
                    {/*Se crea un enlace*/}
                    {/* <li><NavLink to="/Proveedor" activeClassName="active">Inventario</NavLink></li> */}
                </div>
            </div>
        </div>
        <br /><br /><br />
        <Footer />
    </div>
    
    </>
    )
}

export default Modulo