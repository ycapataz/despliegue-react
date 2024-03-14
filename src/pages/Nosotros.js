import React from 'react'
import '../assets/css/nosotros.css';
import perrito from '../assets/images/perrito.png';
import perrito2 from '../assets/images/perrito2.png';
import perrito3 from '../assets/images/perrito3.png';
import Footer from '../components/Footer';

function Nosotros() {
    return (
        <>
        <div>
        <br /><br />
        {/*se crea una clase containerr que tendra las 3 tarjetas (nosotros, mision, vision)*/}
        <div className="containerr">
            {/*se crea una clase cardd que contendra la imagen e informacion de la primera tarjeta (NOSOTROS)*/}
            <div className="cardd">
            {/*se usa la etiqueta figure para almacenar la imagen de la primera tarjeta*/}
            <figure>
                <img src={perrito} />
            </figure>
            {/*se crea la clase contenidoo con la informacion de la primera tarjeta (NOSOTROS)*/}
            <div className="contenidoo">
                <h3>NOSOTROS</h3>
                <p>
                Somos la clínica veterinaria especializada más grande en Bogotá. Con más de 10 años de trayectoria
                queremos brindarle a ti y a tu mascota el mejor servicio y experiencia que esté en nuestras manos,
                contamos con diferentes servicios y atencion para las mascotas esten de la mejor forma y comodas.
                Contamos con los mejores veterinarios del pais, integrando todo el conocimiento para encontrar la
                sanación y bienestar de las mascotas.
                </p>
                {/*Se crea un enlace*/}
                <a href="../HTML/modulos.html">Leer más</a>
            </div>
            </div>
            {/*se crea una clase cardd que contendra la imagen e informacion de la segunda tarjeta (MISION)*/}
            <div className="cardd">
            {/*se usa la etiqueta figure para almacenar la imagen de la segunda tarjeta*/}
            <figure>
                <img src={perrito2} />
            </figure>
            {/*se crea la clase contenidoo con la informacion de la segunda tarjeta (MISION)*/}
            <div className="contenidoo">
                <h3>MISION</h3>
                <p>
                Nuestra mision es brindar servicios de atención médica y bienestar a los animales, promoviendo
                su salud y previniendo enfermedades, así como también brindar información y educación a los
                dueños de mascotas y a la comunidad en general sobre el cuidado y manejo responsable de las mascotas.
                En conclusion, misión de una veterinaria es trabajar para mejorar la calidad de vida de los animales y
                su relación con los seres humanos, mediante la aplicación de conocimientos y técnicas especializadas
                en el campo de la medicina veterinaria.
                </p>
            </div>
            </div>
            {/*se crea una clase cardd que contendra la imagen e informacion de la tercera tarjeta (VISION)*/}
            <div className="cardd">
            {/*se usa la etiqueta figure para almacenar la imagen de la tercera tarjeta*/}
            <figure>
                <img src={perrito3} />
            </figure>
            {/*se crea la clase contenidoo con la informacion de la tercera tarjeta (VISION)*/}
            <div className="contenidoo">
                <h3>VISION</h3>
                <p>
                En nuestra veterinaria nuestra vision es ser reconocida como una institución líder en el cuidado y bienestar
                de los animales, brindando servicios de calidad y de última generación, que contribuyan al desarrollo de una
                sociedad más responsable y comprometida con el bienestar animal y la protección del medio ambiente.
                Por otro lado, buscamos mejorar nuestra excelencia en la atención médica, el compromiso con la comunidad y el
                medio ambiente, y la innovación y liderazgo en el campo de la medicina veterinaria.
                </p>
            </div>
            </div>
        </div>
        <br /><br /><br />
        </div>
        <Footer />
        </>
    );
}

export default Nosotros;
