import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Navbar from "../components/Navbar";
import StylesTabla from '../assets/css/avg_encabezado.module.scss';
import CustomerService from '../services/CustomerService';
import CityService from '../services/CityService';
import Menu_recepcionista from '../components/Menu_recepcionista';
import Swal from 'sweetalert2';

// Esquema de validación con Yup y Regex
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/^[a-zA-ZñÑáÁéÉíÍóÓúÚ]+(?:\s[a-zA-ZñÑáÁéÉíÍóÓúÚ]+){0,2}$/, 'Esto no es un nombre.')
        .min(3, 'Debe tener al menos 3 caracteres')
        .max(15, 'Exceso de caracteres máximo 15.')
        .required('Campo requerido'),
    lastName: Yup.string()
        .matches(/^[a-zA-ZñÑáÁéÉíÍóÓúÚ]+(?:\s[a-zA-ZñÑáÁéÉíÍóÓúÚ]+){0,3}$/, 'Esto no es un apellido.')
        .min(3, 'Debe tener al menos 3 caracteres')
        .max(20, 'Exceso de caracteres máximo 20.')
        .required('Campo requerido'),
    dni: Yup.string()
        .matches(/^((\d{8})|(\d{10})|(\d{11})|(\d{6}))?$/, "Ingresar un N° cedula valida")
        .required('Requerido'),
    phone: Yup.string()
        .matches(/^(310|311|312|313|314|321|320|322|323|315|316|317|318|319|350|351|300|301|302|324|304)[0-9]{7}$/, "Ingresar un teléfono válido.")
        .required('Requerido'),
    mail: Yup.string()
        .email('Correo electrónico inválido')
        .required('Requerido'),
    address: Yup.string()
        .matches(/^[A-Za-z0-9\s\-\#\.]+$/, "Dirección inválida")
        .required('Requerido'),
    city: Yup.string()
        .required('Requerido')
});

function Crud_Clientes() {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);
    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    const [mostrarModalGuardar, setMostrarModalGuardar] = useState(false);
    const [datosFormularioEdicion, setDatosFormularioEdicion] = useState({ id: '', name: '', lastName: '', dni: '', phone: '', mail: '', address: '', city: '' });
    const [clienteSeleccionada, setClienteSeleccionada] = useState(null);
    const [ciudades, setCiudades] = useState([]);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [CitySelect, setCitySelect] = useState([]);

    useEffect(() => {
        fetchData();
        fetchCity();
    }, []);

    const fetchData = async () => {
        try {
            const response = await CustomerService.getAllCustomers();
            setCustomers(response.data.DATA.reverse());
            const ciudades = response.data.DATA.map(cliente => ({ id: cliente.idciudad.id, name: cliente.idciudad.name }));
            const ciudadesUnicas = ciudades.filter((ciudad, index, self) => self.findIndex(m => m.id === ciudad.id) === index);
            setCiudades(ciudadesUnicas);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchCity = async () => {
        try{
            const response = await CityService.getAllCitys();
            setCitySelect(response.data);
        }catch (error) {
            console.log("Error al obtener las ciudades: ", error);
        }
    }

    const abrirModalGuardar = () => {
        setDatosFormularioEdicion({ id: '', name: '', lastName: '', dni: '', phone: '', mail: '', address: '', city: '' });
        setMostrarModalGuardar(true);
    };

    const cerrarModalGuardar = () => {
        setMostrarModalGuardar(false);
    };

    const abrirModalEdicion = (cliente) => {
        setClienteSeleccionada(cliente);
        setDatosFormularioEdicion({
            id: cliente.id,
            name: cliente.name,
            lastName: cliente.lastName,
            dni: cliente.dni,
            phone: cliente.phone,
            mail: cliente.mail,
            address: cliente.address,
            city: cliente.idciudad.name,
        });
        setMostrarModalEdicion(true);
    };

    const cerrarModalEdicion = () => {
        setMostrarModalEdicion(false);
        Swal.fire({
            icon: 'info',
            title: 'Cancelado',
            text: 'Edicion de cliente cancelada.'
        });
    };

    const handleGuardarCliente = async (values, { setSubmitting, resetForm }) => {
        try {
            const idCiudad = values.city
            const dniExists = customers.some(customer => customer.dni === values.dni);
            if (dniExists) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El cliente ya está registrado.'
                });
                setSubmitting(false);
                return;
            }
            await CustomerService.createCustomer({
                name: values.name,
                lastName: values.lastName,
                dni: values.dni,
                phone: values.phone,
                mail: values.mail,
                address: values.address,
                idciudad: {
                    id: idCiudad
                },
            });
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Propietario guardado correctamente.',
            });
            fetchData();
            cerrarModalGuardar();
            resetForm();
        } catch (error) {
            console.error('Error al guardar el Propietario:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleActualizarCliente = async (values, { setSubmitting }) => {
        try {
            const idCiudad = ciudades.find(ciudad => ciudad.name === values.city)?.id;
            await CustomerService.updateCustomer(values.id, {
                name: values.name,
                lastName: values.lastName,
                dni: values.dni,
                phone: values.phone,
                mail: values.mail,
                address: values.address,
                idciudad: {
                    id: idCiudad
                },
            });
            fetchData();
            cerrarModalEdicion();
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Los cambios se guardaron correctamente.',
            });
        } catch (error) {
            console.error('Error al actualizar el Propietario:', error);
        } finally {
            setSubmitting(false);
        }
    };

    // Función para manejar el cambio en el input de búsqueda
    const manejarCambioBusqueda = (e) => {
        setTerminoBusqueda(e.target.value);
    };

    // Filtrar los ingresos según el ID del empleado y el término de búsqueda
    const clintesFiltrados = customers.filter(customer => {
        const termino = terminoBusqueda.toLowerCase();
        return (
            customer.id?.toString().includes(termino) ||
            customer.name?.toLowerCase().includes(termino) ||
            customer.lastName?.toLowerCase().includes(termino) ||
            customer.dni?.toLowerCase().includes(termino) ||
            customer.phone?.toString().toLowerCase().includes(termino) ||
            customer.mail?.toLowerCase().includes(termino) ||
            customer.address?.toLowerCase().includes(termino) ||
            customer.idciudad?.name?.toLowerCase().includes(termino)
        );
    });    

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
                                <h1 className={StylesTabla.NombreTable}>Tabla Propietario</h1>
                                <div>
                                    <button className={StylesTabla.buttonHeader} onClick={abrirModalGuardar}>Crear Propietario</button>
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
                                        <th style={{ textAlign: "center" }}>Nombres</th>
                                        <th style={{ textAlign: "center" }}>Apellidos</th>
                                        <th style={{ textAlign: "center" }}>N° Cedula</th>
                                        <th style={{ textAlign: "center" }}>Teléfono</th>
                                        <th style={{ textAlign: "center" }}>Correo</th>
                                        <th style={{ textAlign: "center" }}>Dirección</th>
                                        <th style={{ textAlign: "center" }}>Ciudad</th>
                                        <th style={{ textAlign: "center" }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clintesFiltrados.map(customer => (
                                        <tr key={customer.id}>
                                            <td style={{ textAlign: "center" }}>{customer.id}</td>
                                            <td style={{ textAlign: "center" }}>{customer.name}</td>
                                            <td style={{ textAlign: "center" }}>{customer.lastName}</td>
                                            <td style={{ textAlign: "center" }}>{customer.dni}</td>
                                            <td style={{ textAlign: "center" }}>{customer.phone}</td>
                                            <td style={{ textAlign: "center", textTransform:"initial" }}>{customer.mail}</td>
                                            <td style={{ textAlign: "center" }}>{customer.address}</td>
                                            <td style={{ textAlign: "center" }}>{customer.idciudad.name}</td>
                                            <td style={{ textAlign: "center" }}>
                                                <button type="button" className="btn btn-primary btn-sm" style={{ height: '3rem', width: '3rem', background: 'transparent', boxShadow: 'none', borderColor: 'transparent' }} onClick={() => abrirModalEdicion(customer)}>
                                                    <i className="bi bi-pencil-square" style={{ fontSize: '2rem', textAlign: "center", cursor: 'pointer' }}></i>
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
                                <Modal.Title>Guardar Propietario</Modal.Title>
                            </Modal.Header>
                            <Formik
                                initialValues={{
                                    name: '',
                                    lastName: '',
                                    dni: '',
                                    phone: '',
                                    mail: '',
                                    address: '',
                                    city: ''
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleGuardarCliente}
                            >
                                {({ isSubmitting }) => (
                                    <FormikForm>
                                        <Modal.Body>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>Nombre</Form.Label>
                                                <Field className="form-control" type="text" name="name" />
                                                <ErrorMessage name="name" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicLastName">
                                                <Form.Label>Apellidos</Form.Label>
                                                <Field className="form-control" type="text" name="lastName" />
                                                <ErrorMessage name="lastName" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicDni">
                                                <Form.Label>N° Cedula</Form.Label>
                                                <Field className="form-control" type="text" name="dni" />
                                                <ErrorMessage name="dni" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Label>Teléfono</Form.Label>
                                                <Field className="form-control" type="text" name="phone" />
                                                <ErrorMessage name="phone" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicMail">
                                                <Form.Label>Correo</Form.Label>
                                                <Field className="form-control" type="email" name="mail" />
                                                <ErrorMessage name="mail" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicAddress">
                                                <Form.Label>Dirección</Form.Label>
                                                <Field className="form-control" type="text" name="address" />
                                                <ErrorMessage name="address" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicCity">
                                                <Form.Label>Ciudad</Form.Label>
                                                <Field as="select" className="form-control" name="city">
                                                    <option value="">Seleccionar ciudad</option>
                                                    {CitySelect.map(ciudad => (
                                                        <option key={ciudad.id} value={ciudad.id}>
                                                        {ciudad.name}
                                                    </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="city" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={cerrarModalGuardar}>
                                                Cancelar
                                            </Button>
                                            <Button variant="primary" type="submit" disabled={isSubmitting} style={{ background: '#56208c', borderColor: 'transparent' }} >
                                                Guardar Propietario
                                            </Button>
                                        </Modal.Footer>
                                    </FormikForm>
                                )}
                            </Formik>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Crud_Clientes;