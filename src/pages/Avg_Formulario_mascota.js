import React from 'react'

function Avg_Formulario_mascota() {
return (
    <>
    <div>
        <br /><br /><br /><br />
        <main>
            <h1>REGISTRO MASCOTA</h1>
            <br /><br />
            <form action className="formulario" id="formulario">
                {/* Grupo: Nombre Usuario */}
                <div className="formulario__grupo" id="Cedula">
                    <label htmlFor="Cedula" className="formulario__label">Numero de Cedula</label>
                    <div className="formulario__grupo-input">
                        <input type="number" className="formulario__input" name="Cedula" id="Cedula" step={1} min={10000000} max={1999999999} placeholder="Ingresar numero sin puntos ni comas" required />
                    </div>
                </div>
                <div className="formulario__grupo" id="Nombre_pro">
                    <label htmlFor="Nombre_pro" className="formulario__label">Nombre Propietario (Confirmar)</label>
                    <div className="formulario__grupo-input">
                        <input type="text" className="formulario__input" name="Nombre_pro" id="Nombre_pro" readOnly defaultValue />
                    </div>
                </div>
                <div className="formulario__grupo" id="Nombre">
                    <label htmlFor="Nombre" className="formulario__label">Nombres Mascota</label>
                    <div className="formulario__grupo-input">
                        <input type="text" className="formulario__input" name="Nombre" id="Nombre" required />
                    </div>
                </div>
                <div className="formulario__grupo" id="Color">
                    <label htmlFor="Color" className="formulario__label">Color</label>
                    <div className="formulario__grupo-input">
                        <input type="text" className="formulario__input" name="Color" id="Color" required />
                    </div>
                </div>
                <div className="formulario__grupo" id="Fecha Nacimiento">
                    <label htmlFor="Fecha Nacimiento" className="formulario__label">Fecha Nacimiento</label>
                    <div className="formulario__grupo-input">
                        <input type="date" className="formulario__input" name="Fecha Nacimiento" id="Fecha Nacimiento" step={1} min={1} max={3} required />
                    </div>
                </div>
                <div className="formulario__grupo">
                    <label>Genero</label>
                    <select>
                        <option selected disabled>Seleccione un valor</option>
                        <option>Hembra</option>
                        <option>Hembra Esterilizada</option>
                        <option>Macho</option>
                        <option>Macho Castrado</option>
                    </select>
                </div>
                <div className="formulario__grupo" id="Chip">
                    <label htmlFor="Fecha Nacimiento" className="formulario__label">Numero de Chip</label>
                    <div className="formulario__grupo-input">
                        <input type="text" className="formulario__input" name="Chip" id="Chip" required />
                    </div>
                </div>
                <div className="formulario__grupo">
                    <label>Raza</label>
                    <select>
                        <option selected disabled>Seleccione un valor</option>
                        <option>CRIOLLO</option>
                        <option>G ABISINO</option>
                        <option>G ANGORA</option>
                        <option>G AZUL RUSO</option>
                        <option>G BENGALI</option>
                        <option>G BOMBAY</option>
                        <option>G BOSQUE DE NORUEGA</option>
                        <option>G CARTUJO</option>
                        <option>G COMUN EUROPEO</option>
                        <option>G CURL AMERICANO</option>
                        <option>G ESFINGE</option>
                        <option>G EXOTICO</option>
                        <option>G HIMALAYO</option>
                        <option>G MAINE COON</option>
                        <option>G ORIENTAL</option>
                        <option>G PERSA</option>
                        <option>G RAGNOLL</option>
                        <option>G SIAMES</option>
                        <option>G SIBERIANO</option>
                        <option>G SOMALI</option>
                        <option>P AKITA</option>
                        <option>P ALASKAN MALAMUTE</option>
                        <option>P BASSET HOUND</option>
                        <option>P BEAGLE</option>
                        <option>P BORDER COLLIE</option>
                        <option>P BOXER</option>
                        <option>P BULLDOG AMERICANO</option>
                        <option>P BULLDOG FRANCES</option>
                        <option>P BULLDOG INGLES</option>
                        <option>P CANICHE</option>
                    </select>
                </div>
                <div className="formulario__grupo">
                    <label>Especie</label>
                    <select>
                        <option selected disabled>Seleccione un valor</option>
                        <option>Canino</option>
                        <option>Felino</option>
                        <option>Porcino</option>
                        <option>Bovino</option>
                        <option>Ave Corral</option>
                        <option>Reptil</option>
                        <option>Roedor</option>
                        <option>Ave exotica</option>
                        <option>Pez</option>
                        <option>Equino</option>
                        <option>Otra</option>
                    </select>
                </div>
                <br /><br />
                <div className="formulario__grupo formulario__grupo-btn-enviar">
                    <button type="submit" className="formulario__btn">Guardar</button>
                </div>
            </form>
        </main>
    </div>
    </>
)
}

export default Avg_Formulario_mascota
