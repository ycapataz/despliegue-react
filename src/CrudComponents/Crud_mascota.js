import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; //Se importan sweetalert para manejar alertas.
import CustomerService from '../services/CustomerService';
import BreedService from '../services/BreedService';
import GenusService from '../services/GenusService';
import SpecieService from '../services/SpecieService';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Form, Button} from 'react-bootstrap';
import Navbar from "../components/Navbar";
import StylesTabla from '../assets/css/avg_encabezado.module.scss';
import PetService from '../services/PetService';
import Menu_recepcionista from '../components/Menu_recepcionista';
import { Formik, Field, ErorMessage } from 'formik';
import ReporteExcel from '../components/ReporteExcel';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

function Crud_mascota(){
    //const { user } = useContext(UserContext);
    //const IdUsuario = user.id;
    const [pets, setPets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalGuardar, setshowModalGuardar] = useState(false);
    const [Razas, setRazas] = useState([]);
    const [razaselect, setRazaselect] = useState([]);
    const [Especies, setEspecies] = useState([]);
    const [Generos, setGeneros] = useState([]);
    const [Clientes, setClientes] = useState([]);
    const navigate = useNavigate();
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const handleChangeBusqueda = (event) => {
        setTerminoBusqueda(event.target.value);
    };
    const handleMostrarModal = () => {
        setshowModalGuardar(true);
    };
    const [CrearMascota, setCrearMascota] = useState({
        id: '',
        name: '',
        color: '',
        dateBirth: '',
        number_microchip: '',
        idcliente: '',
        idraza: '',
        idespecie: '',
        idgenmascota: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCrearMascota({ ...CrearMascota, [name]: value });
    };
    const handleCerrarModalGuardar = () => {
        setshowModalGuardar(false);
        Swal.fire({
            icon: 'info',
            title: 'Cancelado',
            text: 'Mascota cancelada.'
        });
    };

    const [editedPet, setEditedPet] = useState({
        id: '',
        name: '',
        color: '',
        dateBirth: '',
        number_microchip: '',
        idcliente: { name: '' },
        idraza: { name: '' },
        idespecie: { name: '' },
        idgenmascota: { name: '' },
    });

    const [datosFormularioEdicion, setDatosFormularioEdicion] = useState({
        id: '',
        name: '',
        color: '',
        dateBirth: '',
        number_microchip: '',
        idcliente: '',
        idraza: '',
        idespecie: '',
        idgenmascota: ''
    });

    const fetchPets = async () => {
        try{
            const response = await PetService.getAllPets();
            setPets(response.data.data.reverse());
        } catch (error) {
            console.error('Error al obtener las mascotas:', error);
        }
    };

    const fetchRazas = async () => {
        try{
            const response = await BreedService.getAllBreeds();
            setRazas(response.data);
        } catch (error) {
            console.error('Error al obtener las razas:', error);
        }
    };
    const Razaselect = async () => {
        try{
            const response = await BreedService.getAllBreeds();
            setRazaselect(response.data);
        } catch (error) {
            console.error('Error al obtener las razas:', error);
        }
    };

    const fetchClientes = async () => {
        try{
            const response = await CustomerService.getAllCustomers();
            setClientes(response.data.DATA);
        } catch (error) {
            console.error('Error al obtener los clientes:', error);
        }
    };

    const fetchEspecies = async () => {
        try{
            const response = await SpecieService.getAllSpecies();
            setEspecies(response.data.DATA);
        } catch (error) {
            console.error('Error al obtener las especies:', error);
        }
    };

    const fetchGeneros = async () => {
        try{
            const response = await GenusService.getAllGenus();
            setGeneros(response.data.DATA);
        } catch (error) {
            console.error('Error al obtener los generos:', error);
        }
    };

    useEffect(() => {
        fetchPets();
        fetchRazas();
        fetchClientes();
        fetchEspecies();
        fetchGeneros();
        Razaselect();
    }, []);

    const handleEditPet = (pet) => {
        setEditedPet(pet);
        setDatosFormularioEdicion({
            name: '',
            color: '',
            dateBirth: '',
            number_microchip: '',
            idcliente: pet.idcliente.name,
            idraza: editedPet.idraza,
            idespecie: editedPet.idespecie,
            idgenmascota: editedPet.idgenmascota
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
            await PetService.updatePet(editedPet.id, {
                name: values.name,
                color: values.color,
                dateBirth: values.dateBirth,
                number_microchip: values.number_microchip,
                idcliente: { id: values.idcliente },
                idraza: { id: values.idraza },
                idespecie: { id: values.idespecie },
                idgenmascota: { id: values.idgenmascota },
            });
            setShowModal(false);
            fetchPets();
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Los cambios se guardaron correctamente.',
            });
        } catch (error) {
            console.error('Error al guardar los cambios de la mascota:', error);
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

    const GuardarMascota = async (values) => {
        try {
            const mascota = {
                name: values.name,
                color: values.color,
                dateBirth: values.dateBirth,
                number_microchip: values.number_microchip,
                idcliente: { id: values.idcliente },
                idraza: { id: values.idraza },
                idespecie: { id: values.idespecie },
                idgenmascota: { id: values.idgenmascota },
            };
            await PetService.createPet(mascota);
            setshowModalGuardar(false);
            fetchPets();

            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'La mascota se ha guardado correctamente.',
            });
        } catch (error) {
            console.error('Error al guardar la mascota:', error);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: error.message || 'Hubo un error al guardar la mascota.',
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
    
        // Validar color.
        if (!values.color) {
            errors.color = 'El color es requerido.';
        } else if (!/^[a-zA-Z\s]*$/.test(values.color)) {
            errors.color = "Por favor ingrese un color valido"
        }
    
        // Validar fecha de nacimiento.
    if (!values.dateBirth) {
        errors.dateBirth = 'La fecha de nacimiento es requerida.';
    } else {
        const regexDate = /^\d{4}-\d{2}-\d{2}$/;
        if (!regexDate.test(values.dateBirth)) {
            errors.dateBirth = 'Formato de fecha inválido (YYYY-MM-DD).';
        } else {
            const selectedDate = new Date(values.dateBirth);
            const currentDate = new Date();
            const maxPastDate = new Date();
            maxPastDate.setFullYear(maxPastDate.getFullYear() - 16);

            // Compara la fecha de nacimiento seleccionada con la fecha actual y el límite de 16 años atrás.
            if (selectedDate >= currentDate) {
                errors.dateBirth = 'La fecha de nacimiento debe ser anterior a la fecha actual.';
            }else if (selectedDate <= maxPastDate) {
                errors.dateBirth = 'La mascota no puede tener más de 16 años de edad.';
            }
        }
    }
    
        // Validar nombre del cliente.
        if (!values.idcliente) {
            errors.idcliente = 'El nombre del cliente es requerido.';
        }
    
        // Validar nombre de la raza.
        if (!values.idraza) {
            errors.idraza = 'El nombre de la raza es requerido.';
        }
    
        // Validar nombre de la especie.
        if (!values.idespecie) {
            errors.idespecie = 'El nombre de la especie es requerido.';
        }
    
        // Validar nombre del género de la mascota.
        if (!values.idgenmascota) {
            errors.idgenmascota = 'El nombre del género de la mascota es requerido.';
        }
    
        return errors;
    };
    
    // Función para manejar el cambio en el input de búsqueda
    const manejarCambioBusqueda = (e) => {
        setTerminoBusqueda(e.target.value);
    };
    
const mascotasFiltradas = pets.filter(mascota => {
        return (
            mascota.id.toString().includes(terminoBusqueda) || // Filtrar por ID
            (typeof mascota.name === 'string' && mascota.name.toLowerCase().includes(terminoBusqueda.toLowerCase())) || // Filtrar por nombre
            (typeof mascota.color === 'string' && mascota.color.toLowerCase().includes(terminoBusqueda.toLowerCase())) || // Filtrar por color
            (typeof mascota.dateBirth === 'string' && mascota.dateBirth.toLowerCase().includes(terminoBusqueda.toLowerCase())) || // Filtrar por fecha de nacimiento
            (typeof mascota.number_microchip === 'string' && mascota.number_microchip.toLowerCase().includes(terminoBusqueda.toLowerCase())) || // Filtrar por número de microchip
            (typeof mascota.idcliente?.name === 'string' && mascota.idcliente?.name.toLowerCase().includes(terminoBusqueda.toLowerCase())) || // Filtrar por nombre del cliente
            (typeof mascota.idraza?.name === 'string' && mascota.idraza?.name.toLowerCase().includes(terminoBusqueda.toLowerCase())) || // Filtrar por nombre de la raza
            (typeof mascota.idespecie?.name === 'string' && mascota.idespecie?.name.toLowerCase().includes(terminoBusqueda.toLowerCase())) || // Filtrar por nombre de la especie
            (typeof mascota.idgenmascota?.name === 'string' && mascota.idgenmascota?.name.toLowerCase().includes(terminoBusqueda.toLowerCase())) // Filtrar por nombre del género de la mascota
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
                    <h1 className={StylesTabla.NombreTable}>Mascota</h1>
                    <div>
                        <button className={StylesTabla.buttonHeader} onClick={handleMostrarModal} style={{ marginRight: '10px' }}>Crear Mascota</button>
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
                            <th style={{ textAlign: "center" }}>Mascota</th>
                            <th style={{ textAlign: "center" }}>Color</th>
                            <th style={{ textAlign: "center" }}>Fecha Nacimiento</th>
                            <th style={{ textAlign: "center" }}># Microchip</th>                          
                            <th style={{ textAlign: "center" }}>Cliente</th>
                            <th style={{ textAlign: "center" }}>Raza</th>
                            <th style={{ textAlign: "center" }}>Especie</th>
                            <th style={{ textAlign: "center" }}>Genero</th>
                            <th style={{ textAlign: "center" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mascotasFiltradas.map(pet => (
                                <tr key={pet.id}>
                                <td style={{ textAlign: "center" }}>{pet.id}</td>
                                <td style={{ textAlign: "center" }}>{pet.name}</td>
                                <td style={{ textAlign: "center" }}>{pet.color}</td>
                                <td style={{ textAlign: "center" }}>{pet.dateBirth}</td>
                                <td style={{ textAlign: "center" }}>{pet.number_microchip}</td>
                                <td style={{ textAlign: "center" }}>{pet.idcliente.name}</td>
                                <td style={{ textAlign: "center" }}>{pet.idraza.name}</td>
                                <td style={{ textAlign: "center" }}>{pet.idespecie.name}</td>
                                <td style={{ textAlign: "center" }}>{pet.idgenmascota.name}</td>
                                <td style={{ textAlign: "center" }}>
                                    <button type="button" className="btn btn-primary btn-sm" style={{ height: '3rem', width: '3rem', background: 'transparent', boxShadow: 'none', borderColor: 'transparent' }} onClick={() => handleEditPet(pet)} >
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
                name: editedPet.name || '',
                color: editedPet.color || '',
                dateBirth: editedPet.dateBirth || '',
                number_microchip: editedPet.number_microchip || '',
                idcliente: editedPet.idcliente?.id || '',
                idraza: editedPet.idraza?.id || '',
                idespecie: editedPet.idespecie?.id || '',
                idgenmascota: editedPet.idgenmascota?.id || '',
            }}
            validate={validateForm}
            onSubmit={Editar}
            enableReinitialize
        >
            {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
                <Modal show={showModal} onHide={setShowModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Mascota</Modal.Title>
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
        <Form.Group controlId="formBasicColor">
            <Form.Label>Color</Form.Label>
            <Form.Control
                type="text"
                name="color"
                value={values.color}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.color && !!errors.color}
                readOnly={true}
            />
            <Form.Control.Feedback type="invalid">{errors.color}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicDateBirth">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
                type="date"
                name="dateBirth"
                value={values.dateBirth}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.dateBirth && !!errors.dateBirth}
                readOnly={true}
            />
            <Form.Control.Feedback type="invalid">{errors.dateBirth}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicMicrochip">
            <Form.Label>Número de Microchip</Form.Label>
            <Form.Control
                type="text"
                name="number_microchip"
                value={values.number_microchip}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.number_microchip && !!errors.number_microchip}
            />
            <Form.Control.Feedback type="invalid">{errors.number_microchip}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicCliente">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
                as="select"
                name="idcliente"
                value={values.idcliente}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.idcliente && !!errors.idcliente}
                disabled 
            >
            <option value="">Selecciona un cliente</option>
                {Clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>{cliente.name}</option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.idcliente}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicRaza">
            <Form.Label>Raza</Form.Label>
            <Form.Control
                as="select"
                name="idraza"
                value={values.idraza}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.idraza && !!errors.idraza}
                disabled 
            >
            <option value="">Selecciona una raza</option>
                {Razas.map(raza => (
                    <option key={raza.id} value={raza.id}>{raza.name}</option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.idraza}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicEspecie">
            <Form.Label>Especie</Form.Label>
            <Form.Control
                as="select"
                name="idespecie"
                value={values.idespecie}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.idespecie && !!errors.idespecie}
                disabled 
            >
            <option value="">Selecciona una especie</option>
                {Especies.map(especie => (
                    <option key={especie.id} value={especie.id}>{especie.name}</option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.idespecie}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicGenMascota">
            <Form.Label>Género de Mascota</Form.Label>
            <Form.Control
                as="select"
                name="idgenmascota"
                value={values.idgenmascota}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.idgenmascota && !!errors.idgenmascota}
            >
            <option value="">Selecciona un genero</option>
                {Generos.map(genero => (
                    <option key={genero.id} value={genero.id}>{genero.name}</option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.idgenmascota}</Form.Control.Feedback>
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
                color: '',
                dateBirth: '',
                number_microchip: '',
                idcliente: '',
                idraza: '',
                idespecie: '',
                idgenmascota: '',
            }}
            validate={validateForm}
            onSubmit={GuardarMascota}
        >
            {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
    <Modal show={showModalGuardar} onHide={handleCerrarModalGuardar}>
        <Modal.Header closeButton>
            <Modal.Title>Crear Mascota</Modal.Title>
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
        <Form.Group controlId="formBasicColor">
            <Form.Label>Color</Form.Label>
            <Form.Control
                type="text"
                name="color"
                value={values.color}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.color && !!errors.color}
            />
            <Form.Control.Feedback type="invalid">{errors.color}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicDateBirth">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
                type="date"
                name="dateBirth"
                value={values.dateBirth}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.dateBirth && !!errors.dateBirth}
            />
            <Form.Control.Feedback type="invalid">{errors.dateBirth}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicMicrochip">
            <Form.Label>Número de Microchip</Form.Label>
            <Form.Control
                type="text"
                name="number_microchip"
                value={values.number_microchip}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.number_microchip && !!errors.number_microchip}
            />
            <Form.Control.Feedback type="invalid">{errors.number_microchip}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicCliente">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
                as="select"
                name="idcliente"
                value={values.idcliente}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.idcliente && !!errors.idcliente}
            >
            <option value="">Selecciona un cliente</option>
                {Clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>{cliente.name}</option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.idcliente}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicRaza">
            <Form.Label>Raza</Form.Label>
            <Form.Control
                as="select"
                name="idraza"
                value={values.idraza}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.idraza && !!errors.idraza}
            >
            <option value="">Selecciona una raza</option>
                {razaselect.map(raza => (
                    <option key={raza.id} value={raza.id}>{raza.name}</option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.idraza}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicEspecie">
            <Form.Label>Especie</Form.Label>
            <Form.Control
                as="select"
                name="idespecie"
                value={values.idespecie}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.idespecie && !!errors.idespecie}
            >
            <option value="">Selecciona una especie</option>
                {Especies.map(especie => (
                    <option key={especie.id} value={especie.id}>{especie.name}</option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.idespecie}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicGenMascota">
            <Form.Label>Género de Mascota</Form.Label>
            <Form.Control
                as="select"
                name="idgenmascota"
                value={values.idgenmascota}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.idgenmascota && !!errors.idgenmascota}
            >
            <option value="">Selecciona un genero</option>
                {Generos.map(genero => (
                    <option key={genero.id} value={genero.id}>{genero.name}</option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.idgenmascota}</Form.Control.Feedback>
        </Form.Group>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCerrarModalGuardar}>Cancelar</Button>
                    <Button variant="primary" type="submit" style={{ background: '#56208c', borderColor: 'transparent' }}>Guardar Mascota</Button>
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

export default Crud_mascota;