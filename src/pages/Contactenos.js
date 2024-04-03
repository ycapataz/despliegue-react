import React from 'react'
import Menu from '../components/Menu';
import '../assets/css/contactenos.css'

function Contactenos() {
    return (
    <>
    <Menu />
        <div className='max_conten'>
            <br /><br />
            <div className="contenedor">
                <form action className="form">
                    <div className="form-header">
                        <h1 className="form-title">PQR VPETSOFT</h1>
                    </div>
                    <label htmlFor="nombre" className="form-label">Nombres</label>
                    <input type="text" id="nombre" className="form-input" placeholder="Escriba sus nombres" required title="No usar numeros para el nombre" pattern="[a-zA-Z]{2,}" />
                    <label htmlFor="apellido" className="form-label">Apellidos</label>
                    <input type="text" id="apellido" className="form-input" placeholder="Escriba sus apellidos" required title="No usar numeros para el apellido" pattern="[a-zA-Z]{2,}" />
                    <label htmlFor="correo" className="form-label">Correo</label>
                    <input type="email" id="correo" className="form-input" placeholder="Escriba su correo electronico" required />
                    <label htmlFor="telefono" className="form-label">Telefono</label>
                    <input type="number" minLength={10} maxLength={10} id="telefono" className="form-input" placeholder="Escriba su numero telefonico" required />
                    <label htmlFor="tipo" className="form-label"> Tipo Solicitud </label>
                    <select className="lista" name="pqr">
                        <option value="Queja">Queja</option>
                        <option value="Solicitud">Solicitud</option>
                        <option value="Reclamo">Reclamo</option>
                        <option value="Sugerencia">Sugerencia</option>
                    </select>
                    <label htmlFor="descripcion" className="form-label"> Descripcion </label>
                    <textarea id="descripcion" className="form-textarea" placeholder="Escriba la descipcion del PQR" required defaultValue={""} />
                    <input className="btn-submit" type="submit" defaultValue="Enviar" />
                </form>
            </div>
        </div>
    </>
    );
}

export default Contactenos;
