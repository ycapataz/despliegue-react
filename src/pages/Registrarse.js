import React from 'react'
import Menu from '../components/Menu';

function Registrarse() {
    return (
        <>
        <Menu />
        <div className='max_conten'>
            <div className="contenedor">
                <form action className="form">
                    <div className="form-header">
                        <h1 className="form-title">REGISTRATE</h1>
                    </div>
                    <label htmlFor="nombre" className="form-label">Nombres</label>
                    <input type="text" id="nombre" className="form-input" placeholder="Escriba sus nombres" required title="No usar numeros para el nombre" pattern="[a-zA-Z]{2,}" />
                    <p id="nombre_error" className="nombre_error">No se admiten caracteres especiales o numeros</p>
                    <label htmlFor="apellido" className="form-label">Apellidos</label>
                    <input type="text" id="apellido" className="form-input" placeholder="Escriba sus apellidos" required title="No usar numeros para el apellido" pattern="[a-zA-Z]{2,}" />
                    <p id="apellido_error" className="nombre_error">No se admiten caracteres especiales o numeros</p>
                    <label htmlFor="cedula" className="form-label">Cedula</label>
                    <input type="number" id="cedula" className="form-input" min={0} placeholder="Escriba su numero de identificacion" required />
                    <p id="cedula_error" className="cedula_error">Ingrese un numero de cedula valido</p>
                    <label htmlFor="correo" className="form-label">Correo</label>
                    <input type="email" id="correo_electronico" className="form-input" placeholder="Escriba su correo electronico" required />
                    <p id="correo_error" className="formulario_input-error">La dirección de correo electrónico que ingresaste no parece ser válida.</p>
                    <label htmlFor="telefono" className="form-label">Telefono</label>
                    <input type="text" id="telefono" className="form-input" min={0} placeholder="Escriba su numero telefonico" required pattern="[0-9]{10,}" />
                    <p id="telefono_error" className="cedula_error">Ingrese un numero de telefono valido</p>
                    <label htmlFor="contraseña" className="form-label">Contraseña</label>
                    <input type="password" id="contraseña" className="form-input" placeholder="Escriba su contraseña" required />
                    <p id="contraseña_error" className="formulario_input-error">Contraseña inválida. Utiliza caracteres alfanuméricos y símbolos permitidos.</p>
                    <label htmlFor="contraseña" className="form-label">Confirmacion contraseña</label>
                    <input type="password" id="contraseña_2" className="form-input" placeholder="Confirme su contraseña" required />
                    <p id="contraseña2_error" className="contraseña2_error">Las contraseñas no coinciden</p>
                    <br /><br />
                    <input className="btn-submit" type="submit" defaultValue="Registrarse" />
                    <br /><br /><br />
                    <p><a href="../HTML/iniciosesion.html" className="form-label">¿Ya tiene cuenta? Inicie sesion acá</a></p>
                </form>
            </div>
        </div>
        </>
    );
}

export default Registrarse;
