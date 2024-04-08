import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Form, Button} from 'react-bootstrap';
import Navbar from "../components/Navbar_V";
import StylesTabla from '../assets/css/avg_encabezado.module.scss';
import MedicalFormulaService from '../services/MedicalFormulaService';
import ProductService from '../services/ProductService';
import Menu_veterinario from '../components/Menu_veterinario';

function CrudFormulaMedica() {
    const [clinicalRecords, setClinicalRecords] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [productos, setProductos] = useState([]);
    const [CrearRecord, setCrearRecord] = useState({
        dose: '',
        duration: '',
        amount: '',
        observations: '',
        idproducto: ''
    });
    const [editedRecord, setEditedRecord] = useState({
        id: '',
        heart_rate: '',
        observations: '',
        clinical_Record_Data: '',
        temperature: '',
        idingreso: { date: '' },
        idempleado: { name: '' },
        idexamenmedico: { exam: '' }
    });


    useEffect(() => {
        const fetchClinicalRecords = async () => {
            try {
                const response = await MedicalFormulaService.getAllMedicalFormula();
                setClinicalRecords(response.data.data);
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

        fetchClinicalRecords();
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
    };

    const Editar = async () => {
        try {
            const IdProducto = parseInt(editedRecord.idproducto);
            await MedicalFormulaService.updateMedicalFormula(editedRecord.id, {
                

                dose: editedRecord.dose,
                duration: editedRecord.duration,
                amount: editedRecord.amount,
                observations: editedRecord.observations,
                idproducto: { id: IdProducto }
            });
            setShowModal(false);
            // Recargar las fórmulas médicas después de guardar los cambios
            const response = await MedicalFormulaService.getAllMedicalFormula();
            setClinicalRecords(response.data.data);
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
    
    const Crear = async () => {
        try {
            // Obtener el ID del producto seleccionado del estado editedRecord
            const idProducto = parseInt(CrearRecord.idproducto);
            
            // ID predeterminado para el registro clínico
            const idRegistroClinicoPredeterminado = 1;
        
            // Crear la fórmula médica con los datos proporcionados
            await MedicalFormulaService.createMedicalFormula({
                dose: CrearRecord.dose,
                duration: CrearRecord.duration,
                amount: CrearRecord.amount,
                observations: CrearRecord.observations,
                idproducto: { id: idProducto },
                idregistroclinico: { id: idRegistroClinicoPredeterminado } // Establecer el valor predeterminado
            });
        
            // Cerrar el modal de creación
            setShowCreateModal(false);
        
            // Actualizar la lista de fórmulas médicas
            const response = await MedicalFormulaService.getAllMedicalFormula();
            setClinicalRecords(response.data.data);
        } catch (error) {
            console.error('Error al crear la fórmula médica:', error);
            // Manejar el error
        }
    };                 

    return (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }} >
        <Menu_veterinario/>
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
                        <input className={StylesTabla.Inpuctsearch} type="search" placeholder="Buscar" />
                        <i className="bi bi-search-heart" style={{ color: '#56208c', position: 'absolute', top: '10px', right: '1rem', fontSize: '1.2rem' }}></i>
                    </div>
                </section>
            </div>
            <div className={StylesTabla.tablebody}>
                <table className="table table-striped table-hover">
                    <thead>
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
                        {clinicalRecords.map(record => (
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
            {/*Modal o ventana emejernte para EDITAR */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Registro Clínico</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicDose">
                            <Form.Label>Dosis</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                value={editedRecord.dose}
                                onChange={(e) => setEditedRecord({ ...editedRecord, dose: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicDuration">
                            <Form.Label>Duración</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedRecord.duration}
                                onChange={(e) => setEditedRecord({ ...editedRecord, duration: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicAmount">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                value={editedRecord.amount}
                                onChange={(e) => setEditedRecord({ ...editedRecord, amount: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicObservations">
                            <Form.Label>Notas</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={editedRecord.observations}
                                onChange={(e) => setEditedRecord({ ...editedRecord, observations: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicProduct">
                            <Form.Label>Producto</Form.Label>
                            <Form.Control as="select" value={editedRecord.idproducto} onChange={(e) => setEditedRecord({ ...editedRecord, idproducto: e.target.value })}>
                                <option value="">Selecciona un producto</option>
                                {productos.map(producto => (
                                    <option key={producto.id} value={producto.id}>{producto.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                    <Button variant="primary" style={{ background: '#56208c', borderColor: 'transparent' }} onClick={Editar}>Guardar Cambios</Button>
                </Modal.Footer>
            </Modal>
                {/*Modal o ventana emejernte para CREAR */}
                <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear Nueva Fórmula Médica</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicDose">
                                <Form.Label>Dosis</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    
                                    onChange={(e) => setCrearRecord({ ...CrearRecord, dose: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicDuration">
                                <Form.Label>Duración</Form.Label>
                                <Form.Control
                                    type="text"
                                    
                                    onChange={(e) => setCrearRecord({ ...CrearRecord, duration: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicAmount">
                                <Form.Label>Cantidad</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    
                                    onChange={(e) => setCrearRecord({ ...CrearRecord, amount: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicObservations">
                                <Form.Label>Notas</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    
                                    onChange={(e) => setCrearRecord({ ...CrearRecord, observations: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicProduct">
                                <Form.Label>Producto</Form.Label>
                                <Form.Control as="select" value={CrearRecord.idproducto} onChange={(e) => setCrearRecord({ ...CrearRecord, idproducto: e.target.value })}>
                                    <option value="">Selecciona un producto</option>
                                    {productos.map(producto => (
                                        <option key={producto.id} value={producto.id}>{producto.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCreateModal}>Cancelar</Button>
                        <Button variant="primary" style={{ background: '#56208c', borderColor: 'transparent' }} onClick={Crear}>Crear Fórmula</Button>
                    </Modal.Footer>
                </Modal>
        </div>
        </div>
        </div>
        </>
    );
}

export default CrudFormulaMedica;
