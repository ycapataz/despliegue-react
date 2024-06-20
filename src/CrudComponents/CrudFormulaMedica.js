import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Form, Button} from 'react-bootstrap';
import Navbar from "../components/Navbar_V";
import StylesTabla from '../assets/css/avg_encabezado.module.scss';
import MedicalFormulaService from '../services/MedicalFormulaService';
import ProductService from '../services/ProductService';
import SelectedRegistroClinicoContext from '../context/SelectedRegistroContext';
import MenuVeterinario from '../components/Menu_veterinario';
import { Formik, Field, ErrorMessage } from 'formik';

function CrudFormulaMedica() {
    const location = useLocation();
    const navigate = useNavigate();
    const { nombre } = location.state || {};
    const [FormulasMedicas, setFormulasMedicas] = useState([]);
    const { selectedRegistroClinicoId, setSelectedRegistroClinicoId } = useContext(SelectedRegistroClinicoContext);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [productos, setProductos] = useState([]);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const handleChangeBusqueda = (event) => {
        setTerminoBusqueda(event.target.value);
    };
    const [CrearRecord, setCrearRecord] = useState({
        dose: '',
        duration: '',
        amount: '',
        observations: '',
        idproducto: ''
    });
    const [editedRecord, setEditedRecord] = useState({
        id: '',
        dose: '',
        duration: '',
        amount: '',
        temperature: '',
        observations: '',
        idproducto: { name: '' }
    });

    const fetchFormulasMedicas = async () => {
        try {
            const response = await MedicalFormulaService.getAllMedicalFormula();
            setFormulasMedicas(response.data.data.reverse());
        } catch (error) {
            console.error('Error al obtener los registros clínicos:', error);
        }
    };
    const fetchProducts = async () => {
        try {
            const response = await ProductService.getAllProducts();
             // Agregar esta línea para verificar los datos recibidos
            setProductos(response.data.DATA);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };


    useEffect(() => {
        fetchFormulasMedicas();
        fetchProducts();
    }, []);

    const handleEditRecord = (record) => {
        setEditedRecord({
            id: record.id,
            dose: record.dose,
            duration: record.duration,
            amount: record.amount,
            observations: record.observations,
            idproducto: editedRecord.idproducto
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

    const handleShowCreateModal = () => {
        setShowCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
        Swal.fire({
            icon: 'info',
            title: 'Cancelado',
            text: 'la formula medica ha sido cancelada.'
        });
    };

    const Crear = async (values, { resetForm }) => {
        try {
            if (!selectedRegistroClinicoId) {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Por favor, selecciona un Registro Clinico para continuar.',
                    confirmButtonText: 'Seleccionar Registro Clinico',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/registroClinico');
                    }
                });
                return;
            }

            await MedicalFormulaService.createMedicalFormula({
                dose: values.dose,
                duration: values.duration,
                amount: values.amount,
                observations: values.observations,
                idproducto: { id: values.idproducto },
                idregistroclinico: { id: selectedRegistroClinicoId }
            });

            // Después de guardar, limpiar el ID de registro clínico seleccionado
            setSelectedRegistroClinicoId(null);

            // Actualizar lista de fórmulas médicas después de la creación
            fetchFormulasMedicas();

            // Vaciar el formulario
            resetForm();

            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'La fórmula médica se creó correctamente.'
            });

        } catch (error) {
            console.error('Error al crear la fórmula médica:', error);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Hubo un error al crear la fórmula médica.'
            });
        }
    };
    
    const Editar = async (values) => {
        try {
            await MedicalFormulaService.updateMedicalFormula(editedRecord.id, {
                dose: values.dose,
                duration: values.duration,
                amount: values.amount,
                observations: values.observations,
                idproducto: { id: values.idproducto },
            });
            setShowModal(false);
            // Actualizar lista de fórmulas médicas después de la edición
            fetchFormulasMedicas();
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Los cambios se guardaron correctamente.'
            });
        } catch (error) {
            console.error('Error al guardar los cambios de la fórmula médica:', error);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Hubo un error al guardar los cambios.'
            });
        }
    };        

    const validateForm = (values) => {
        const errors = {};
        // Validar dosis
        if (!values.dose) {
            errors.dose = 'La dosis es requerida.';
        } else if (!/^[1-9][0-9]*$/.test(values.dose)) {
            errors.dose = 'Por favor ingresar una dosis válida.';
        }
        // Validar duración
        if (!values.duration) {
            errors.duration = 'La duración es requerida.';
        }
        // Validar cantidad
        if (!values.amount) {
            errors.amount = 'La cantidad es requerida.';
        } else if (!/^[1-9][0-9]*$/.test(values.amount)) {
            errors.amount = 'Por favor ingresar una cantidad válida.';
        }
        // Validar observaciones
        if (!values.observations) {
            errors.observations = 'Las observaciones son requeridas.';
        }
        // Validar producto
        if (!values.idproducto) {
            errors.idproducto = 'Seleccione un producto.';
        }
        return errors;
    };
    

    // Función para manejar el cambio en el input de búsqueda
    const manejarCambioBusqueda = (e) => {
        setTerminoBusqueda(e.target.value);
    };
    // Filtrar los registros clínicos según el término de búsqueda
    const FormulaMFiltrada = FormulasMedicas.filter(record => {
        return (
            record.id.toString().includes(terminoBusqueda.toLowerCase())  ||
            (typeof record.dose === 'string' && record.dose.toLowerCase().includes(terminoBusqueda.toLowerCase())) ||
            record.duration.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            record.amount.toString().includes(terminoBusqueda.toLowerCase()) ||
            record.observations.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            record.idregistroclinico?.clinical_Record_Data?.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            record.idproducto?.name?.toLowerCase().includes(terminoBusqueda.toLowerCase())
        );
    });

    return (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }} >
        <MenuVeterinario nombre={nombre} />
        <div style={{ display: 'flex', flexGrow: 1 }}>
        <div>
            <Navbar/>
        </div>
        {/*Tabla donde se muestra todo*/}
        <div className={StylesTabla.containerTable}>
            <div className={StylesTabla.TableHeader}>
                <section className="table__header">
                    <h1 className={StylesTabla.NombreTable}>Formula Medica</h1>
                    <div>
                        <button className={StylesTabla.buttonHeader} onClick={handleShowCreateModal}>Crear Formula</button>
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
                    <thead className={StylesTabla.tablethead} >
                        <tr>
                            <th style={{ textAlign: "center" }}>ID</th>
                            <th style={{ textAlign: "center" }}>Dosis</th>
                            <th style={{ textAlign: "center" }}>Duracion</th>
                            <th style={{ textAlign: "center" }}>Cantidad</th>
                            <th style={{ textAlign: "center" }}>Notas</th>                          
                            <th style={{ textAlign: "center" }}>Registroclinico</th>
                            <th style={{ textAlign: "center" }}>Producto</th>
                            <th style={{ textAlign: "center" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {FormulaMFiltrada.map(record => (
                                <tr key={record.id}>
                                <td style={{ textAlign: "center" }}>{record.id}</td>
                                <td style={{ textAlign: "center" }}>{record.dose}</td>
                                <td style={{ textAlign: "center" }}>{record.duration}</td>
                                <td style={{ textAlign: "center" }}>{record.amount}</td>
                                <td>{record.observations}</td>
                                <td style={{ textAlign: "center" }}>{record.idregistroclinico.clinical_Record_Data}</td>
                                <td style={{ textAlign: "center" }}>{record.idproducto.name}</td>
                                <td style={{ textAlign: "center" }}>
                                    <button type="button" className="btn btn-primary btn-sm" style={{ height: '3rem', width: '3rem', background: 'transparent', boxShadow: 'none', borderColor: 'transparent' }} onClick={() => handleEditRecord(record)} >
                                        <i className="bi bi-pencil-square" style={{ fontSize: '2rem', textAlign: "center", cursor: 'pointer' }}></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Formik
                initialValues={{
                    dose: editedRecord.dose || '',
                    duration: editedRecord.duration || '',
                    amount: editedRecord.amount || '',
                    observations: editedRecord.observations || '',
                    idproducto: editedRecord.idproducto?.id || '', // Asumiendo que idproducto es el campo para el producto
                }}
                validate={validateForm}
                onSubmit={Editar}
                enableReinitialize
            >
            {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Registro Clínico</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicDose">
                        <Form.Label>Dosis</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            name="dose"
                            value={values.dose}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.dose && !!errors.dose}
                        />
                        <Form.Control.Feedback type="invalid">{errors.dose}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicDuration">
                        <Form.Label>Duración</Form.Label>
                        <Form.Control
                            type="text"
                            name="duration"
                            value={values.duration}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.duration && !!errors.duration}
                        />
                        <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicAmount">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            name="amount"
                            value={values.amount}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.amount && !!errors.amount}
                        />
                        <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicObservations">
                        <Form.Label>Notas</Form.Label>
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
                    <Form.Group controlId="formBasicProduct">
                        <Form.Label>Producto</Form.Label>
                        <Form.Control
                            as="select"
                            name="idproducto"
                            value={values.idproducto}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.idproducto && !!errors.idproducto}
                        >
                            <option value="">Selecciona un producto</option>
                            {productos.map(producto => (
                                <option key={producto.id} value={producto.id}>{producto.name}</option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.idproducto}</Form.Control.Feedback>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                        <Button variant="primary" type="submit" style={{ background: '#56208c', borderColor: 'transparent' }}>Guardar Cambios</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
            </Modal>
        )}
        </Formik>

                {/*Modal o ventana emejernte para CREAR */}
                <Formik
                    initialValues={{
                        dose: '',
                        duration: '',
                        amount: '',
                        observations: '',
                        idproducto: '', // Asumiendo que idproducto es el campo para el producto
                    }}
                    validate={validateForm}
                    onSubmit={Crear}
                    enableReinitialize
                >
                {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
            <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nueva Fórmula Médica</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicDose">
                            <Form.Label>Dosis</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                name="dose"
                                value={values.dose}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.dose && !!errors.dose}
                            />
                        <Form.Control.Feedback type="invalid">{errors.dose}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicDuration">
                        <Form.Label>Duración</Form.Label>
                        <Form.Control
                            type="text"
                            name="duration"
                            value={values.duration}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.duration && !!errors.duration}
                        />
                        <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicAmount">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            name="amount"
                            value={values.amount}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.amount && !!errors.amount}
                        />
                        <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicObservations">
                        <Form.Label>Notas</Form.Label>
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
                    <Form.Group controlId="formBasicProduct">
                        <Form.Label>Producto</Form.Label>
                        <Form.Control
                            as="select"
                            name="idproducto"
                            value={values.idproducto}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.idproducto && !!errors.idproducto}
                        >
                            <option value="">Selecciona un producto</option>
                            {productos.map(producto => (
                                <option key={producto.id} value={producto.id}>{producto.name}</option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.idproducto}</Form.Control.Feedback>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCreateModal}>Cancelar</Button>
                        <Button variant="primary" type="submit" style={{ background: '#56208c', borderColor: 'transparent' }}>Crear Fórmula</Button>
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

export default CrudFormulaMedica;
