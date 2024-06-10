import React, { useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import StylesTabla from '../assets/css/avg_encabezado.module.scss';//Estilos de la tabla.
import MenuVeterinario from '../components/Menu_veterinario';//Se importa el menu del veterinario.
import Swal from 'sweetalert2'; //Se importan  sweetalert2 para manejar alertas.
import Navbar from "../components/Navbar_V";//Se importa navbar veterinario.
import IncomeService from '../services/IncomeService';//Se importa el servicio necesario
import UserContext from '../context/UserContext'; //Se importa el Usercontext para traer el id del usuario que a iniciado sesión.
import SelectedIngresoContext from '../context/SelectedIngresoContext';

function CrudNotifiicacionesV() {
    const [Ingresos, setIngreso] = useState([]);//Constante donde se guarda todos los ingresos.
    const [terminoBusqueda, setTerminoBusqueda] = useState('');//Variable constante donde se establecen los términos de busqueda
    const { user } = useContext(UserContext);//almacena en una constante user el UserContext
    const idEmpleado = user ? user.id : null;//Se extraer el id del veterinario
    const { setSelectedIngresoId } = useContext(SelectedIngresoContext);
    const navigate = useNavigate();
    
{/*--------------------------------------Consulta donde axios donde se almacena los ingresos SPRING-BOOT----------------------------------------*/}
    const Notificaciones = async () => {
        try {
            const response = await IncomeService.getAllIncomes();
            setIngreso(response.data.data);
        } catch (error) {
            console.error('Error al obtener los ingresos:', error);
        }
    };
{/*---------------------------------------------------------------------------------------------------------------------------------------------*/}

useEffect(() => {
    Notificaciones();
},[]);

//Funcion para traer la fecha actual.
const obtenerFechaActual = () => {
    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
};

//Funcion para traer la hora actual.
const obtenerHoraActual = () => {
    const horaActual = new Date();
    const horas = String(horaActual.getHours()).padStart(2, '0');
    const minutos = String(horaActual.getMinutes()).padStart(2, '0');
    const segundos = String(horaActual.getSeconds()).padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
};

// Función para manejar el cambio en el input de búsqueda
const manejarCambioBusqueda = (e) => {
    setTerminoBusqueda(e.target.value);
};

    //llama las funciones y las alamacena dentro de variables constantes
    const fechaActual = obtenerFechaActual();
    const horaActual = obtenerHoraActual();

    // Filtrar los ingresos según el ID del empleado y el término de búsqueda
    const ingresosFiltrados = Ingresos.filter(ingreso =>
        ingreso.idcita?.idempleado?.id === idEmpleado &&
        ingreso.date === fechaActual && (
            ingreso.id.toString().includes(terminoBusqueda) ||
            ingreso.hour.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            ingreso.date.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            ingreso.idcita?.idmascota?.idcliente?.dni?.toString().includes(terminoBusqueda.toLowerCase()) ||
            ingreso.idcita?.idmascota?.idcliente?.name?.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            ingreso.idcita?.idmascota?.name?.toLowerCase().includes(terminoBusqueda.toLowerCase())
        )
    );

    const handleSeleccionarIngreso = (id) => {
        //console.log('ID del ingreso seleccionado:', id);
        setSelectedIngresoId(id);
        navigate('/registroClinico');
    };

    return (
        <>
{/*--------------------------------------Tabla donde se muestra todo----------------------------------------*/}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }} >
        <MenuVeterinario/>
        <div style={{ display: 'flex', flexGrow: 1 }}>
        <div>
            <Navbar/>
        </div>
        <div className={StylesTabla.containerTable}>
            <div className={StylesTabla.TableHeader}>
                <section className="table__header">
                    <h1 className={StylesTabla.NombreTable}>Notificación ingreso</h1>
                    <br/>
                    <div className={StylesTabla.DivInpuctsearch}>
                        <input className={StylesTabla.Inpuctsearch} type="search" placeholder="Buscar" value={terminoBusqueda} onChange={manejarCambioBusqueda} />
                        <i className="bi bi-search-heart" style={{ color: '#56208c', position: 'absolute', top: '10px', right: '1rem', fontSize: '1.2rem' }}></i>
                    </div>
                </section>
            </div>
            <div className={StylesTabla.tablebody}>
                <table className="table table-striped table-hover">
                    <thead className={StylesTabla.tablethead} >
                        <tr>
                            <th style={{ textAlign: "center" }}>ID</th>
                            <th style={{ textAlign: "center" }}>Hora ingreso</th>
                            <th style={{ textAlign: "center" }}>Fecha ingreso</th>
                            <th style={{ textAlign: "center" }}>Cedula Propietario</th>
                            <th style={{ textAlign: "center" }}>Nombre Propietario</th>
                            <th style={{ textAlign: "center" }}>Nombre Mascota</th>
                            <th style={{ textAlign: "center" }}>solicitud ingreso</th>
                        </tr>
                    </thead>
                    <tbody>
                    {ingresosFiltrados.map(ingreso => (
                                        <tr key={ingreso.id}>
                                            <td style={{ textAlign: "center" }}>{ingreso.id}</td>
                                            <td style={{ textAlign: "center" }}>{ingreso.hour}</td>
                                            <td style={{ textAlign: "center" }}>{ingreso.date}</td>
                                            <td style={{ textAlign: "center" }}>{ingreso.idcita.idmascota.idcliente.dni}</td>
                                            <td style={{ textAlign: "center" }}>{ingreso.idcita.idmascota.idcliente.name}</td>
                                            <td style={{ textAlign: "center" }}>{ingreso.idcita.idmascota.name}</td>
                                            <td style={{ textAlign: "center" }}>
                                                <button type="button" className="btn btn-primary btn-sm" style={{ height: '3rem', width: '3rem', background: 'transparent', boxShadow: 'none', borderColor: 'transparent' }} onClick={() => handleSeleccionarIngreso(ingreso.id)}>
                                                    <i className="bi bi-check2-circle" style={{ fontSize: '2rem', textAlign: "center", cursor: 'pointer' }}></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
        </div>
{/*---------------------------------------------------------------------------------------------*/}

        </>
    );
}

export default CrudNotifiicacionesV;
