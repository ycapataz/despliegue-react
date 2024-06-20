import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; //Se importan sweetalert para manejar alertas.
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Form, Button} from 'react-bootstrap';
import Navbar from "../components/Navbar";
import StylesTabla from '../assets/css/avg_encabezado.module.scss';
import EmployeeService from '../services/EmployeeService';
import SpecialtyService from '../services/SpecialtyService';
import PostService from '../services/PostService';
import EpsService from '../services/EpsService';
import Menu_recepcionista from '../components/Menu_recepcionista';
import { Formik, Field, ErorMessage } from 'formik';
import ReporteExcel from '../components/ReporteExcel';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

function Crud_empleado(){
    //const { user } = useContext(UserContext);
    //const IdUsuario = user.id;
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalGuardar, setshowModalGuardar] = useState(false);
    const [Cargos, setCargos] = useState([]);
    const [Epss, setEpss] = useState([]);
    const [Especialidades, setEspecialidades] = useState([]);
    const navigate = useNavigate();
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const handleChangeBusqueda = (event) => {
        setTerminoBusqueda(event.target.value);
    };
    const handleMostrarModal = () => {
        setshowModalGuardar(true);
    };
    const [CrearEmpleado, setCrearEmpleado] = useState({
        id: '',
        name: '',
        lastName: '',
        age: '',
        mail: '',
        password: '',
        address: '',
        phone: '',
        birthdayDate: '',
        dni: '',
        ideps: '',
        idcargo: '',
        idespecialidad: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCrearEmpleado({ ...CrearEmpleado, [name]: value });
    };
    const handleCerrarModalGuardar = () => {
        setshowModalGuardar(false);
        Swal.fire({
            icon: 'info',
            title: 'Cancelado',
            text: 'Empleado cancelado.'
        });
    };

    const [editedEmployee, setEditedEmployee] = useState({
        id: '',
        name: '',
        lastName: '',
        age: '',
        mail: '',
        password: '',
        address: '',
        phone: '',
        birthdayDate: '',
        dni: '',
        ideps: { name: '' },
        idcargo: { name: '' },
        idespecialidad: { name: '' },
    });

    const [datosFormularioEdicion, setDatosFormularioEdicion] = useState({
        id: '',
        name: '',
        lastName: '',
        age: '',
        mail: '',
        password: '',
        address: '',
        phone: '',
        birthdayDate: '',
        dni: '',
        ideps: '',
        idcargo: '',
        idespecialidad: '',
    });

    const fetchEmployees = async () => {
        try{
            const response = await EmployeeService.getAllEmployees();
            setEmployees(response.data);
        } catch (error) {
            console.error('Error al obtener los empleados:', error);
        }
    };

    const fetchEspecialidades = async () => {
        try{
            const response = await SpecialtyService.getAllSpecialtys();
            setEspecialidades(response.data.DATA);
        } catch (error) {
            console.error('Error al obtener las especialidades:', error);
        }
    };

    const fetchEpss = async () => {
        try{
            const response = await EpsService.getAllEps();
            console.log("Array eps:", response);
            setEpss(response.data.data);
        } catch (error) {
            console.error('Error al obtener las eps:', error);
        }
    };

    const fetchCargos = async () => {
        try{
            const response = await PostService.getAllPosts();
            setCargos(response.data.DATA);
        } catch (error) {
            console.error('Error al obtener los cargos:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
        fetchEspecialidades();
        fetchEpss();
        fetchCargos();
    }, []);

    const handleEditEmployee = (employee) => {
        setEditedEmployee(employee);
        setDatosFormularioEdicion({
            id: '',
            name: '',
            lastName: '',
            age: '',
            mail: '',
            password: '',
            address: '',
            phone: '',
            birthdayDate: '',
            dni: '',
            ideps: editedEmployee.ideps,
            idcargo: editedEmployee.idcargo,
            idespecialidad: editedEmployee.idespecialidad,
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
            await EmployeeService.updateEmployee(editedEmployee.id, {
                name: values.name,
                lastName: values.lastName,
                age: values.age,
                mail: values.mail,
                address: values.address,
                phone: values.phone,
                birthdayDate: values.birthdayDate,
                dni: values.dni,
                ideps: { id: values.ideps },
                idcargo: { id: values.idcargo },
                idespecialidad: { id: values.idespecialidad },
            });
            setShowModal(false);
            fetchEmployees();
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Los cambios se guardaron correctamente.',
            });
        } catch (error) {
            console.error('Error al guardar los cambios del empleado:', error);
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

    const fechaActual = obtenerFechaActual();

    const GuardarEmpleado = async (values) => {
        try {
            const empleado = {
                name: values.name,
                lastName: values.lastName,
                age: values.age,
                mail: values.mail,
                password: values.password,
                address: values.address,
                phone: values.phone,
                birthdayDate: values.birthdayDate,
                dni: values.dni,
                ideps: { id: values.ideps },
                idcargo: { id: values.idcargo },
                idespecialidad: { id: values.idespecialidad },
            };
            await EmployeeService.createEmployee(empleado);
            setshowModalGuardar(false);
            fetchEmployees();

            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'El empleado se ha guardado correctamente.',
            });
        } catch (error) {
            console.error('Error al guardar el empleado:', error);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: error.message || 'Hubo un error al guardar el empleado.',
            });
        }
    };
    const validateForm = (values) => {
        const errors = {};
    
        // Validar nombre.
        if (!values.name) {
            errors.name = 'El nombre es requerido.';
        } else if (!/^[a-zA-ZñÑáÁéÉíÍóÓúÚ]+(?:\s[a-zA-ZñÑáÁéÉíÍóÓúÚ]+){0,2}$/.test(values.name)) {
            errors.name = "Por favor ingrese un nombre valido"
        }

        if (!values.lastName) {
            errors.lastName = 'El apellido es requerido.';
        } else if (!/^[a-zA-ZñÑáÁéÉíÍóÓúÚ]+(?:\s[a-zA-ZñÑáÁéÉíÍóÓúÚ]+){0,2}$/.test(values.lastName)) {
            errors.name = "Por favor ingrese un apellido valido"
        }

        if (!values.age) {
            errors.age = 'La edad es requerida.';
        } else if (!/^\d+$/.test(values.age)) {
            errors.age = "Por favor ingrese una edad válida";
        } else if (parseInt(values.age, 10) <= 0 || parseInt(values.age, 10) > 120) {
            errors.age = "Por favor ingrese una edad entre 1 y 120";
        }
        
        if (!values.mail) {
            errors.mail = 'El correo electrónico es requerido.';
        } else if (!/^[a-zA-Z0-9._-]+@(gmail|hotmail|outlook|misena|soy.sena)+\.(co|com|edu.co|edu.com)$/.test(values.mail)) {
            errors.mail = "Por favor ingrese un correo electrónico válido";
        }

        if (!values.address) {
            errors.address = 'La direccion es requerida.';
        }
        
        if (!values.password) {
            errors.password = 'Por favor ingresar un password.';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&+])([A-Za-z\d$@$!%*?&+]|[^ ]){8,15}$/.test(values.password)) {
            errors.password = 'Por favor ingresar un password valido.';
        }

        if (!values.phone) {    
            errors.phone = 'El número de teléfono es requerido.';
        } else if (!/^\+?\d{7,10}$/.test(values.phone)) {
            errors.phone = "Por favor ingrese un número de teléfono válido";
        }
        
        // Validar fecha de nacimiento.
        if (!values.birthdayDate) {
            errors.birthdayDate = 'La fecha de nacimiento es requerida.';
        }

        if (!values.dni) {
            errors.dni = 'El número de cedula es requerido.';
        } else if (!/^\+?\d{7,10}$/.test(values.dni)) {
            errors.dni = "Por favor ingrese un número de cedula válido";
        }

        if (!values.ideps) {
            errors.ideps = 'El nombre de la eps es requerido.';
        }

        if (!values.idcargo) {
            errors.idcargo = 'El nombre del cargo es requerido.';
        }

        if (!values.idespecialidad) {
            errors.idespecialidad = 'El nombre de la especialidad es requerido.';
        }
    
        return errors;
    };
    
    // Función para manejar el cambio en el input de búsqueda
    const manejarCambioBusqueda = (e) => {
        setTerminoBusqueda(e.target.value);
    };
    
    const empleadosFiltrados = employees.filter(empleado => {
        return (
            empleado.id.toString().includes(terminoBusqueda) || // Filtrar por ID
            (typeof empleado.name === 'string' && empleado.name.toLowerCase().includes(terminoBusqueda.toLowerCase())) || 
            (typeof empleado.lastName === 'string' && empleado.lastName.toLowerCase().includes(terminoBusqueda.toLowerCase())) || 
            (typeof empleado.age === 'string' && empleado.age.toLowerCase().includes(terminoBusqueda.toLowerCase())) || 
            (typeof empleado.mail === 'string' && empleado.mail.toLowerCase().includes(terminoBusqueda.toLowerCase())) || 
            (typeof empleado.address === 'string' && empleado.address.toLowerCase().includes(terminoBusqueda.toLowerCase())) || 
            (typeof empleado.phone === 'string' && empleado.phone.toLowerCase().includes(terminoBusqueda.toLowerCase())) || 
            (typeof empleado.birthdayDate === 'string' && empleado.birthdayDate.toLowerCase().includes(terminoBusqueda.toLowerCase())) || 
            (typeof empleado.dni === 'string' && empleado.dni.toLowerCase().includes(terminoBusqueda.toLowerCase())) || 
            (typeof empleado.ideps?.name === 'string' && empleado.ideps.name.toLowerCase().includes(terminoBusqueda.toLowerCase())) || 
            (typeof empleado.idcargo?.name === 'string' && empleado.idcargo.name.toLowerCase().includes(terminoBusqueda.toLowerCase())) || 
            (typeof empleado.idespecialidad?.name === 'string' && empleado.idespecialidad.name.toLowerCase().includes(terminoBusqueda.toLowerCase()))
        );
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
                    <h1 className={StylesTabla.NombreTable}>Empleado</h1>
                    <div>
                        <button className={StylesTabla.buttonHeader} onClick={handleMostrarModal} style={{ marginRight: '10px' }}>Crear Empleado</button>
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
                            <th style={{ textAlign: "center" }}>Nombre</th>
                            <th style={{ textAlign: "center" }}>Apellido</th>
                            <th style={{ textAlign: "center" }}>Edad</th>
                            <th style={{ textAlign: "center" }}>Correo</th>
                            <th style={{ textAlign: "center" }}>Dirección</th>                       
                            <th style={{ textAlign: "center" }}>Teléfono</th>
                            <th style={{ textAlign: "center" }}>Fecha Nacimiento</th>
                            <th style={{ textAlign: "center" }}>N° Cedula</th>
                            <th style={{ textAlign: "center" }}>Eps</th>
                            <th style={{ textAlign: "center" }}>Cargo</th>
                            <th style={{ textAlign: "center" }}>Especialidad</th>
                            <th style={{ textAlign: "center" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleadosFiltrados.map(employee => (
                                <tr key={employee.id}>
                                <td style={{ textAlign: "center" }}>{employee.id}</td>
                                <td style={{ textAlign: "center" }}>{employee.name}</td>
                                <td style={{ textAlign: "center" }}>{employee.lastName}</td>
                                <td style={{ textAlign: "center" }}>{employee.age}</td>
                                <td style={{ textAlign: "center", textTransform: "initial" }}>{employee.mail}</td>
                                <td style={{ textAlign: "center" }}>{employee.address}</td>
                                <td style={{ textAlign: "center" }}>{employee.phone}</td>
                                <td style={{ textAlign: "center" }}>{employee.birthdayDate}</td>
                                <td style={{ textAlign: "center" }}>{employee.dni}</td>
                                <td style={{ textAlign: "center" }}>{employee.ideps.name}</td>
                                <td style={{ textAlign: "center" }}>{employee.idcargo.name}</td>
                                <td style={{ textAlign: "center" }}>{employee.idespecialidad.name}</td>
                                <td style={{ textAlign: "center" }}>
                                    <button type="button" className="btn btn-primary btn-sm" style={{ height: '3rem', width: '3rem', background: 'transparent', boxShadow: 'none', borderColor: 'transparent' }} onClick={() => handleEditEmployee(employee)} >
                                        <i className="bi bi-pencil-square" style={{ fontSize: '2rem', textAlign: "center", cursor: 'pointer' }}></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/*Modal o ventana emergente para EDITAR */}
            <Formik
            initialValues={{
                name: editedEmployee.name || '',
                lastName: editedEmployee.lastName || '',
                age: editedEmployee.age || '',
                mail: editedEmployee.mail || '',
                address: editedEmployee.address || '',
                phone: editedEmployee.phone || '',
                birthdayDate: editedEmployee.birthdayDate || '',
                dni: editedEmployee.dni || '',
                ideps: editedEmployee.ideps?.id || '',
                idcargo: editedEmployee.idcargo?.id || '',
                idespecialidad: editedEmployee.idespecialidad?.id || '',
            }}
            validate={validateForm}
            onSubmit={Editar}
            enableReinitialize
        >
            {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
                <Modal show={showModal} onHide={setShowModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Empleado</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.name && !!errors.name}
                readOnly={true}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicName">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.lastName && !!errors.lastName}
                readOnly={true}
            />
            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicColor">
            <Form.Label>Edad</Form.Label>
            <Form.Control
                type="int"
                name="age"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.age && !!errors.age}
                readOnly={true}
            />
            <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicColor">
            <Form.Label>Correo</Form.Label>
            <Form.Control
                type="text"
                name="mail"
                value={values.mail}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.mail && !!errors.mail}
            />
            <Form.Control.Feedback type="invalid">{errors.mail}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicColor">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
                type="text"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.address && !!errors.address}
            />
            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicColor">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
                type="number"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.phone && !!errors.phone}
            />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicDateBirth">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
                type="date"
                name="birthdayDate"
                value={values.birthdayDate}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.birthdayDate && !!errors.birthdayDate}
                readOnly={true}
            />
            <Form.Control.Feedback type="invalid">{errors.birthdayDate}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicMicrochip">
            <Form.Label>N° cedula</Form.Label>
            <Form.Control
                type="text"
                name="dni"
                value={values.dni}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.dni && !!errors.dni}
                readOnly={true}
            />
            <Form.Control.Feedback type="invalid">{errors.dni}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicCliente">
            <Form.Label>Eps</Form.Label>
            <Form.Control
                as="select"
                name="ideps"
                value={values.ideps}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.ideps && !!errors.ideps}
            >
            <option value="">Selecciona una eps</option>
                {Epss.map(eps => (
                    <option key={eps.id} value={eps.id}>{eps.name}</option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.ideps}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicCargo">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
                as="select"
                name="idcargo"
                value={values.idcargo}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.idcargo && !!errors.idcargo}
                disabled
            >
            <option value="">Selecciona un cargo</option>
                {Cargos.map(cargo => (
                    <option key={cargo.id} value={cargo.id}>{cargo.name}</option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.idcargo}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicEspecie">
            <Form.Label>Especialidad</Form.Label>
            <Form.Control
                as="select"
                name="idespecialidad"
                value={values.idespecialidad}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.idespecialidad && !!errors.idespecialidad}
            >
            <option value="">Selecciona una especialidad</option>
                {Especialidades.map(especialidad => (
                    <option key={especialidad.id} value={especialidad.id}>{especialidad.name}</option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.idespecialidad}</Form.Control.Feedback>
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
        <Formik
            initialValues={{
                name: '',
                lastName: '',
                age: '',
                mail: '',
                password: '',
                address: '',
                phone: '',
                birthdayDate: '',
                dni: '',
                ideps: '',
                idcargo: '',
                idespecialidad: '',
            }}
            validate={validateForm}
            onSubmit={GuardarEmpleado}
        >
            {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
    <Modal show={showModalGuardar} onHide={handleCerrarModalGuardar}>
        <Modal.Header closeButton>
            <Modal.Title>Crear Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.name && !!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicName">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.lastName && !!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicColor">
            <Form.Label>Edad</Form.Label>
            <Form.Control
                type="int"
                name="age"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.age && !!errors.age}
            />
            <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicColor">
            <Form.Label>Correo</Form.Label>
            <Form.Control
                type="text"
                name="mail"
                value={values.mail}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.mail && !!errors.mail}
            />
            <Form.Control.Feedback type="invalid">{errors.mail}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicColor">
            <Form.Label>Direccion</Form.Label>
            <Form.Control
                type="text"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.address && !!errors.address}
            />
            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicName">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicColor">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
                type="number"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.phone && !!errors.phone}
            />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicDateBirth">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
                type="date"
                name="birthdayDate"
                value={values.birthdayDate}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.birthdayDate && !!errors.birthdayDate}
            />
            <Form.Control.Feedback type="invalid">{errors.birthdayDate}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicMicrochip">
            <Form.Label>Cedula</Form.Label>
            <Form.Control
                type="number"
                name="dni"
                value={values.dni}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.dni && !!errors.dni}
            />
            <Form.Control.Feedback type="invalid">{errors.dni}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicCliente">
            <Form.Label>Eps</Form.Label>
            <Form.Control
                as="select"
                name="ideps"
                value={values.ideps}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.ideps && !!errors.ideps}
            >
            <option value="">Selecciona una eps</option>
                {Epss.map(eps => (
                    <option key={eps.id} value={eps.id}>{eps.name}</option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.ideps}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicCargo">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
                as="select"
                name="idcargo"
                value={values.idcargo}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.idcargo && !!errors.idcargo}
            >
            <option value="">Selecciona un cargo</option>
                {Cargos.map(cargo => (
                    <option key={cargo.id} value={cargo.id}>{cargo.name}</option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.idcargo}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicEspecie">
            <Form.Label>Especialidad</Form.Label>
            <Form.Control
                as="select"
                name="idespecialidad"
                value={values.idespecialidad}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.idespecialidad && !!errors.idespecialidad}
            >
            <option value="">Selecciona una especialidad</option>
                {Especialidades.map(especialidad => (
                    <option key={especialidad.id} value={especialidad.id}>{especialidad.name}</option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.idespecialidad}</Form.Control.Feedback>
        </Form.Group>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCerrarModalGuardar}>Cancelar</Button>
                    <Button variant="primary" type="submit" style={{ background: '#56208c', borderColor: 'transparent' }}>Guardar Empleado</Button>
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

export default Crud_empleado;