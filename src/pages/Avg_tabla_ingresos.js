import React from 'react'

function Avg_tabla_ingresos() {
return (
    <>
    <div>
        <main className="table">
            <section className="table__header">
                <h1>Ingresos</h1>
                <div className="input-group">
                    <input type="search" placeholder="Buscar " />
                    <img src="../Imegenes/search-icon.png" alt />
                </div>
            </section>
            <section className="table__body">
                <table>
                    <thead>
                        <tr>
                            <th>Hora cita</th>
                            <th>Nombre Propietario</th>
                            <th>Nombre Mascota</th>
                            <th>Estado</th>
                            <th>Veterinario</th>
                            <th>solucitud ingreso</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>4:00 p.m.</td>
                            <td>David  Cifuentes</td>
                            <td>Zeta</td>
                            <td>
                                <p className="status pendiente">Pendiente</p>
                            </td>
                            <td>Paola Martelo</td>
                            <td>
                                <img className="icono" src="../Imegenes/check.png" alt />
                                <img className="icono" src="../Imegenes/cross.png" alt />
                            </td>
                        </tr>
                        <tr>
                            <td>4:00 p.m.</td>
                            <td>Soraida Lopez</td>
                            <td>Copito</td>
                            <td>
                                <p className="status pendiente">Pendiente</p>
                            </td>
                            <td>Adriana Lima</td>
                            <td>
                                <img className="icono" src="../Imegenes/check.png" alt />
                                <img className="icono" src="../Imegenes/cross.png" alt />
                            </td>
                        </tr>
                        <tr>
                            <td>4:00 p.m.</td>
                            <td>Tatiana Aristizabal</td>
                            <td>Appa</td>
                            <td>
                                <p className="status pendiente">Pendiente</p>
                            </td>
                            <td>Leonardo Reyes</td>
                            <td>
                                <img className="icono" src="../Imegenes/check.png" alt />
                                <img className="icono" src="../Imegenes/cross.png" alt />
                            </td>
                        </tr>
                        <tr>
                            <td>3:30 p.m.</td>
                            <td>Luz Mery Guerra</td>
                            <td>Cherry Pie</td>
                            <td>
                                <p className="status pendiente">Pendiente</p>
                            </td>
                            <td>Paola Martelo</td>
                            <td>
                                <img className="icono" src="../Imegenes/check.png" alt />
                                <img className="icono" src="../Imegenes/cross.png" alt />
                            </td>
                        </tr>
                        <tr>
                            <td>3:00 p.m.</td>
                            <td>Angelica Velasco</td>
                            <td>Aramis</td>
                            <td>
                                <p className="status delivered">En cita</p>
                            </td>
                            <td>Adriana Lima</td>
                            <td>
                                <img className="icono" src="../Imegenes/check.png" alt />
                                <img className="icono" src="../Imegenes/cross.png" alt />
                            </td>
                        </tr>
                        <tr>
                            <td>3:00 p.m.</td>
                            <td>Samantha Restrepo</td>
                            <td>Akira</td>
                            <td>
                                <p className="status ausente">Inasistencia</p>
                            </td>
                            <td>Leonardo Reyes</td>
                            <td>
                                <img className="icono" src="../Imegenes/check.png" alt />
                                <img className="icono" src="../Imegenes/cross.png" alt />
                            </td>
                        </tr>
                        <tr>
                            <td>2:30 p.m.</td>
                            <td>Alejandro Rodriguez</td>
                            <td>Luna</td>
                            <td>
                                <p className="status delivered">En cita</p>
                            </td>
                            <td>Paola Martelo</td>
                            <td>
                                <img className="icono" src="../Imegenes/check.png" alt />
                                <img className="icono" src="../Imegenes/cross.png" alt />
                            </td>
                        </tr>
                        <tr>
                            <td>2:30 p.m.</td>
                            <td>Carolina Pardo</td>
                            <td>Artemis</td>
                            <td>
                                <p className="status delivered">Hospitalizado</p>
                            </td>
                            <td>Adriana Lima</td>
                            <td>
                                <img className="icono" src="../Imegenes/check.png" alt />
                                <img className="icono" src="../Imegenes/cross.png" alt />
                            </td>
                        </tr>
                        <tr>
                            <td>2:30 p.m.</td>
                            <td>Samantha Restrepo</td>
                            <td>Akira</td>
                            <td>
                                <p className="status cancelled">Cerrado</p>
                            </td>
                            <td>Leonardo Reyes</td>
                            <td>
                                <img className="icono" src="../Imegenes/check.png" alt />
                                <img className="icono" src="../Imegenes/cross.png" alt />
                            </td>
                        </tr>
                        <tr>
                            <td>2:00 p.m.</td>
                            <td>Valentina Lopez</td>
                            <td>Max</td>
                            <td>
                                <p className="status delivered">Observacion</p>
                            </td>
                            <td>Paola Martelo</td>
                            <td>
                                <img className="icono" src="../Imegenes/check.png" alt />
                                <img className="icono" src="../Imegenes/cross.png" alt />
                            </td>
                        </tr>
                        <tr>
                            <td>2:00 p.m.</td>
                            <td>Liliana Orozco</td>
                            <td>Tokio</td>
                            <td>
                                <p className="status cancelled">Cerrado</p>
                            </td>
                            <td>Adriana Lima</td>
                            <td>
                                <img className="icono" src="../Imegenes/check.png" alt />
                                <img className="icono" src="../Imegenes/cross.png" alt />
                            </td>
                        </tr>
                        <tr>
                            <td>2:00 p.m.</td>
                            <td>Eduardo Quinonez</td>
                            <td>Rufus</td>
                            <td>
                                <p className="status cancelled">Cerrado</p>
                            </td>
                            <td>Leonardo Reyes</td>
                            <td>
                                <img className="icono" src="../Imegenes/check.png" alt />
                                <img className="icono" src="../Imegenes/cross.png" alt />
                            </td>
                        </tr>
                        <tr>
                            <td>1:30 p.m.</td>
                            <td>Sofia Martinez</td>
                            <td>Bella</td>
                            <td>
                                <p className="status cancelled">Cerrado</p>
                            </td>
                            <td>Paola Martelo</td>
                            <td>
                                <img className="icono" src="../Imegenes/check.png" alt />
                                <img className="icono" src="../Imegenes/cross.png" alt />
                            </td>
                        </tr>
                        <tr>
                            <td>1:30 p.m.</td>
                            <td>Yolanda Gutierrez</td>
                            <td>Draco</td>
                            <td>
                                <p className="status cancelled">Cerrado</p>
                            </td>
                            <td>Adriana Lima</td>
                            <td>
                                <img className="icono" src="../Imegenes/check.png" alt />
                                <img className="icono" src="../Imegenes/cross.png" alt />
                            </td>
                        </tr>
                        <tr>
                            <td>1:30 p.m.</td>
                            <td>Rodolfo Hernadez</td>
                            <td>Okoye</td>
                            <td>
                                <p className="status cancelled">Cerrado</p>
                            </td>
                            <td>Leonardo Reyes</td>
                            <td>
                                <img className="icono" src="../Imegenes/check.png" alt />
                                <img className="icono" src="../Imegenes/cross.png" alt />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
        <br /><br /><br /><br />
    </div>

    </>
)
}

export default Avg_tabla_ingresos
