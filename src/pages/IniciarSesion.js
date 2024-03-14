import React from 'react'
import '../assets/css/contactenos.css'

function IniciarSesion() {
    return (
        <>
        <div className='max_conten'>
            <br /><br /><br />
            <div className="contenedor">
                <form action className="form">
                    <div className="form-header">
                        <h1 className="form-title">INICIO SESION</h1>
                    </div>
                    <label htmlFor="nombre" className="form-label">Correo electronico</label>
                    <input type="email" id="correo_electronico" className="form-input" placeholder="Escriba su correo electronico" required />
                    <p id="correo_error" className="formulario_input-error">La dirección de correo electrónico que ingresaste no parece ser válida.</p>
                    <label htmlFor="contraseña" className="form-label">Contraseña</label>
                    <input type="password" id="contraseña" className="form-input" placeholder="Escriba su contraseña" required />
                    <p id="contraseña_error" className="formulario_input-error">Contraseña inválida. Utiliza caracteres alfanuméricos y símbolos permitidos.</p>
                    <br /><br />
                    <input className="btn-submit" type="submit" defaultValue="Iniciar sesion" />
                    <br /><br /><br />
                    <p><a href="../HTML/registrarse.html" className="form-label">¿No tiene cuenta? Registrese acá</a></p>
                    <p><a href="../HTML/olvcon.html" className="form-label">¿Olvido su contraseña?</a></p>
                </form>
            </div>
        </div>
        </>
    );
}

export default IniciarSesion;
