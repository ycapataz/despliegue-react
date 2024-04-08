import React from 'react';
import '../assets/css/style_carrusel.css';
import '../assets/css/stylecards.css';
import '../assets/css/menu.css'
import menustyle from '../assets/css/menu.css'
import Menu from '../components/Menu';
import carrusel_imagen_1 from '../assets/images/carrusel_imagen_1.png';
import carrusel_imagen_2 from '../assets/images/carrusel_imagen_2.png';
import carrusel_imagen_3 from '../assets/images/carrusel_imagen_3.png';
import carrusel_imagen_4 from '../assets/images/carrusel_imagen_4.png';
import perrosImage from '../assets/images/perros250.png';
import gatoImage from '../assets/images/gato250.png';
import comidaImage from '../assets/images/comida 250.png';
import doctorImage from '../assets/images/dcotor250.png';
import fiestaImage from '../assets/images/fiesta250.png';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';



function Home() {
return (
    <>  
    <Menu />
        <br /><br />
            {/* se agrega la barra de busqueda con la clase src */}
            <div className="box">
                <input type="text" name="search" placeholder="Buscar lo que deseas" className="src" autoComplete="off" />
            </div>
            {/* se agrega el boton de iniciar sesion con la clase boton */}
            <div className="boton">
                {/* <a href="../HTML/iniciosesion.html"><input className="btn" type="submit" value="Iniciar sesion" /></a> */}
                <NavLink to="/iniciosesion" activeClassName="active"><input className={menustyle.btn} style={{width:'150px', height: '50px', borderRadius: '30px', outline: 'none',border:'none', backgroundColor:'#56208c', color:'white' }} type="submit" value="Iniciar sesion" /></NavLink>
            </div>
            {/* se agrega el boton de registrarse con la clase boton1 */}
            <div className="boton1">
                {/* a los dos botones se les asigna una misma clase porque tienen las mismas propiedades */}
                <NavLink to="/registrarse" activeClassName="active"><input className={menustyle.btn} style={{width:'150px', height: '50px', borderRadius: '30px',outline: 'none',border:'none', backgroundColor:'#56208c',color:'white' }} type="submit" value="Registrate" /></NavLink>
            </div>
        <center>
            <br /><br /><br /><br />
            <div className="carrusel">
                {/*Este div es el contenedor principal del carrusel y tiene la clase "carrusel".*/}
                <div className="control_interno">
                    {/*Este div es el contenedor interno del carrusel y tiene la clase "control_interno".*/}
                    <input className="deslizar" type="radio" id="deslizar-1" name="deslizar" aria-hidden="true" hidden defaultChecked="checked" />
                    {/*Este input es un botón de radio que representa la primera imagen del carrusel. Tiene la clase "deslizar" y el id "deslizar-1". Está marcado como oculto y seleccionado por defecto.*/}
                    <div className="diapositiva">
                        <img src={carrusel_imagen_1} />
                    </div>
                    {/*Este div contiene la primera imagen del carrusel. Tiene la clase "diapositiva" y contiene una etiqueta de imagen (img) con la ruta de la imagen.*/}
                    <input className="deslizar" type="radio" id="deslizar-2" name="deslizar" aria-hidden="true" hidden />
                    {/*Este input es otro botón de radio que representa la segunda imagen del carrusel. Tiene la clase "deslizar" y el id "deslizar-2". Está oculto.*/}
                    <div className="diapositiva">
                        <img src={carrusel_imagen_2} />
                    </div>
                    {/*Este div contiene la segunda imagen del carrusel. Tiene la clase "diapositiva" y contiene una etiqueta de imagen (img) con la ruta de la imagen.*/}
                    <input className="deslizar" type="radio" id="deslizar-3" name="deslizar" aria-hidden="true" hidden />
                    {/*Este input es otro botón de radio que representa la tercera imagen del carrusel. Tiene la clase "deslizar" y el id "deslizar-3". Está oculto.*/}
                    <div className="diapositiva">
                        <img src={carrusel_imagen_3} />
                    </div>
                    {/*Este div contiene la tercera imagen del carrusel. Tiene la clase "diapositiva" y contiene una etiqueta de imagen (img) con la ruta de la idiapositiva-elemento*/}
                    <input className="deslizar" type="radio" id="deslizar-4" name="deslizar" aria-hidden="true" hidden />
                    {/*Este input es otro botón de radio que representa la cuarta imagen del carrusel. Tiene la clase "deslizar" y el id "deslizar-4". Está oculto.*/}
                    <div className="diapositiva">
                        <img src={carrusel_imagen_4} />
                    </div>
                    {/*Este div contiene la cuarta imagen del carrusel. Tiene la clase "diapositiva" y contiene una etiqueta de imagen (img) con la ruta de la imagen.*/}
                    <label htmlFor="deslizar-2" className="deslizar-control next control-1">≻</label>
                    <label htmlFor="deslizar-3" className="deslizar-control next control-2">≻</label>
                    <label htmlFor="deslizar-4" className="deslizar-control next control-3">≻</label>
                    <label htmlFor="deslizar-1" className="deslizar-control next control-4">≻</label>
                    <label htmlFor="deslizar-1" className="deslizar-control prev control-4">≺</label>
                    <label htmlFor="deslizar-2" className="deslizar-control prev control-1">≺</label>
                    <label htmlFor="deslizar-3" className="deslizar-control prev control-2">≺</label>
                    <label htmlFor="deslizar-4" className="deslizar-control prev control-3">≺</label>
                    {/*Estas etiquetas <label> son los controles del carrusel.
                    Cada etiqueta está asociada a un botón de radio específico y tiene clases que controlan la dirección del desplazamiento de las imágenes.
                    Los controles previos (con la flecha hacia la izquierda) tienen la clase "prev",
                    mientras que los controles siguientes (con la flecha hacia la derecha) tienen la clase "next".
                    Además, cada control tiene una clase "control-n" que se usa para asociarlo con el botón de radio correspondiente*/}
                    <ol className="deslizar-indicador">
                        <li>
                            <label htmlFor="deslizar-1" className="deslizar-circulo">•</label>
                        </li>
                        <li>
                            <label htmlFor="deslizar-2" className="deslizar-circulo">•</label>
                        </li>
                        <li>
                            <label htmlFor="deslizar-3" className="deslizar-circulo">•</label>
                        </li>
                        <li>
                            <label htmlFor="deslizar-4" className="deslizar-circulo">•</label>
                        </li>
                    </ol>
                </div>
            </div>
        </center>
        {/*Este código representa los indicadores del carrusel.El elemento <ol> crea una lista ordenada para los indicadores.
        Cada indicador se representa mediante un <li>(elemento de lista) y contiene una etiqueta <label>con la clase "deslizar-circulo".
        El contenido de la etiqueta es un punto (•), que se utiliza como el símbolo del indicador.
        Estos indicadores suelen usarse para mostrar visualmente la posición actual del carrusel
        y permitir a los usuarios navegar directamente a una imagen específica haciendo clic en el indicador correspondiente.
        En este caso, hay cuatro indicadores que se corresponden con las cuatro imágenes del carrusel (deslizador-1, deslizador-2, deslizador-3 y deslizador-4).*/}
        <br /><br />
        <div className="container-card">
            <div className="card">
                <figure>
                    <img src={perrosImage} />
                </figure>
                <div className="contenido-card">
                    <h3>Perros</h3>
                    <p>DOCUMENTAL: Perros y humanos - Los secretos de una amistad inquebrantable</p>
                    <a href="https://youtu.be/3yLoofhSdVc">Ver más</a>
                </div>
            </div>
            <div className="card">
                <figure>
                    <img src={gatoImage} />
                </figure>
                <div className="contenido-card">
                    <h3>Gatos</h3>
                    <p>DOCUMENTAL: La Guia Maxima de LOS GATOS Discovery Channel</p>
                    <a href="https://youtu.be/YpXrH6t6th8">Ver más</a>
                </div>
            </div>
            <div className="card">
                <figure>
                    <img src={comidaImage} />
                </figure>
                <div className="contenido-card">
                    <h3>Cuida su dieta</h3>
                    <p>Somos lo que comemos, tambien aplica para nuestras mascotas.</p>
                    <a href="https://laika.com.co">Ver más</a>
                </div>
            </div>
            <div className="card">
                <figure>
                    <img src={doctorImage} />
                </figure>
                <div className="contenido-card">
                    <h3>Su salud primero</h3>
                    <p>Vacunas, desparacitaciones, chequeos y procedimientos.</p>
                    <a href="https://www.agrocampo.com.co/plan-de-vacunacion">Ver Más</a>
                </div>
            </div>
            <div className="card">
                <figure>
                    <img src={fiestaImage} />
                </figure>
                <div className="contenido-card">
                    <h3>Eventos</h3>
                    <p>Calendario de eventos para que compartas con tu mascotas.</p>
                    <a href="../HTML/error_500.html">Ver Más</a>
                </div>
            </div>
        </div>
        {/* <div class="wrapper">
        <img src="perrito.png" alt="">
        <div class="text-box">
            <h2>Consejos para tus perros</h2>
            <p>
                1. Proporciona una dieta equilibrada: Asegúrate de ofrecerle alimentos de calidad 
                y adecuados para su edad, tamaño y raza. Consulta con tu veterinario para obtener 
                recomendaciones específicas.
                <br><br>
                2. Entrenamiento de obediencia: Enseña a tu perro comandos básicos como "sentado", 
                "quieto" y "ven". El entrenamiento de obediencia no solo ayuda en la convivencia, 
                sino que también fortalece el vínculo entre tú y tu perro. Recuerda que el entrenamiento 
                y la educación de un perro requieren tiempo y paciencia.
                <br><br>
                3. Cuidado veterinario regular: Lleva a tu perro al veterinario para chequeos regulares, 
                vacunas y cuidado dental. Mantén al día su desparasitación y prevención de pulgas y garrapatas.
            </p>
        </div>
            </div>
            <div class="wrapper">
        <img src="gato.png" alt="">
        <div class="text-box">
            <h2>Consejos para tus gatos</h2>
            <p>
                1. Proporciona una alimentación adecuada: Asegúrate de ofrecerle alimentos de calidad específicos para 
                gatos. Consulta con tu veterinario para obtener recomendaciones sobre la dieta más adecuada para tu gato 
                en función de su edad, peso y salud. Ademas, mantén siempre disponible agua fresca y limpia para tu gato. 
                Asegúrate de cambiar el agua regularmente para mantenerla en buen estado.
                <br><br>
                2. Caja de arena limpia: Si tu gato es de interior, asegúrate de tener una caja de arena limpia a su disposición. 
                Limpia la caja de arena regularmente para evitar olores y proporcionar un ambiente higiénico.
                <br><br>
                3. Tiempo de juego y ejercicio: Dedica tiempo diario para jugar con tu gato. Utiliza juguetes interactivos, como cañas 
                con plumas o pelotas, para estimular su instinto de caza y mantenerlo activo.
            </p>
        </div>
            </div>
        */}
    <Footer />
    </>
    );
}

export default Home;