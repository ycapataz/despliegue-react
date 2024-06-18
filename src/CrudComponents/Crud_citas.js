import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Navbar from "../components/Navbar";
import StylesTabla from '../assets/css/avg_encabezado.module.scss';
import AppointmentService from '../services/AppointmentService';
import IncomeService from '../services/IncomeService';
import Menu_recepcionista from '../components/Menu_recepcionista';
import Swal from 'sweetalert2';


function Crud_Citas() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    const [mostrarModalGuardar, setMostrarModalGuardar] = useState(false);
    const [datosFormularioEdicion, setDatosFormularioEdicion] = useState({ id: '', date: '', hour: '', petName: '', specialty: '', veterinarian: '' });
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
        petName: Yup.string().required('Nombre de la mascota es requerido'),
        specialty: Yup.string().required('Especialidad es requerida'),
        veterinarian: Yup.string().required('Veterinario es requerido')
    });

    // Función para Guardar
    const handleGuardarCita = async (values, { setSubmitting }) => {
        try {
            const idMascota = mascotas.find(mascota => mascota.name === values.petName)?.id;
            const idEspecialidad = especialidades.find(especialidad => especialidad.name === values.specialty)?.id;
            const idVeterinario = veterinarios.find(veterinario => veterinario.name === values.veterinarian)?.id;

            const response = await AppointmentService.createAppointment({
                date: values.date,
                hour: values.hour,
                idmascota: { id: idMascota },
                idespecialidad: { id: idEspecialidad },
                idempleado: { id: idVeterinario }
            });
            console.log('Respuesta de la API:', response.data);

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

            console.log("Datos de ingreso enviados:", ingresoResponse);

            fetchData(); // Actualiza la tabla
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

    // Función de actualizar
    const handleActualizarCita = async (values, { setSubmitting }) => {
        try {
            const idMascota = mascotas.find(mascota => mascota.name === values.petName)?.id;
            const idEspecialidad = especialidades.find(especialidad => especialidad.name === values.specialty)?.id;
            const idVeterinario = veterinarios.find(veterinario => veterinario.name === values.veterinarian)?.id;

            const response = await AppointmentService.updateAppointment(values.id, {
                date: values.date,
                hour: values.hour,
                idmascota: { id: idMascota },
                idespecialidad: { id: idEspecialidad },
                idempleado: { id: idVeterinario }
            });
            fetchData(); // Actualiza la tabla
            cerrarModalEdicion(); // Cierra el modal
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Los cambios se guardaron correctamente.',
            });
        } catch (error) {
            console.error('Error al actualizar la cita:', error);
        } finally {
            setSubmitting(false);
        }
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
                        {/* Modal para EDITAR */}
                        <Modal show={mostrarModalEdicion} onHide={cerrarModalEdicion}>
                            <Modal.Header closeButton>
                                <Modal.Title>Editar Cita</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Formik
                                    initialValues={datosFormularioEdicion}
                                    validationSchema={validationSchema}
                                    onSubmit={handleActualizarCita}
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
                                            <Form.Group controlId="formBasicPetName">
                                                <Form.Label>Nombre Mascota</Form.Label>
                                                <Field as="select" name="petName" className="form-control">
                                                    <option value="">Selecciona una mascota</option>
                                                    {mascotas.map((mascota, index) => (
                                                        <option key={index} value={mascota.name}>{mascota.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="petName" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicSpecialty">
                                                <Form.Label>Especialidad</Form.Label>
                                                <Field as="select" name="specialty" className="form-control">
                                                    <option value="">Selecciona una especialidad</option>
                                                    {especialidades.map((especialidad, index) => (
                                                        <option key={index} value={especialidad.name}>{especialidad.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="specialty" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicVeterinarian">
                                                <Form.Label>Veterinario</Form.Label>
                                                <Field as="select" name="veterinarian" className="form-control">
                                                    <option value="">Selecciona un veterinario</option>
                                                    {veterinarios.map((veterinario, index) => (
                                                        <option key={index} value={veterinario.name}>{veterinario.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="veterinarian" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={cerrarModalEdicion}>Cancelar</Button>
                                                <Button type="submit" variant="primary" style={{ background: '#56208c', borderColor: 'transparent' }} disabled={isSubmitting}>Guardar Cambios</Button>
                                            </Modal.Footer>
                                        </FormikForm>
                                    )}
                                </Formik>
                            </Modal.Body>
                        </Modal>
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
                                            <Form.Group controlId="formBasicPetName">
                                                <Form.Label>Nombre Mascota</Form.Label>
                                                <Field as="select" name="petName" className="form-control">
                                                    <option value="">Selecciona una mascota</option>
                                                    {mascotas.map((mascota, index) => (
                                                        <option key={index} value={mascota.name}>{mascota.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="petName" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicSpecialty">
                                                <Form.Label>Especialidad</Form.Label>
                                                <Field as="select" name="specialty" className="form-control">
                                                    <option value="">Selecciona una especialidad</option>
                                                    {especialidades.map((especialidad, index) => (
                                                        <option key={index} value={especialidad.name}>{especialidad.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="specialty" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicVeterinarian">
                                                <Form.Label>Veterinario</Form.Label>
                                                <Field as="select" name="veterinarian" className="form-control">
                                                    <option value="">Selecciona un veterinario</option>
                                                    {veterinarios.map((veterinario, index) => (
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