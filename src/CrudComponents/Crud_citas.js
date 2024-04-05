import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Form, Button} from 'react-bootstrap';
import Navbar from "../components/Navbar";
import StylesTabla from '../assets/css/avg_encabezado.module.scss';
import AppointmentService from '../services/AppointmentService';
import Menu_recepcionista from '../components/Menu_recepcionista';

function Crud_Citas() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    const [mostrarModalGuardar, setMostrarModalGuardar] = useState(false);
    const [datosFormularioEdicion, setDatosFormularioEdicion] = useState({ id: '', date: '', hour: '', petName: '', specialty: '', veterinarian: '' });
    const [citaSeleccionada, setCitaSeleccionada] = useState(null);
    const [mascotas, setMascotas] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await AppointmentService.getAllAppointments();
            setAppointments(response.data.DATA);
            // Obtener mascotas, especialidades y veterinarios disponibles
            const mascotas = response.data.DATA.map(cita => ({ id: cita.idmascota.id, name: cita.idmascota.name }));
            const especialidades = response.data.DATA.map(cita => ({ id: cita.idespecialidad.id, name: cita.idespecialidad.name }));
            const veterinarios = response.data.DATA.map(cita => ({ id: cita.idempleado.id, name: cita.idempleado.name }));
            // Filtrar valores únicos
            const mascotasUnicas = mascotas.filter((mascota, index, self) => self.findIndex(m => m.id === mascota.id) === index);
            const especialidadesUnicas = especialidades.filter((especialidad, index, self) => self.findIndex(e => e.id === especialidad.id) === index);
            const veterinariosUnicos = veterinarios.filter((veterinario, index, self) => self.findIndex(v => v.id === veterinario.id) === index);
            setMascotas(mascotasUnicas);
            setEspecialidades(especialidadesUnicas);
            setVeterinarios(veterinariosUnicos);
        } catch (error) {
            setError(error.message);
        }
    };

    const abrirModalGuardar = () => {
        setMostrarModalGuardar(true);
    };
    
    const cerrarModalGuardar = () =>{
        setMostrarModalGuardar(false);
    };

    const abrirModalEdicion = (cita) => {
        setCitaSeleccionada(cita);
        setDatosFormularioEdicion({
            id: cita.id,
            date: cita.date,
            hour: cita.hour,
            petName: cita.idmascota.name,
            specialty: cita.idespecialidad.name,
            veterinarian: cita.idempleado.name
        });
        setMostrarModalEdicion(true);
    };

    const cerrarModalEdicion = () => {
        setMostrarModalEdicion(false);
    };

    //Funcion para Guardar
        const handleGuardarCita = async () => {
            try {
                // Obtener el ID de la mascota seleccionada
                const idMascota = mascotas.find(mascota => mascota.name === datosFormularioEdicion.petName)?.id;
                
                // Obtener el ID de la especialidad seleccionada
                const idEspecialidad = especialidades.find(especialidad => especialidad.name === datosFormularioEdicion.specialty)?.id;
                
                // Obtener el ID del veterinario seleccionado
                const idVeterinario = veterinarios.find(veterinario => veterinario.name === datosFormularioEdicion.veterinarian)?.id;
        
                const response = await AppointmentService.createAppointment({
                    date: datosFormularioEdicion.date,
                    hour: datosFormularioEdicion.hour,
                    idmascota: {
                        id: idMascota
                    },
                    idespecialidad: {
                        id: idEspecialidad
                    },
                    idempleado: {
                        id: idVeterinario
                    }
                });
                console.log('Respuesta de la API:', response.data);
                fetchData(); // Actualiza la tabla
                cerrarModalGuardar(); // Cierra el modal
                // Limpiar los datos del formulario
                setDatosFormularioEdicion({ id: '', date: '', hour: '', petName: '', specialty: '', veterinarian: '' });
            } catch (error) {
                console.error('Error al guardar la cita:', error);
                // Manejar el error
            }
        };    

    //Funcion de actualizar
    const handleActualizarCita = async (datosCita) => {
        try {
            console.log('Datos de la cita a actualizar:', datosCita);

            // Obtener el ID de la mascota seleccionada
            const idMascota = mascotas.find(mascota => mascota.name === datosCita.petName)?.id;
            
            // Obtener el ID de la especialidad seleccionada
            const idEspecialidad = especialidades.find(especialidad => especialidad.name === datosCita.specialty)?.id;
            
            // Obtener el ID del veterinario seleccionado
            const idVeterinario = veterinarios.find(veterinario => veterinario.name === datosCita.veterinarian)?.id;

            const response = await AppointmentService.updateAppointment(datosCita.id, {
                date: datosCita.date,
                hour: datosCita.hour,
                idmascota: {
                    id: idMascota
                },
                idespecialidad: {
                    id: idEspecialidad
                },
                idempleado: {
                    id: idVeterinario
                }
            });
            console.log('Respuesta de la API:', response.data);
            fetchData();//Actualiza la tabla
            cerrarModalEdicion();//Cierra el modal o ventana emergente

        } catch (error) {
            console.error('Error al actualizar la cita:', error);
            // Manejar el error
        }
    };      

    return (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }} >
        <Menu_recepcionista/>
        <div style={{ display: 'flex', flexGrow: 1 }}>
        <div>
            <Navbar/>
        </div>
        {/*Tabla donde se muestra todo*/}
        <div className={StylesTabla.containerTable}>
            <div className={StylesTabla.TableHeader}>
                <section className="table__header">
                    <h1 className={StylesTabla.NombreTable}>Tabla citas</h1>
                    <div>
                        <button className={StylesTabla.buttonHeader} onClick={() => abrirModalGuardar()}>Crear Cita</button>
                    </div>
                    <br/>
                    <div className={StylesTabla.DivInpuctsearch}>
                        <input className={StylesTabla.Inpuctsearch} type="search" placeholder="Buscar" />
                        <i className="bi bi-search-heart" style={{ color: '#56208c', position: 'absolute', top: '10px', right: '1rem', fontSize: '1.2rem' }}></i>
                    </div>
                </section>
            </div>
            <div className={StylesTabla.tablebody}>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>Id</th>
                            <th style={{ textAlign: "center" }}>Fecha cita</th>
                            <th style={{ textAlign: "center" }}>Hora cita</th>
                            <th style={{ textAlign: "center" }}>Nombre Mascota</th>
                            <th style={{ textAlign: "center" }}>Especialidad</th>
                            <th style={{ textAlign: "center" }}>Veterinario</th>
                            <th style={{ textAlign: "center" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(appointment => (
                            <tr key={appointment.id}>
                                <td style={{ textAlign: "center" }}>{appointment.id}</td>
                                <td style={{ textAlign: "center" }}>{appointment.date}</td>
                                <td style={{ textAlign: "center" }}>{appointment.hour}</td>
                                <td style={{ textAlign: "center" }}>{appointment.idmascota.name}</td>
                                <td style={{ textAlign: "center" }}>{appointment.idespecialidad.name}</td>
                                <td style={{ textAlign: "center" }}>{appointment.idempleado.name}</td>
                                <td style={{ textAlign: "center" }}>
                                    <button type="button" className="btn btn-primary btn-sm" style={{ height: '3rem', width: '3rem', background: 'transparent', boxShadow: 'none', borderColor: 'transparent' }} onClick={() => abrirModalEdicion(appointment)}>
                                        <i className="bi bi-pencil-square" style={{ fontSize: '2rem', textAlign: "center", cursor: 'pointer' }}></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/*Modal o ventana emejernte para EDITAR */}
            <Modal show={mostrarModalEdicion} onHide={cerrarModalEdicion}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Cita</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicDate">
                            <Form.Label>Fecha cita</Form.Label>
                            <Form.Control type="date" value={datosFormularioEdicion.date} onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, date: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formBasicHour">
                            <Form.Label>Hora cita</Form.Label>
                            <Form.Control type="time" value={datosFormularioEdicion.hour} onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, hour: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPetName">
                            <Form.Label>Nombre Mascota</Form.Label>
                            <Form.Control as="select" value={datosFormularioEdicion.petName} onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, petName: e.target.value })}>
                                <option value="">Selecciona una mascota</option>
                                {mascotas.map((mascota, index) => (
                                    <option key={index} value={mascota.name}>{mascota.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicSpecialty">
                            <Form.Label>Especialidad</Form.Label>
                            <Form.Control as="select" value={datosFormularioEdicion.specialty} onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, specialty: e.target.value })}>
                                <option value="">Selecciona una especialidad</option>
                                {especialidades.map((especialidad, index) => (
                                    <option key={index} value={especialidad.name}>{especialidad.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicVeterinarian">
                            <Form.Label>Veterinario</Form.Label>
                            <Form.Control as="select" value={datosFormularioEdicion.veterinarian} onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, veterinarian: e.target.value })}>
                                <option value="">Selecciona un veterinario</option>
                                {veterinarios.map((veterinario, index) => (
                                    <option key={index} value={veterinario.name}>{veterinario.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cerrarModalEdicion}>Cancelar</Button>
                    <Button variant="primary" style={{background:'#56208c', borderColor: 'transparent'}} onClick={() => handleActualizarCita(datosFormularioEdicion)}>Guardar Cambios</Button>
                </Modal.Footer>
                </Modal>
                {/*Modal o ventana emejernte para GUARDAR */}
                <Modal show={mostrarModalGuardar} onHide={cerrarModalGuardar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Generar Cita</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicDate">
                                <Form.Label>Fecha cita</Form.Label>
                                <Form.Control type="date" placeholder="dd/mm/aaaa" onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, date: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formBasicHour">
                                <Form.Label>Hora cita</Form.Label>
                                <Form.Control type="time" placeholder="--:--" onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, hour: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPetName">
                                <Form.Label>Nombre Mascota</Form.Label>
                                <Form.Control as="select" onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, petName: e.target.value })}>
                                    <option value="">Selecciona una mascota</option>
                                    {mascotas.map((mascota, index) => (
                                        <option key={index} value={mascota.name}>{mascota.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicSpecialty">
                                <Form.Label>Especialidad</Form.Label>
                                <Form.Control as="select" onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, specialty: e.target.value })}>
                                    <option value="">Selecciona una especialidad</option>
                                    {especialidades.map((especialidad, index) => (
                                        <option key={index} value={especialidad.name}>{especialidad.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicVeterinarian">
                                <Form.Label>Veterinario</Form.Label>
                                <Form.Control as="select"  onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, veterinarian: e.target.value })}>
                                    <option value="">Selecciona un veterinario</option>
                                    {veterinarios.map((veterinario, index) => (
                                        <option key={index} value={veterinario.name}>{veterinario.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cerrarModalGuardar}>Cancelar</Button>
                        <Button variant="primary" style={{background:'#56208c', borderColor: 'transparent'}} onClick={handleGuardarCita}>Guardar Cambios</Button>
                    </Modal.Footer>
                </Modal>
        </div>
        </div>
        </div>
        </>
    );
}

export default Crud_Citas;