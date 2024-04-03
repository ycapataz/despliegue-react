import React from 'react'

function Avg_Formulario_cliente() {
return (
    <>
        <div>
            <div>
                <br /><br />
                <main>
                    <h1>REGISTRO PROPIETARIO</h1>
                    <br /><br />
                    <form action className="formulario" id="formulario">
                        {/* Grupo: Nombre Usuario */}
                        <div className="formulario__grupo" id="Nombre">
                            <label htmlFor="Nombre" className="formulario__label">Nombres</label>
                            <div className="formulario__grupo-input">
                                <input type="text" className="formulario__input" name="Nombre" id="Nombre" defaultValue required />
                            </div>
                        </div>
                        <div className="formulario__grupo" id="Apellidos">
                            <label htmlFor="Apellidos" className="formulario__label">Apellidos</label>
                            <div className="formulario__grupo-input">
                                <input type="text" className="formulario__input" name="Apellidos" id="Apellidos" defaultValue required />
                            </div>
                        </div>
                        {/* Grupo: Cedula */}
                        <div className="formulario__grupo" id="Cedula">
                            <label htmlFor="Cedula" className="formulario__label">Numero de Cedula</label>
                            <div className="formulario__grupo-input">
                                <input type="number" className="formulario__input" name="Cedula" id="Cedula" step={1} min={10000000} max={1999999999} placeholder="Ingresar numero sin puntos ni comas" required />
                            </div>
                        </div>
                        <div className="formulario__grupo" id="Celular">
                            <label htmlFor="Celular" className="formulario__label">Numero Celular</label>
                            <div className="formulario__grupo-input">
                                <input type="number" className="formulario__input" name="Celular" id="Celular" min={3002000000} max={3509999999} defaultValue required />
                            </div>
                        </div>
                        <div className="formulario__grupo" id="Email">
                            <label htmlFor="Email" className="formulario__label">Email</label>
                            <div className="formulario__grupo-input">
                                <input type="email" className="formulario__input" name="Email" id="Email" required />
                            </div>
                        </div>
                        <div className="formulario__grupo" id="Direccion">
                            <label htmlFor="Direccion" className="formulario__label">Direccion</label>
                            <div className="formulario__grupo-input">
                                <input type="text" className="formulario__input" name="Direccion" id="Direccion" defaultValue required />
                            </div>
                        </div>
                        <div className="formulario__grupo">
                            <label>Ciudad</label>
                            <select>
                                <option selected disabled>Seleccione un valor</option>
                                <option>Bogota</option>
                                <option>Cajica</option>
                                <option>Chia</option>
                                <option>Cota</option>
                                <option>Soacha</option>
                                <option>Facatativa</option>
                            </select>
                            <br /><br /><br />
                        </div>
                        <div className="formulario__grupo formulario__grupo-btn-enviar">
                            <button type="submit" className="formulario__btn">Editar</button>
                        </div>
                        <div>
                            <a href="../HTML/avg_Formulario_mascota.html">Crear Mascota</a>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    </>
)
}

export default Avg_Formulario_cliente
