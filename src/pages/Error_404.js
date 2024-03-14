import React from 'react';
import '../assets/css/style_error_404_y_500.css';
import gif_404 from '../assets/images/gif_error_404.gif';

function Error_404() {
    return (
    <>
    <div className="error_404">
        <section className="mensaje_error">
            <section className="contenedor_mensaje-error">
                <h1 id="error_404">404</h1>
                <img src={gif_404} />
                <p id="error_404">Página no encontrada</p>
            </section>
        </section>
    </div>
    </>
    );
}

export default Error_404;
