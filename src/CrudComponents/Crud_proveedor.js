import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Form, Button} from 'react-bootstrap';
import Navbar from "../components/Navbar_almacenista";
import StylesTabla from '../assets/css/avg_encabezado.module.scss';
import ProviderService from '../services/ProviderService';
import Menu_almacenista from '../components/Menu_almacenista';

function Crud_Proveedor() {
    const [providers, setProviders] = useState([]);
    const [error, setError] = useState(null);
    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    const [mostrarModalGuardar, setMostrarModalGuardar] = useState(false);
    const [datosFormularioEdicion, setDatosFormularioEdicion] = useState({ id: '', name: '', representative: '', mail: '', phone: '', state:'', city: '', nit: '' });
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
    const [ciudades, setCiudades] = useState([]);
    const [estados, setEstados] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await ProviderService.getAllProviders();
            setProviders(response.data.DATA);
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

    const abrirModalGuardar = () => {
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
    };

    //Funcion para Guardar
    const handleGuardarProveedor = async () => {
        try {
            // Obtener el ID de la ciudad seleccionada
            const idCiudad = ciudades.find(ciudad => ciudad.name === datosFormularioEdicion.city)?.id;
            
            // Obtener el ID del estado seleccionada
            const idEstado = estados.find(estado => estado.name === datosFormularioEdicion.state)?.id;
            
    
            const response = await ProviderService.createProvider({
                name: datosFormularioEdicion.name,
                representative: datosFormularioEdicion.representative,
                mail: datosFormularioEdicion.mail,
                phone: datosFormularioEdicion.phone,
                nit: datosFormularioEdicion.nit,
                idestado: {
                    id: idEstado
                },
                idciudad: {
                    id: idCiudad
                },
                
            });
            console.log('Respuesta de la API:', response.data);
            fetchData(); // Actualiza la tabla
            cerrarModalGuardar(); // Cierra el modal
            // Limpiar los datos del formulario
            setDatosFormularioEdicion({ id: '', name: '', representative: '', mail: '', phone: '', state:'', city: '', nit: '' });
        } catch (error) {
            console.error('Error al guardar el proveedor:', error);
            // Manejar el error
        }
    };    

    //Funcion de actualizar
    const handleActualizarProveedor = async (datosProveedor) => {
        try {
            console.log('Datos del proveedor a actualizar:', datosProveedor);

            // Obtener el ID de la mascota seleccionada
            const idCiudad = ciudades.find(ciudad => ciudad.name === datosProveedor.city)?.id;
            
            // Obtener el ID de la especialidad seleccionada
            const idEstado = estados.find(estado => estado.name === datosProveedor.state)?.id;

            const response = await ProviderService.updateProvider(datosProveedor.id, {
                name: datosProveedor.name,
                representative: datosProveedor.representative,
                mail: datosProveedor.mail,
                phone: datosProveedor.phone,
                idestado: {
                    id: idEstado
                },
                idciudad: {
                    id: idCiudad
                },
                nit: datosProveedor.nit
            });
            console.log('Respuesta de la API:', response.data);
            fetchData();//Actualiza la tabla
            cerrarModalEdicion();//Cierra el modal o ventana emergente

        } catch (error) {
            console.error('Error al actualizar el proveedor:', error);
            // Manejar el error
        }
    };      

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
                        <input className={StylesTabla.Inpuctsearch} type="search" placeholder="Buscar" />
                        <i className="bi bi-search-heart" style={{ color: '#56208c', position: 'absolute', top: '10px', right: '1rem', fontSize: '1.2rem' }}></i>
                    </div>
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
                        {providers.map(provider => (
                            <tr key={provider.id}>
                                <td style={{ textAlign: "center" }}>{provider.id}</td>
                                <td style={{ textAlign: "center" }}>{provider.name}</td>
                                <td style={{ textAlign: "center" }}>{provider.representative}</td>
                                <td style={{ textAlign: "center" }}>{provider.mail}</td>
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
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicDate">
                            <Form.Label>Proveedor</Form.Label>
                            <Form.Control type="text" value={datosFormularioEdicion.name} onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Representante</Form.Label>
                            <Form.Control type="text" value={datosFormularioEdicion.representative} onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, representative: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formBasicHour">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control type="mail" value={datosFormularioEdicion.mail} onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, mail: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formBasicHour">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control type="number" min="300" value={datosFormularioEdicion.phone} onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, phone: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPetName">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control as="select" value={datosFormularioEdicion.city} onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, city: e.target.value })}>
                                <option value="">Selecciona una ciudad</option>
                                {ciudades.map((ciudad, index) => (
                                    <option key={index} value={ciudad.name}>{ciudad.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicSpecialty">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control as="select" value={datosFormularioEdicion.state} onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, state: e.target.value })}>
                                <option value="">Selecciona un estado</option>
                                {estados.map((estado, index) => (
                                    <option key={index} value={estado.name}>{estado.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicHour">
                            <Form.Label>NIT</Form.Label>
                            <Form.Control type="text" value={datosFormularioEdicion.nit} onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, nit: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cerrarModalEdicion}>Cancelar</Button>
                    <Button variant="primary" style={{background:'#56208c', borderColor: 'transparent'}} onClick={() =>handleActualizarProveedor(datosFormularioEdicion)}>Actualizar Proveedor</Button>
                </Modal.Footer>
            </Modal>
                {/*Modal o ventana emejernte para GUARDAR */}
                <Modal show={mostrarModalGuardar} onHide={cerrarModalGuardar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Generar Proveedor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicDate">
                                <Form.Label>Proveedor</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el nombre del proveedor" onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, name: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formBasicHour">
                                <Form.Label>Representante</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el nombre del representante" onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, representative: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formBasicDate">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control type="mail" placeholder="Ingrese el correo del proveedor" onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, mail: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formBasicHour">
                                <Form.Label>Telefono</Form.Label>
                                <Form.Control type="number" min="3" placeholder="Ingrese el telefono del proveedor" onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, phone: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formBasicSpecialty">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control as="select" onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, state: e.target.value })}>
                                    <option value="">Selecciona un estado</option>
                                    {estados.map((estado, index) => (
                                        <option key={index} value={estado.name}>{estado.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicPetName">
                                <Form.Label>Ciudad</Form.Label>
                                <Form.Control as="select" onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, city: e.target.value })}>
                                    <option value="">Selecciona una ciudad</option>
                                    {ciudades.map((ciudad, index) => (
                                        <option key={index} value={ciudad.name}>{ciudad.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicDate">
                                <Form.Label>NIT</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el nit del proveedor" onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, nit: e.target.value })} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cerrarModalGuardar}>Cancelar</Button>
                        <Button variant="primary" style={{background:'#56208c', borderColor: 'transparent'}} onClick={handleGuardarProveedor}>Guardar Proveedor</Button>
                    </Modal.Footer>
                </Modal>
        </div>
        </div>
        </div>
        </>
    );
}

export default Crud_Proveedor;