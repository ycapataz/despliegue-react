import React from 'react'

function Avg_Formulario_perfil_recep() {
return (
    <>
    <div>
        <br /><br /><br /><br />
        <main>
            <h1>CATALINA RUIZ MENDEZ</h1>
            <div className="img_usuaro">
                <img src="../Imegenes/recepcionista_perfil.jpg" />
            </div>
            <br /><br />
            <form action className="formulario" id="formulario">
                {/* Grupo: Nombre Usuario */}
                <div className="formulario__grupo" id="Nombre">
                    <label htmlFor="Nombre" className="formulario__label">Nombres</label>
                    <div className="formulario__grupo-input">
                        <input type="text" className="formulario__input" name="Nombre" id="Nombre" placeholder="Catalina" readOnly defaultValue />
                    </div>
                </div>
                <div className="formulario__grupo" id="Apellidos">
                    <label htmlFor="Apellidos" className="formulario__label">Apellidos</label>
                    <div className="formulario__grupo-input">
                        <input type="text" className="formulario__input" name="Apellidos" id="Apellidos" placeholder="Ruiz Mendez" readOnly defaultValue />
                    </div>
                </div>
                {/* Grupo: Cedula */}
                <div className="formulario__grupo" id="Cedula">
                    <label htmlFor="Cedula" className="formulario__label">Numero de Cedula</label>
                    <div className="formulario__grupo-input">
                        <input type="number" className="formulario__input" name="Cedula" id="Cedula" step={1} min={10000000} max={1999999999} placeholder={1014568987} readOnly defaultValue />
                    </div>
                </div>
                <div className="formulario__grupo" id="Fecha Nacimiento">
                    <label htmlFor="Fecha Nacimiento" className="formulario__label">Fecha Nacimiento</label>
                    <div className="formulario__grupo-input">
                        <input type="text" className="formulario__input" name="Fecha Nacimiento" id="Fecha Nacimiento" step={1} min={1} max={3} placeholder="01/08/2002" readOnly defaultValue />
                    </div>
                </div>
                <div className="formulario__grupo" id="Celular">
                    <label htmlFor="Celular" className="formulario__label">Numero Celular</label>
                    <div className="formulario__grupo-input">
                        <input type="number" className="formulario__input" name="Celular" id="Celular" min={3002000000} max={3509999999} placeholder={3004556633} readOnly defaultValue />
                    </div>
                </div>
                <div className="formulario__grupo" id="Email">
                    <label htmlFor="Email" className="formulario__label">Email</label>
                    <div className="formulario__grupo-input">
                        <input type="email" className="formulario__input" name="Email" id="Email" placeholder="cruizm@dogsano.com" readOnly defaultValue />
                    </div>
                </div>
                <div className="formulario__grupo" id="Direccion">
                    <label htmlFor="Direccion" className="formulario__label">Direccion</label>
                    <div className="formulario__grupo-input">
                        <input type="text" className="formulario__input" name="Direccion" id="Direccion" placeholder="Cra 68 # 68d 24 Urb Salomon torre 4 apto 1303" readOnly defaultValue />
                    </div>
                </div>
                <div className="formulario__grupo" id="Especialidad">
                    <label htmlFor="Especialidad" className="formulario__label">Especialidad</label>
                    <div className="formulario__grupo-input">
                        <input type="text" className="formulario__input" name="Especialidad" id="Especialidad" placeholder="Auxiliar" readOnly defaultValue />
                    </div>
                </div>
                <div className="formulario__grupo" id="Cargo">
                    <label htmlFor="Cargo" className="formulario__label">Especialidad</label>
                    <div className="formulario__grupo-input">
                        <input type="text" className="formulario__input" name="Cargo" id="Cargo" placeholder="Recepcionista" readOnly defaultValue />
                    </div>
                </div>
                <div className="formulario__grupo" id="Eps">
                    <label htmlFor="Eps" className="formulario__label">Eps</label>
                    <div className="formulario__grupo-input">
                        <input type="text" className="formulario__input" name="Eps" id="Eps" placeholder="E.P.S. SANITAS S.A." readOnly defaultValue />
                    </div>
                    <br /><br />
                </div>
                <div className="formulario__grupo formulario__grupo-btn-enviar">
                    <button type="submit" className="formulario__btn">Editar</button>
                </div>
            </form>
        </main>
    </div>
    </>
)
}

export default Avg_Formulario_perfil_recep
