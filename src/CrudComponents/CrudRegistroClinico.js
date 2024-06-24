import React, { useContext, useState, useEffect} from 'react';
import Swal from 'sweetalert2'; //Se importan sweetalert para manejar alertas.
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Form, Button} from 'react-bootstrap';
import Navbar from "../components/Navbar_V";
import StylesTabla from '../assets/css/avg_encabezado.module.scss';
import ClinicalRecordService from '../services/ClinicalRecordService';
import MenuVeterinario from '../components/Menu_veterinario';
import DiseaseService from '../services/DiseaseService';
import UserContext from '../context/UserContext';
import SelectedIngresoContext from '../context/SelectedIngresoContext';
import SelectedRegistroClinicoContext from '../context/SelectedRegistroContext';
import IncomeService from '../services/IncomeService';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';
import ReporteExcel from '../components/ReporteExcel';
import MedicalExamService from '../services/MedicalExamService';



function CrudRegistroClinico() {
    const { selectedIngresoId } = useContext(SelectedIngresoContext);
    const { user } = useContext(UserContext);
    const IdUsuario = user.id;
    const [clinicalRecords, setClinicalRecords] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalGuardar, setshowModalGuardar] = useState(false);
    const [Enfermedades, setEnfermedad] = useState([]);
    const navigate = useNavigate();
    const [Ingresos, setIngresos] = useState([]);
    const [Examenes, setExamenes] = useState([]);
    const { setSelectedRegistroClinicoId } = useContext(SelectedRegistroClinicoContext);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const handleChangeBusqueda = (event) => {
        setTerminoBusqueda(event.target.value);
    };
    const handleMostrarModal = () => {
        setshowModalGuardar(true);
    };
    const redireccionarANotificacion = () => {
        navigate('/notificacion');
    };
    const [CrearRegistroC, setCrearRegistroC] = useState({
        heart_rate: '',
        observations: '',
        temperature: '',
        idenfermedad:'',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCrearRegistroC({ ...CrearRegistroC, [name]: value });
    };
    
    const handleCerrarModalGuardar = () => {
        setshowModalGuardar(false);
        Swal.fire({
            icon: 'info',
            title: 'Cancelado',
            text: 'Registro clínico cancelado.'
        });
    };

    const [editedRecord, setEditedRecord] = useState({
        id: '',
        heart_rate: '',
        observations: '',
        clinical_Record_Data: '',
        temperature: '',
        idingreso: { date: '' },
        idempleado: { name: '' },
        idmascota:{ name: ''},
        idexamenmedico:{ exam: '' },
        idenfermedad:{ name: '' }
    });

    // Estado para los datos editados en el modal
    const [datosFormularioEdicion, setDatosFormularioEdicion] = useState({
        date: '',
        hour: '',
        petName: '',
        specialty: '',
        veterinarian: ''
    });

    const fetchClinicalRecords = async () => {
        try {
            const response = await ClinicalRecordService.getAllClinicalRecords();
            setClinicalRecords(response.data.reverse());
        } catch (error) {
            console.error('Error al obtener los registros clínicos:', error);
        }
    };
    //Consulta todos los exámenes
    const fetchExamenes = async () => {
        try {
            const response = await MedicalExamService.getAllMedicalExams();
            setExamenes(response.data.data);
        } catch (error) {
            console.error('Error al obtener los Exámenes:', error);
        }
    };

    const fetchEnfermedad = async () => {
        try {
            const response = await DiseaseService.getAllDiseases();
            setEnfermedad(response.data);
        } catch (error) {
            console.error('Error al obtener las enfermedades:', error);
        }
    };

    const fetchIngresos = async () => {
        try {
            if (!selectedIngresoId) {
                // No hay ID de ingreso seleccionado, por lo que no se realiza ninguna consulta
                setIngresos([]);
                return;
            }
            const response = await IncomeService.getIdIncomes(selectedIngresoId);
            setIngresos(response.data.data);
        } catch (error) {
            console.error('Error al obtener los ingresos:', error);
            setIngresos([]);
        }
    };
    

    useEffect(() => {
        fetchClinicalRecords();
        fetchEnfermedad();
        fetchIngresos();
        fetchExamenes();
    }, [selectedIngresoId]);

    const handleEditRecord = (record) => {
        setEditedRecord(record);
        setDatosFormularioEdicion({
            date: record.idingreso.date,
            hour: '',
            petName: '',
            specialty: '',
            veterinarian: '',
            idexamenmedico: editedRecord.idexamenmedico,
            idenfermedad: editedRecord.idenfermedad
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        Swal.fire({
            icon: 'info',
            title: 'Cancelado',
            text: 'La edición ha sido cancelada.'
        });
    };

    const Editar = async (values) => {
        try {
            await ClinicalRecordService.updateClinicalRecord(editedRecord.id, {
                heart_rate: values.heart_rate,
                temperature: values.temperature,
                clinical_Record_Data: editedRecord.clinical_Record_Data,
                observations: values.observations,
                idexamenmedico: { id: values.idexamenmedico },
                idenfermedad: { id: values.idenfermedad },
            });
            setShowModal(false);
            fetchClinicalRecords();
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Los cambios se guardaron correctamente.',
            });
        } catch (error) {
            console.error('Error al guardar los cambios del registro clínico:', error);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Hubo un error al guardar los cambios.',
            });
        }
    };

    const obtenerFechaActual = () => {
        const fechaActual = new Date();
        const anio = fechaActual.getFullYear();
        const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
        const dia = String(fechaActual.getDate()).padStart(2, '0');
        return `${anio}-${mes}-${dia}`;
    };

    //const fechaActual = obtenerFechaActual();
    

    const GuardarRegistroClinico = async (values, { resetForm }) => {
        try {
            if (!Ingresos || !Ingresos.idcita || !Ingresos.idcita.idmascota) {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Por favor, selecciona un ingreso para continuar.',
                    confirmButtonText: 'Seleccionar Ingreso',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/notificacion');
                    }
                });

                return;
            }

            const registroClinico = {
                heart_rate: values.heart_rate,
                observations: values.observations,
                clinical_Record_Data: new Date().toISOString().split('T')[0],
                temperature: values.temperature,
                idingreso: { id: Ingresos.id },
                idempleado: { id: IdUsuario },
                idexamenmedico: { id: values.idexamenmedico },
                idenfermedad: { id: values.idenfermedad },
                idmascota: { id: Ingresos.idcita.idmascota.id },
            };
            await ClinicalRecordService.createClinicalRecord(registroClinico);

            // Después de guardar, limpiar el estado de Ingresos
            setIngresos(null);

            setshowModalGuardar(false);
            fetchClinicalRecords();

            // Vaciar el formulario
            resetForm();

            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'El registro clínico se ha guardado correctamente.',
            });
        } catch (error) {
            console.error('Error al guardar el registro clínico:', error);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: error.message || 'Hubo un error al guardar el registro clínico.',
            });
        }
    };

    const validateForm = (values) => {
        const errors = {};
        // Validar frecuencia cardíaca.
        if (!values.heart_rate) {
            errors.heart_rate = 'La frecuencia cardíaca es requerida.';
        } else if (!/^[1-9][0-9]*$/.test(values.heart_rate)) {
            errors.heart_rate = 'Por favor ingresar una frecuencia cardíaca válida.';
        } else if (parseInt(values.heart_rate, 10) > 600) {
            errors.heart_rate = 'La frecuencia cardíaca máxima permitida es 600.';
        }
        // Validar temperatura.
        if (!values.temperature) {
            errors.temperature = 'La temperatura es requerida.';
        } else if (!/^[1-9][0-9]*$/.test(values.temperature)) {
            errors.temperature = 'Por favor ingresar una temperatura válida.';
        } else if (parseInt(values.temperature, 10) > 44) {
            errors.temperature = 'La temperatura máxima permitida es 44.';
        }
        // Validar observaciones.
        if (!values.observations) {
            errors.observations = 'Las observaciones son requeridas.';
        }
        // Validar examen.
        if (!values.idexamenmedico) {
            errors.idexamenmedico = 'Seleccione un examen.';
        }
        // Validar enfermedad.
        if (!values.idenfermedad) {
            errors.idenfermedad = 'Selecciona una enfermedad.';
        }
        return errors;
    };
    // Función para manejar el cambio en el input de búsqueda
    const manejarCambioBusqueda = (e) => {
        setTerminoBusqueda(e.target.value);
    };

    const registrosClinicosFiltrados = clinicalRecords.filter(registro => {
        // Filtro general para registros clínicos
        const filtroGeneral = ( 
            registro.id.toString().includes(terminoBusqueda) ||
            (typeof registro.heart_rate === 'string' && registro.heart_rate.toLowerCase().includes(terminoBusqueda.toLowerCase())) ||
            (typeof registro.temperature === 'string' && registro.temperature.toLowerCase().includes(terminoBusqueda.toLowerCase())) ||
            (typeof registro.clinical_Record_Data === 'string' && registro.clinical_Record_Data.toLowerCase().includes(terminoBusqueda.toLowerCase())) ||
            (typeof registro.observations === 'string' && registro.observations.toLowerCase().includes(terminoBusqueda.toLowerCase())) ||
            (typeof registro.idingreso?.date === 'string' && registro.idingreso?.date.toLowerCase().includes(terminoBusqueda.toLowerCase())) ||
            (typeof registro.idempleado?.name === 'string' && registro.idempleado?.name.toLowerCase().includes(terminoBusqueda.toLowerCase())) ||
            (typeof registro.idexamenmedico?.exam === 'string' && registro.idexamenmedico?.exam.toLowerCase().includes(terminoBusqueda.toLowerCase())) ||
            registro.idmascota?.idcliente?.dni.toString().includes(terminoBusqueda.toLowerCase()) ||
            (typeof registro.idmascota?.name === 'string' && registro.idmascota?.name.toLowerCase().includes(terminoBusqueda.toLowerCase())) ||
            (typeof registro.idenfermedad?.name === 'string' && registro.idenfermedad?.name.toLowerCase().includes(terminoBusqueda.toLowerCase()))
        );
    
        if (!selectedIngresoId || !Ingresos) {
            // No se ha seleccionado ningún ingreso o Ingresos es null, devolver el filtro general
            return filtroGeneral;
        }
    
        // Filtro específico por ingreso
        const filtroPorIngreso = (
            registro.idmascota?.id === Ingresos.idcita?.idmascota?.id &&
            (
                registro.id.toString().includes(terminoBusqueda) ||
                registro.hour.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                registro.date.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                registro.idcita?.idmascota?.idcliente?.dni?.toString().includes(terminoBusqueda.toLowerCase()) ||
                registro.idcita?.idmascota?.idcliente?.name?.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                registro.idcita?.idmascota?.name?.toLowerCase().includes(terminoBusqueda.toLowerCase())
            )
        );
    
        // Devolver el resultado basado en si se ha seleccionado un ingreso o no
        return filtroPorIngreso;
    });    

    const [dni, setDni] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const inpuc = (event) => {
        setDni(event.target.value);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSeleccionarRegistroClinic = async (id) => {
        setSelectedRegistroClinicoId(id);
        navigate('/Fomula_Medica');
    };

    return (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }} >
        <MenuVeterinario/>
        <div style={{ display: 'flex', flexGrow: 1 }}>
        <div>
            <Navbar/>
        </div>
        {/*Tabla donde se muestra todo*/}
        <div className={StylesTabla.containerTable}>
            <div className={StylesTabla.TableHeader}>
                <section className="table__header">
                    <h1 className={StylesTabla.NombreTable}>Registro Clínico</h1>
                    <div>
                        <button className={StylesTabla.buttonHeader} onClick={handleMostrarModal} style={{ marginRight: '10px' }}>Crear Registro</button>
                        <button className={StylesTabla.buttonHeader} onClick={openModal} >Reporte</button>
                        <ReporteExcel dni={dni} modalIsOpen={modalIsOpen} closeModal={closeModal} />
                    </div>
                    <br/>
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
                            <th style={{ textAlign: "center" }}>ID</th>
                            <th style={{ textAlign: "center" }}>F/C</th>
                            <th style={{ textAlign: "center" }}>T</th>
                            <th style={{ textAlign: "center" }}>Fecha Registro Clínico</th>
                            <th style={{ textAlign: "center" }}>Observaciones</th>                          
                            <th style={{ textAlign: "center" }}>Fecha Ingreso</th>
                            <th style={{ textAlign: "center" }}>Creado por</th>
                            <th style={{ textAlign: "center" }}>Examen</th>
                            <th style={{ textAlign: "center" }}>CC Propietario</th>
                            <th style={{ textAlign: "center" }}>Mascotas</th>
                            <th style={{ textAlign: "center" }}>Enfermedad</th>
                            <th style={{ textAlign: "center" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrosClinicosFiltrados.map(record => (
                                <tr key={record.id}>
                                <td style={{ textAlign: "center" }}>{record.id}</td>
                                <td style={{ textAlign: "center" }}>{record.heart_rate}</td>
                                <td style={{ textAlign: "center" }}>{record.temperature}</td>
                                <td style={{ textAlign: "center" }}>{record.clinical_Record_Data}</td>
                                <td style={{ textAlign: "center" }}>{record.observations}</td>
                                <td style={{ textAlign: "center" }}>{record.idingreso.date}</td>
                                <td style={{ textAlign: "center" }}>{record.idempleado.name}</td>
                                <td style={{ textAlign: "center" }}>{record.idexamenmedico.exam}</td>
                                <td style={{ textAlign: "center" }}>{record.idmascota.idcliente.dni}</td>
                                <td style={{ textAlign: "center" }}>{record.idmascota.name}</td>
                                <td style={{ textAlign: "center" }}>{record.idenfermedad.name}</td>
                                <td style={{ textAlign: "center" }}>
                                    <button type="button" className="btn btn-primary btn-sm" style={{ height: '3rem', width: '3rem', background: 'transparent', boxShadow: 'none', borderColor: 'transparent' }} onClick={() => handleSeleccionarRegistroClinic(record.id)} >
                                        <i className="bi bi-journal-bookmark-fill" style={{ fontSize: '2rem', textAlign: "center", cursor: 'pointer' }}></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        <Formik
            initialValues={{
                heart_rate: '',
                temperature: '',
                observations: '',
                idenfermedad: '',
            }}
            validate={validateForm}
            onSubmit={GuardarRegistroClinico}
        >
            {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
    <Modal show={showModalGuardar} onHide={handleCerrarModalGuardar}>
        <Modal.Header closeButton>
            <Modal.Title>Generar Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicHeartRate">
                    <Form.Label>Frecuencia Cardíaca</Form.Label>
                    <Form.Control
                        type="number"
                        min="1"
                        name="heart_rate"
                        value={values.heart_rate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.heart_rate && !!errors.heart_rate}
                    />
                    <Form.Control.Feedback type="invalid">{errors.heart_rate}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicTemperature">
                    <Form.Label>Temperatura</Form.Label>
                    <Form.Control
                        type="number"
                        min="1"
                        name="temperature"
                        value={values.temperature}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.temperature && !!errors.temperature}
                    />
                    <Form.Control.Feedback type="invalid">{errors.temperature}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicObservations">
                    <Form.Label>Observaciones</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="observations"
                        value={values.observations}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.observations && !!errors.observations}
                    />
                    <Form.Control.Feedback type="invalid">{errors.observations}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicExamen">
                    <Form.Label>Examen</Form.Label>
                    <Form.Control
                        as="select"
                        name="idexamenmedico"
                        value={values.idexamenmedico}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.idexamenmedico && !!errors.idexamenmedico}
                    >
                        <option value="">Selecciona un examen</option>
                        {Examenes.map(examenes => (
                            <option key={examenes.id} value={examenes.id}>{examenes.exam}</option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.idexamenmedico}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicMacota">
                    <Form.Label>Enfermedades</Form.Label>
                    <Form.Control
                        as="select"
                        name="idenfermedad"
                        value={values.idenfermedad}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.idenfermedad && !!errors.idenfermedad}
                    >
                        <option value="">Selecciona una enfermedad</option>
                        {Enfermedades.map(enfermedad => (
                            <option key={enfermedad.id} value={enfermedad.id}>{enfermedad.name}</option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.idenfermedad}</Form.Control.Feedback>
                </Form.Group>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCerrarModalGuardar}>Cancelar</Button>
                    <Button variant="primary" type="submit" style={{ background: '#56208c', borderColor: 'transparent' }}>Guardar Cambios</Button>
                </Modal.Footer>
            </Form>
        </Modal.Body>
    </Modal>
)}
            </Formik>
        </div>
        </div>
        </div>
        </>
    );
}

export default CrudRegistroClinico;