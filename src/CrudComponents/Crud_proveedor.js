import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Form, Button} from 'react-bootstrap';
import Navbar from "../components/Navbar_almacenista";
import StylesTabla from '../assets/css/avg_encabezado.module.scss';
import ProviderService from '../services/ProviderService';
import StateService from '../services/StateService';
import CityService from '../services/CityService';
import Menu_almacenista from '../components/Menu_almacenista';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
// Esquema de validación con Yup y Regex
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/[a-zA-ZñÑáéíóúÁÉÍÓÚ]/, 'Esto no es un nombre.')
        .min(3, 'Debe tener al menos 3 caracteres')
        .max(50, 'Exceso de caracteres, esto no parece un nombre.')
        .required('El proveedor es requerido'),
    representative: Yup.string()
        .matches(/^[a-zA-ZñÑ]+(?:\s[a-zA-ZñÑ]+){0,5}$/, 'Esto no es un representante.')
        .min(3, 'Debe tener al menos 3 caracteres')
        .max(20, 'Exceso de caracteres, esto no parece un nombre.')
        .required('El representante es requerido'),
    phone: Yup.string()
        .matches(/^(310|311|312|313|314|321|320|322|323|315|316|317|318|319|350|351|300|301|302|324|304)[0-9]{7}$/, "Ingresar un teléfono válido.")
        .required('El telefono es requerido'),
    mail: Yup.string()
        .matches(/^[a-zA-Z0-9._-]+@(gmail|hotmail|outlook|misena|soy.sena)+\.(co|com|edu.co|edu.com)$/,"Correo electrónico inválido")
        .required('El correo es requerido'),
    nit: Yup.string()
        .matches(/^\+?\d{7,12}$/, "NIT inválido")
        .required('El NIT es requerido requerido'),
    city: Yup.string()
        .required('La ciudad es requerida'),
    state: Yup.string()
        .required('El estado es requerido')
});

function Crud_Proveedor() {
    const [providers, setProviders] = useState([]);
    const [error, setError] = useState(null);
    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    const [mostrarModalGuardar, setMostrarModalGuardar] = useState(false);
    const [datosFormularioEdicion, setDatosFormularioEdicion] = useState({ id: '', name: '', representative: '', mail: '', phone: '', state:'', city: '', nit: '' });
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
    const [SelectEstados, setSelectEstados] = useState(null);
    const [SelectCiudad, setSelectCiudad] = useState(null);
    const [ciudades, setCiudades] = useState([]);
    const [estados, setEstados] = useState([]);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');

    useEffect(() => {
        fetchData();
        fetchSelectEstado();
        fetchSelectCiudad();
    }, []);

    const fetchData = async () => {
        try {
            const response = await ProviderService.getAllProviders();
            setProviders(response.data.DATA.reverse());
            // Obtener ciudades y estados disponibles
            const ciudades = response.data.DATA.map(proveedor => ({ id: proveedor.idciudad.id, name: proveedor.idciudad.name }));
            const estados = response.data.DATA.map(proveedor => ({ id: proveedor.idestado.id, name: proveedor.idestado.name }));
            // Filtrar valores únicos
            const ciudadesUnicas = ciudades.filter((ciudad, index, self) => self.findIndex(m => m.id === ciudad.id) === index);
            const estadosUnicos = estados.filter((estado, index, self) => self.findIndex(e => e.id === estado.id) === index);
            setCiudades(ciudadesUnicas);
            setEstados(estadosUnicos);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchSelectEstado = async () => {
        try {
            const responseState = await StateService.getAllStates();
            console.log("Estados array",responseState);
            setSelectEstados(responseState.data.DATA);
        } catch (error) {
            console.log("Error al obtener los estados",error);
        }
    };

    const fetchSelectCiudad = async () => {
        try {
            const responseCity = await CityService.getAllCitys();
            console.log("Estados array",responseCity);
            setSelectCiudad(responseCity.data);
        } catch (error) {
            console.log("Error al obtener los estados",error);
        }
    };

    const abrirModalGuardar = () => {
        setDatosFormularioEdicion({ id: '', name: '', representative: '', mail: '', phone: '', state:'', city: '', nit: '' });
        setMostrarModalGuardar(true);
    };
    
    const cerrarModalGuardar = () =>{
        setMostrarModalGuardar(false);
    };

    const abrirModalEdicion = (proveedor) => {
        setProveedorSeleccionado(proveedor);
        setDatosFormularioEdicion({
            id: proveedor.id,
            name: proveedor.name,
            representative: proveedor.representative,
            mail: proveedor.mail,
            phone: proveedor.phone,
            state: proveedor.idestado.name,
            city: proveedor.idciudad.name,
            nit: proveedor.nit
        });
        setMostrarModalEdicion(true);
    };

    const cerrarModalEdicion = () => {
        setMostrarModalEdicion(false);
        Swal.fire({
            icon: 'info',
            title: 'Cancelado',
            text: 'Edicion de proveedor cancelada.'
        });
    };

    //Funcion para Guardar
    const handleGuardarProveedor = async (values, { setSubmitting, resetForm }) => {
        try {
            // Obtener el ID de la ciudad seleccionada
            const idCiudad = values.city;
            
            // Obtener el ID del estado seleccionada
            const idEstado = values.state;
            
    
        await ProviderService.createProvider({
                name: values.name,
                representative: values.representative,
                mail: values.mail,
                phone: values.phone,
                nit: values.nit,
                idestado: {
                    id: idEstado
                },
                idciudad: {
                    id: idCiudad
                },
                
            });
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Proveedor guardado correctamente.',
            });
            fetchData();
            cerrarModalGuardar();
            resetForm();
        } catch (error) {
            console.error('Error al guardar el proveedor:', error);
            // Manejar el error
        } finally {
            setSubmitting(false);
        }
    };    

    //Funcion de actualizar
    const handleActualizarProveedor = async (values, { setSubmitting }) => {
        try {
            console.log('Datos del proveedor a actualizar:', values);

            // Obtener el ID de la mascota seleccionada
            const idCiudad = values.city;
            
            // Obtener el ID de la especialidad seleccionada
            const idEstado = values.state;

            const response = await ProviderService.updateProvider(values.id, {
                name: values.name,
                representative: values.representative,
                mail: values.mail,
                phone: values.phone,
                idestado: {
                    id: idEstado
                },
                idciudad: {
                    id: idCiudad
                },
                nit: values.nit
            });
            fetchData();
            cerrarModalEdicion();
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Los cambios se guardaron correctamente.',
            });
        } catch (error) {
            console.error('Error al actualizar el proveedor:', error);
        } finally {
            setSubmitting(false);
        }
    };      
    // Función para manejar el cambio en el input de búsqueda
    const manejarCambioBusqueda = (e) => {
        setTerminoBusqueda(e.target.value);
    };

    // Filtrar los ingresos según el ID del empleado y el término de búsqueda
    const proveedoresFiltrados = providers.filter(provider => {
        const termino = terminoBusqueda.toLowerCase();
        return (
            provider.id?.toString().includes(termino) ||
            provider.name?.toLowerCase().includes(termino) ||
            provider.representative?.toLowerCase().includes(termino) ||
            provider.phone?.toString().toLowerCase().includes(termino) ||
            provider.mail?.toLowerCase().includes(termino) ||
            provider.state?.name?.toLowerCase().includes(termino) ||
            provider.idestado?.name?.toLowerCase().includes(termino) ||
            provider.idciudad?.name?.toLowerCase().includes(termino)
        );
    });
    return (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }} >
        <Menu_almacenista/>
        <div style={{ display: 'flex', flexGrow: 1 }}>
        <div>
            <Navbar/>
        </div>
        {/*Tabla donde se muestra todo*/}
        <div className={StylesTabla.containerTable}>
            <div className={StylesTabla.TableHeader}>
                <section className="table__header">
                    <h1 className={StylesTabla.NombreTable}>Tabla proveedores</h1>
                    <div>
                        <button className={StylesTabla.buttonHeader} onClick={() => abrirModalGuardar()}>Crear Proveedor</button>
                    </div>
                    <br/>
                    <div className={StylesTabla.DivInpuctsearch}>
                        <input className={StylesTabla.Inpuctsearch} type="search" placeholder="Buscar" value={terminoBusqueda} onChange={manejarCambioBusqueda}/>
                        <i className="bi bi-search-heart" style={{ color: '#56208c', position: 'absolute', top: '10px', right: '1rem', fontSize: '1.2rem' }}></i>
                    </div>
                    <br/>
                </section>
                <br/><br/>
            </div>
            
            <div className={StylesTabla.tablebody}>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>Id</th>
                            <th style={{ textAlign: "center" }}>Proveedor</th>
                            <th style={{ textAlign: "center" }}>Representante</th>
                            <th style={{ textAlign: "center" }}>Correo</th>
                            <th style={{ textAlign: "center" }}>Telefono</th>
                            <th style={{ textAlign: "center" }}>Estado</th>
                            <th style={{ textAlign: "center" }}>Ciudad</th>
                            <th style={{ textAlign: "center" }}>NIT</th>
                            <th style={{ textAlign: "center" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedoresFiltrados.map(provider => (
                            <tr key={provider.id}>
                                <td style={{ textAlign: "center" }}>{provider.id}</td>
                                <td style={{ textAlign: "center" }}>{provider.name}</td>
                                <td style={{ textAlign: "center" }}>{provider.representative}</td>
                                <td style={{ textAlign: "center", textTransform: "initial" }}>{provider.mail}</td>
                                <td style={{ textAlign: "center" }}>{provider.phone}</td>
                                <td style={{ textAlign: "center" }}>{provider.idestado.name}</td>
                                <td style={{ textAlign: "center" }}>{provider.idciudad.name}</td>
                                <td style={{ textAlign: "center" }}>{provider.nit}</td>
                                <td style={{ textAlign: "center" }}>
                                    <button type="button" className="btn btn-primary btn-sm" style={{ height: '3rem', width: '3rem', background: 'transparent', boxShadow: 'none', borderColor: 'transparent' }} onClick={() => abrirModalEdicion(provider)}>
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
                    <Modal.Title>Editar Proveedor</Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={datosFormularioEdicion}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={handleActualizarProveedor}
                >
                    {({ isSubmitting }) => (
                        <FormikForm>
                            <Modal.Body>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>Proveedor</Form.Label>
                                                <Field className="form-control" type="text" name="name" disabled />
                                                <ErrorMessage name="name" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicLastName">
                                                <Form.Label>Representante</Form.Label>
                                                <Field className="form-control" type="text" name="representative" />
                                                <ErrorMessage name="representative" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicMail">
                                                <Form.Label>Correo</Form.Label>
                                                <Field className="form-control" type="email" name="mail" />
                                                <ErrorMessage name="mail" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Label>Teléfono</Form.Label>
                                                <Field className="form-control" type="text" name="phone" />
                                                <ErrorMessage name="phone" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicCity">
                                                <Form.Label>Estado</Form.Label>
                                                <Field as="select" className="form-control" name="state">
                                                    <option value="">Seleccionar estado</option>
                                                    {SelectEstados.map(estado => (
                                                        <option key={estado.id} value={estado.id}>
                                                            {estado.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="state" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicCity">
                                                <Form.Label>Ciudad</Form.Label>
                                                <Field as="select" className="form-control" name="city">
                                                    <option value="">Seleccionar ciudad</option>
                                                    {SelectCiudad.map(ciudad => (
                                                        <option key={ciudad.id} value={ciudad.id}>
                                                            {ciudad.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="city" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Label>NIT</Form.Label>
                                                <Field className="form-control" type="text" name="nit" disabled/>
                                                <ErrorMessage name="nit" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cerrarModalEdicion}>Cancelar</Button>
                    <Button variant="primary" type="submit" style={{ background: '#56208c', borderColor: 'transparent' }} disabled={isSubmitting}>Actualizar Proveedor</Button>
                </Modal.Footer>
                </FormikForm>
                    )}
                </Formik>    
            </Modal>
                {/*Modal o ventana emejernte para GUARDAR */}
                <Modal show={mostrarModalGuardar} onHide={cerrarModalGuardar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear Proveedor</Modal.Title>
                    </Modal.Header>
                    <Formik
                        initialValues={{
                            id: '',
                            name: '',
                            representative: '',
                            mail: '',
                            phone: '',
                            state: '',
                            city: '',
                            nit: ''
                            }}
                                validationSchema={validationSchema}
                                onSubmit={handleGuardarProveedor}
                            >
                            {({ isSubmitting }) => (
                                <FormikForm>
                                    <Modal.Body>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>Proveedor</Form.Label>
                                                <Field className="form-control" type="text" name="name" />
                                                <ErrorMessage name="name" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicLastName">
                                                <Form.Label>Representante</Form.Label>
                                                <Field className="form-control" type="text" name="representative" />
                                                <ErrorMessage name="representative" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicMail">
                                                <Form.Label>Correo</Form.Label>
                                                <Field className="form-control" type="email" name="mail" />
                                                <ErrorMessage name="mail" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Label>Teléfono</Form.Label>
                                                <Field className="form-control" type="text" name="phone" />
                                                <ErrorMessage name="phone" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicCity">
                                                <Form.Label>Estado</Form.Label>
                                                <Field as="select" className="form-control" name="state">
                                                    <option value="">Seleccionar estado</option>
                                                    {SelectEstados.map(estado => (
                                                        <option key={estado.id} value={estado.id}>
                                                            {estado.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="state" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicCity">
                                                <Form.Label>Ciudad</Form.Label>
                                                <Field as="select" className="form-control" name="city">
                                                    <option value="">Seleccionar ciudad</option>
                                                    {SelectCiudad.map(ciudad => (
                                                        <option key={ciudad.id} value={ciudad.id}>
                                                            {ciudad.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="city" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Label>NIT</Form.Label>
                                                <Field className="form-control" type="text" name="nit" />
                                                <ErrorMessage name="nit" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cerrarModalGuardar}>Cancelar</Button>
                        <Button variant="primary" type="submit"style={{ background: '#56208c', borderColor: 'transparent' }} disabled={isSubmitting} >Guardar Proveedor</Button>
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

export default Crud_Proveedor;