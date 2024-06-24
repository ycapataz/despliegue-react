import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Navbar from "../components/Navbar";
import StylesTabla from '../assets/css/avg_encabezado.module.scss';
import AppointmentService from '../services/AppointmentService';
import PetService from '../services/PetService';
import IncomeService from '../services/IncomeService';
import SpecialtyService from '../services/SpecialtyService';
import EmployeeService from '../services/EmployeeService';
import Menu_recepcionista from '../components/Menu_recepcionista';
import Swal from 'sweetalert2';


function Crud_Citas() {
    const [appointments, setAppointments] = useState([]);
    const [Citas, setCitas] = useState([]);
    const [error, setError] = useState(null);
    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    const [mostrarModalGuardar, setMostrarModalGuardar] = useState(false);
    const [datosFormularioEdicion, setDatosFormularioEdicion] = useState({ id: '', date: '', hour: '', petName: '', specialty: '', veterinarian: '' });
    const [mascotas, setMascotas] = useState([]);
    const [mascotasSelect, setMascotasSelect] = useState([]);
    const [EspecialidadSelect, setEspecialidadSelect] = useState([]);
    const [VeterinarioSelect, setVeterinarioSelect] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [veterinarios, setVeterinarios] = useState([]);
    const [dni, setDni] = useState('');
    const [FilteredMascotasSelect, setFilteredMascotasSelect] = useState([]);

    useEffect(() => {
        fetchData();
        fetchMascotaSelect();
        fetchCitas();
        fetchEspecialidadSelect();
        fetchVeterinarioSelect();
    }, []);

    const fetchEspecialidadSelect = async () => {
        try {
            const response = await SpecialtyService.getAllSpecialtys();
            setEspecialidadSelect(response.data.DATA);
        } catch (error) {
            console.log("Error al obtener las especialidades: ", error);
        }
    }

    const fetchVeterinarioSelect = async () => {
        try {
            const response = await EmployeeService.getAllEmployees();
            setVeterinarioSelect(response.data);
        } catch (error) {
            console.log("Error al obtener los empleados: ", error);
        }
    }

    const VeterinariosFiltrados = VeterinarioSelect
    .filter(veterinario => veterinario.idcargo.id === 1)
    .map(veterinario => ({
        id: veterinario.id,
        name: veterinario.name
    }));

    const fetchData = async () => {
        try {
            const response = await AppointmentService.getAllAppointments();
            setAppointments(response.data.DATA.reverse());
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

    const fetchCitas = async () => {
        try {
            const response = await AppointmentService.getAllAppointments();
            setCitas(response.data.DATA.reverse());
        } catch (error) {
            setError(error.message);
        }
    }

    // Filtrar los ingresos según el ID del empleado y el término de búsqueda
    const CitasFiltradas = Citas.filter(appointments => {
        const termino = terminoBusqueda.toLowerCase();
        return (
            appointments.id?.toString().includes(termino) ||
            appointments.date?.toLowerCase().includes(termino) ||
            appointments.hour?.toLowerCase().includes(termino) ||
            appointments.idmascota?.idcliente?.dni?.toLowerCase().includes(termino) ||
            appointments.idmascota?.name?.toLowerCase().includes(termino) ||
            appointments.idespecialidad?.name?.toString().toLowerCase().includes(termino) ||
            appointments.idempleado?.name?.toLowerCase().includes(termino)
        );
    });

    const fetchMascotaSelect = async () => {
        try {
            const response = await PetService.getAllPets();
            setMascotasSelect(response.data.data);
        } catch (error) {
            setError(error.message);
        }
    }

    const abrirModalGuardar = () => {
        setMostrarModalGuardar(true);
    };

    const cerrarModalGuardar = () => {
        setMostrarModalGuardar(false);
        Swal.fire({
            icon: 'info',
            title: 'Cancelado',
            text: 'Cita cancelada.'
        });
    };

    const abrirModalEdicion = (cita) => {
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
        setMostrarModalGuardar(false);
        Swal.fire({
            icon: 'info',
            title: 'Cancelado',
            text: 'Edicion de cita cancelada.'
        });
    };

    const confirmarEliminarCita = (citaId) => {
        Swal.fire({
            title: '¿Estás seguro en cancelar la cita?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#56208C',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar!'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarCita(citaId);
            }
        });
    };

    // Función para manejar el cambio en el input de búsqueda
    const manejarCambioBusqueda = (e) => {
        setTerminoBusqueda(e.target.value);
    };

    const eliminarCita = async (citaId) => {
        try {
             // Consultar todos los ingresos
            const ingresosResponse = await IncomeService.getAllIncomes();
            console.log("ingresos",ingresosResponse);
            const ingresos = ingresosResponse.data.data;

             // Filtrar y eliminar los ingresos relacionados con la cita
            const ingresosRelacionados = ingresos.filter(ingreso => ingreso.idcita.id === citaId);
            for (const ingreso of ingresosRelacionados) {
                await IncomeService.deleteIncome(ingreso.id);
            }
            // Eliminar la cita
            await AppointmentService.deleteAppointment(citaId);
            fetchData(); // Actualiza la tabla después de eliminar
            fetchCitas();
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Cita cancelada correctamente.',
            });
        } catch (error) {
            console.error('Error al eliminar la cita:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al cancelar la cita.',
            });
        }
    };
    const minDate = new Date().toISOString().slice(0, 10); // Fecha mínima actual
    const maxDate = new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString().slice(0, 10); // Fecha máxima dentro de dos meses

    const validationSchema = Yup.object().shape({
        date: Yup.date()
            .required('Fecha es requerida')
            .min(new Date(), 'La fecha no puede ser anterior a hoy')
            .max(new Date(new Date().setMonth(new Date().getMonth() + 3)), 'La fecha no puede ser más de 3 meses desde hoy'),
        hour: Yup.string().required('Hora es requerida')
        .test('hora-valida', 'Hora no permitida', function(value) {
            const selectedDate = new Date(this.parent.date);
            const selectedTime = new Date(`2024-01-01 ${value}`);

            // Obtener el día de la semana (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
            const dayOfWeek = selectedDate.getDay();

            // Definir los horarios permitidos según el día de la semana
            if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                // Lunes a Viernes: 8:00am - 7:00pm
                const inicioLunesViernes = new Date(`2024-01-01 08:00`);
                const finLunesViernes = new Date(`2024-01-01 19:00`);
                return selectedTime >= inicioLunesViernes && selectedTime <= finLunesViernes;
            } else if (dayOfWeek === 0 || dayOfWeek === 6) {
              // Sábado y Domingo: 10:00am - 6:00pm
                const inicioSabadoDomingo = new Date(`2024-01-01 10:00`);
                const finSabadoDomingo = new Date(`2024-01-01 18:00`);
                return selectedTime >= inicioSabadoDomingo && selectedTime <= finSabadoDomingo;
            } else {
                return false;
            }
        }),
        idmascota: Yup.string().required('Nombre de la mascota es requerido'),
        specialty: Yup.string().required('Especialidad es requerida'),
        veterinarian: Yup.string().required('Veterinario es requerido')
    });

    // Función para Guardar
    const handleGuardarCita = async (values, { setSubmitting }) => {
        try {
            const idEspecialidad = especialidades.find(especialidad => especialidad.name === values.specialty)?.id;
            const idVeterinario = veterinarios.find(veterinario => veterinario.name === values.veterinarian)?.id;

            const response = await AppointmentService.createAppointment({
                date: values.date,
                hour: values.hour,
                idmascota: { id: values.idmascota },
                idespecialidad: { id: idEspecialidad },
                idempleado: { id: idVeterinario }
            });

            // Obtener todas las citas para encontrar la última creada
            const responseCita = await AppointmentService.getAllAppointments();
            const citas = responseCita.data.DATA;

            // Asumimos que las citas están ordenadas por ID en orden ascendente
            const ultimaCita = citas[citas.length - 1];
            const idCita = ultimaCita.id;

            if (!idCita) {
                throw new Error('ID de la cita no encontrado en la respuesta');
            }
            const ingresoResponse = await IncomeService.createIncomes(
                {
                    date: values.date,
                    hour: values.hour,
                    idcita: { id: idCita },
                    idestadoingreso: { id: 5 },
                    idtipoingreso: { id: 1 }
                }
            );

            fetchData(); // Actualiza la tabla
            fetchCitas();
            cerrarModalGuardar(); // Cierra el modal
            setDatosFormularioEdicion({ id: '', date: '', hour: '', petName: '', specialty: '', veterinarian: '' });
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Cita guardada correctamente.',
            });
        } catch (error) {
            console.error('Error al guardar la cita:', error);
        } finally {
            setSubmitting(false);
        }
    };
    const handleDniChange = (event) => {
        const dni = event.target.value;
        setDni(dni);
        const filtered = mascotasSelect.filter(mascota => mascota.idcliente.dni === dni);
        setFilteredMascotasSelect(filtered);
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Menu_recepcionista />
                <div style={{ display: 'flex', flexGrow: 1 }}>
                    <div>
                        <Navbar />
                    </div>
                    <div className={StylesTabla.containerTable}>
                        <div className={StylesTabla.TableHeader}>
                            <section className="table__header">
                                <h1 className={StylesTabla.NombreTable}>Tabla citas</h1>
                                <div>
                                    <button className={StylesTabla.buttonHeader} onClick={() => abrirModalGuardar()}>Crear Cita</button>
                                </div>
                                <br />
                                <div className={StylesTabla.DivInpuctsearch}>
                                    <input className={StylesTabla.Inpuctsearch} type="search" placeholder="Buscar" value={terminoBusqueda} onChange={manejarCambioBusqueda} />
                                    <i className="bi bi-search-heart" style={{ color: '#56208c', position: 'absolute', top: '10px', right: '1rem', fontSize: '1.2rem' }}></i>
                                </div>
                            </section>
                        </div>
                        <div className={StylesTabla.tablebody}>
                            <table className="table table-striped table-hover">
                                <thead className={StylesTabla.tablethead}>
                                    <tr>
                                        <th style={{ textAlign: "center" }}>Id</th>
                                        <th style={{ textAlign: "center" }}>Fecha cita</th>
                                        <th style={{ textAlign: "center" }}>Hora cita</th>
                                        <th style={{ textAlign: "center" }}>N° cedula</th>
                                        <th style={{ textAlign: "center" }}>Nombre Mascota</th>
                                        <th style={{ textAlign: "center" }}>Especialidad</th>
                                        <th style={{ textAlign: "center" }}>Veterinario</th>
                                        <th style={{ textAlign: "center" }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CitasFiltradas.map(appointment => (
                                        <tr key={appointment.id}>
                                            <td style={{ textAlign: "center" }}>{appointment.id}</td>
                                            <td style={{ textAlign: "center" }}>{appointment.date}</td>
                                            <td style={{ textAlign: "center" }}>{appointment.hour}</td>
                                            <td style={{ textAlign: "center" }}>{appointment.idmascota.idcliente.dni}</td>
                                            <td style={{ textAlign: "center" }}>{appointment.idmascota.name}</td>
                                            <td style={{ textAlign: "center" }}>{appointment.idespecialidad.name}</td>
                                            <td style={{ textAlign: "center" }}>{appointment.idempleado.name}</td>
                                            <td style={{ textAlign: "center" }}>
                                                <button type="button" className="btn btn-primary btn-sm" style={{ height: '3rem', width: '3rem', background: 'transparent', boxShadow: 'none', borderColor: 'transparent' }} onClick={() => confirmarEliminarCita(appointment.id)}>
                                                    <i className="bi bi-x-circle-fill" style={{ fontSize: '2rem', textAlign: "center", cursor: 'pointer' }}></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Modal para GUARDAR */}
                        <Modal show={mostrarModalGuardar} onHide={cerrarModalGuardar}>
                            <Modal.Header closeButton>
                                <Modal.Title>Generar Cita</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Formik
                                    initialValues={{ date: '', hour: '', petName: '', specialty: '', veterinarian: '' }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleGuardarCita}
                                >
                                    {({ isSubmitting }) => (
                                        <FormikForm>
                                            <Form.Group controlId="formBasicDate">
                                                <Form.Label>Fecha cita</Form.Label>
                                                <Field type="date" name="date" className="form-control" />
                                                <ErrorMessage name="date" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicHour">
                                                <Form.Label>Hora cita</Form.Label>
                                                <Field type="time" name="hour" className="form-control" />
                                                <ErrorMessage name="hour" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasiccedula">
                                                <Form.Label>N° Cedula cliente</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="number_microchip"
                                                    value={dni}
                                                    onChange={handleDniChange}                                                   
                                                />

                                            </Form.Group>
                                            <Form.Group controlId="formBasicPetName">
                                                <Form.Label>Nombre Mascota</Form.Label>
                                                <Field as="select" name="idmascota" className="form-control">
                                                    <option value="">Selecciona una mascota</option>
                                                    {FilteredMascotasSelect.map(mascota => (
                                                        <option key={mascota.id} value={mascota.id}>{mascota.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="idmascota" component="div" className="text-danger" />
                                            </Form.Group>
                                            {/* <ErrorMessage name="petName" component="div" className="text-danger" /> */}
                                            <Form.Group controlId="formBasicSpecialty">
                                                <Form.Label>Especialidad</Form.Label>
                                                <Field as="select" name="specialty" className="form-control">
                                                    <option value="">Selecciona una especialidad</option>
                                                    {EspecialidadSelect.map((especialidad, index) => (
                                                        <option key={index} value={especialidad.name}>{especialidad.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="specialty" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicVeterinarian">
                                                <Form.Label>Veterinario</Form.Label>
                                                <Field as="select" name="veterinarian" className="form-control">
                                                    <option value="">Selecciona un veterinario</option>
                                                    {VeterinariosFiltrados.map((veterinario, index) => (
                                                        <option key={index} value={veterinario.name}>{veterinario.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="veterinarian" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={cerrarModalGuardar}>Cancelar</Button>
                                                <Button type="submit" variant="primary" style={{ background: '#56208c', borderColor: 'transparent' }} disabled={isSubmitting}>Guardar Cambios</Button>
                                            </Modal.Footer>
                                        </FormikForm>
                                    )}
                                </Formik>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Crud_Citas;