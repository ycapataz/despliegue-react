import React from 'react'

function Avg_Formulario_empleados() {
return (
    <>
        <div>
            <br /><br /><br /><br />
            <main>
                <h1>REGISTRO EMPLEADOS</h1>
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
                    <div className="formulario__grupo" id="Fecha Nacimiento">
                        <label htmlFor="Fecha Nacimiento" className="formulario__label">Fecha Nacimiento</label>
                        <div className="formulario__grupo-input">
                            <input type="date" className="formulario__input" name="Fecha Nacimiento" id="Fecha Nacimiento" step={1} min={1} max={3} required />
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
                        <label>Especialidad</label>
                        <select>
                            <option selected disabled>Seleccione una especialidad</option>
                            <option>Medicina General</option>
                            <option>Cirugia</option>
                            <option>Terapias</option>
                            <option>Toma de muestras</option>
                            <option>Imagenes diagnosticas</option>
                            <option>Odontologia</option>
                            <option>Vacunacion</option>
                            <option>Auxiliar</option>
                        </select>
                    </div>
                    <div className="formulario__grupo">
                        <label>Cargo</label>
                        <select>
                            <option selected disabled>Seleccione el cargo</option>
                            <option>Veterinario</option>
                            <option>Recepcionista</option>
                            <option>Almacenista</option>
                        </select>
                    </div>
                    <div className="formulario__grupo">
                        <label>EPS</label>
                        <select>
                            <option selected disabled>Seleccione una especialidad</option>
                            <option>Salud Total</option>
                            <option>E.P.S. SANITAS S.A.</option>
                            <option>SOLSALUD E.P.S. S.A.</option>
                            <option>COOMEVA E.P.S. S.A.</option>
                            <option>EMDISALUD</option>
                            <option>ASMET SALUD</option>
                            <option>CRUZ BLANCA E.P.S. S.A.</option>
                            <option>E.P.S. FAMISANAR LIMITADA CAFAM-COLSUBSIDIO</option>
                            <option>CCF COLSUBSIDIO</option>
                            <option>COLMEDICA E.P.S. - ALIANSALUD</option>
                            <option>COMFACUNDI</option>
                            <option>COMPENSAR E.P.S.</option>
                            <option>SALUD COLPATRIA E.P.S.</option>
                        </select>
                        <br /><br /><br />
                    </div>
                    <div className="formulario__grupo formulario__grupo-btn-enviar">
                        <button type="submit" className="formulario__btn">Guardar</button>
                    </div>
                </form>
            </main>
        </div>
    </>
)
}

export default Avg_Formulario_empleados
