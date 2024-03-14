import { NavLink } from 'react-router-dom';
import "../assets/css/stylefooter.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
    return (
        <>
        <footer className="footer">
            <div className="container">
                <div className="footer-row">
                    <div className="footer-links">
                        <h4>Síguenos</h4>
                        <div className="social-link">
                            <a href="https://www.facebook.com/profile.php?id=100092412408020&sk=about"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://instagram.com/petsoftpetsoft?igshid=NTc4MTIwNjQ2YQ=="><i className="fab fa-instagram"></i></a>
                            <a href="https://twitter.com/petsoft_1"><i className="fab fa-twitter"></i></a>
                            <a href="https://www.youtube.com/@proyectosena-se8xb/featured"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    <div className="footer-links">
                        <h4>Compañía</h4>
                        <ul>
                            <li><NavLink to="/nosotros" activeClassName="active">¿Quienes somos?</NavLink></li>
                            <li><NavLink to="/servicios" activeClassName="active">Servicios</NavLink></li>
                            <li><NavLink to="/red-de-atencion" activeClassName="active">Red de atencion</NavLink></li>
                            <li><NavLink to="/mapa_del_sitio" activeClassName="active">Mapa de sitio</NavLink></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h4>Ayuda</h4>
                        <ul>
                            <li>Teléfono</li>
                            <br />
                            <li>3104598871</li>
                            <li>018000911233</li>
                            <br />
                            <li>Horario de atención</li>
                            <br />
                            <li>Lunes a viernes</li>
                            <li>8:00am - 7:00pm</li>
                            <li>Sábados, domingos y festivos</li>
                            <li>10:00am - 6:00pm</li>
                            <br />
                            <li>Correo</li>
                            <br />
                            <li>proyectosena318@gmail.com </li>
                        </ul>
                    </div>
                    <div className="maps">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1988.445830815705!2d-74.1170330307784!3d4.613404528124113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99450e9c484f%3A0x9f22c108bb0bc4d4!2sDogsano!5e0!3m2!1ses!2sco!4v1683205339028!5m2!1ses!2sco" width="100%" height="200" style={{ border: '0' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </footer>
        </>
    );
}

export default Footer;