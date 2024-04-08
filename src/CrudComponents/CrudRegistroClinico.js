import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Form, Button} from 'react-bootstrap';
import Navbar from "../components/Navbar_V";
import StylesTabla from '../assets/css/avg_encabezado.module.scss';
import ClinicalRecordService from '../services/ClinicalRecordService';
import Menu_veterinario from '../components/Menu_veterinario';
import DiseaseService from '../services/DiseaseService';

function CrudRegistroClinico() {
    const [clinicalRecords, setClinicalRecords] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [Enfermedades, setEnfermedad] = useState([]);
    const [editedRecord, setEditedRecord] = useState({
        id: '',
        heart_rate: '',
        observations: '',
        clinical_Record_Data: '',
        temperature: '',
        idingreso: { date: '' },
        idempleado: { name: '' },
        idexamenmedico: { exam: '' },
        idmascota:{ name: ''},
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

    useEffect(() => {
        const fetchClinicalRecords = async () => {
            try {
                const response = await ClinicalRecordService.getAllClinicalRecords();
                setClinicalRecords(response.data);
            } catch (error) {
                console.error('Error al obtener los registros clínicos:', error);
            }
        };
        const fetchEnfermedad = async () => {
            try {
                const response = await DiseaseService.getAllDiseases();
                 // Agregar esta línea para verificar los datos recibidos
                setEnfermedad(response.data);
            } catch (error) {
                console.error('Error al obtener las mascotas:', error);
            }
        };

        fetchClinicalRecords();
        fetchEnfermedad();
    }, []);

    const handleEditRecord = (record) => {
        setEditedRecord(record);
        // Aquí estableces los datos editados para el modal
        setDatosFormularioEdicion({
            date: record.idingreso.date,
            hour: '', // Aquí establece la hora si es necesario
            petName: '', // Aquí establece el nombre de la mascota
            specialty: '', // Aquí establece la especialidad
            veterinarian: '', // Aquí establece el veterinario
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

    const Editar = async () => {
        try {
            await ClinicalRecordService.updateClinicalRecord(editedRecord.id, {
                heart_rate: editedRecord.heart_rate,
                temperature: editedRecord.temperature,
                clinical_Record_Data: editedRecord.clinical_Record_Data,
                observations: editedRecord.observations,
                idenfermedad: { id: editedRecord.idenfermedad }
            });
            setShowModal(false);
            // Recargar los registros clínicos después de guardar los cambios
            const response = await ClinicalRecordService.getAllClinicalRecords();
            setClinicalRecords(response.data);
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Los cambios se guardaron correctamente.'
            });
        } catch (error) {
            console.error('Error al guardar los cambios del registro clínico:', error);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Hubo un error al guardar los cambios.'
            });
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
                    <h1 className={StylesTabla.NombreTable}>Registro Clinico</h1>
                    <div>
                        <button className={StylesTabla.buttonHeader} >Crear Registro</button>
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
                            <th style={{ textAlign: "center" }}>Frecuencia Cardica</th>
                            <th style={{ textAlign: "center" }}>Temperatura</th>
                            <th style={{ textAlign: "center" }}>Fecha Registro Clinico</th>
                            <th style={{ textAlign: "center" }}>Observaciones</th>                          
                            <th style={{ textAlign: "center" }}>Fecha Ingreso</th>
                            <th style={{ textAlign: "center" }}>Creado por</th>
                            <th style={{ textAlign: "center" }}>Examen</th>
                            <th style={{ textAlign: "center" }}>mascotas</th>
                            <th style={{ textAlign: "center" }}>Enfemedad</th>
                            <th style={{ textAlign: "center" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clinicalRecords.map(record => (
                                <tr key={record.id}>
                                <td style={{ textAlign: "center" }}>{record.id}</td>
                                <td style={{ textAlign: "center" }}>{record.heart_rate}</td>
                                <td style={{ textAlign: "center" }}>{record.temperature}</td>
                                <td style={{ textAlign: "center" }}>{record.clinical_Record_Data}</td>
                                <td style={{ textAlign: "center" }}>{record.observations}</td>
                                <td style={{ textAlign: "center" }}>{record.idingreso.date}</td>
                                <td style={{ textAlign: "center" }}>{record.idempleado.name}</td>
                                <td style={{ textAlign: "center" }}>{record.idexamenmedico.exam}</td>
                                <td style={{ textAlign: "center" }}>{record.idmascota.name}</td>
                                {<td style={{ textAlign: "center" }}>{record.idenfermedad.name}</td>}
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
                        <Form.Group controlId="formBasicHeartRate">
                            <Form.Label>Frecuencia Cardiaca</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                value={editedRecord.heart_rate}
                                onChange={(e) => setEditedRecord({ ...editedRecord, heart_rate: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicTemperature">
                            <Form.Label>Temperatura</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                value={editedRecord.temperature}
                                onChange={(e) => setEditedRecord({ ...editedRecord, temperature: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicObservations">
                            <Form.Label>Observaciones</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={editedRecord.observations}
                                onChange={(e) => setEditedRecord({ ...editedRecord, observations: e.target.value })}
                            />
                        </Form.Group>
{                        <Form.Group controlId="formBasicMacota">
                                <Form.Label>Enfermedades</Form.Label>
                                <Form.Control as="select" value={editedRecord.idenfermedad} onChange={(e) => setEditedRecord({ ...editedRecord, idenfermedad: e.target.value })}>
                                    <option value="">Selecciona una enfermedad</option>
                                    {Enfermedades.map(enfermedad => (
                                        <option key={enfermedad.id} value={enfermedad.id}>{enfermedad.name}</option>
                                    ))}
                                </Form.Control>
                        </Form.Group>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                    <Button variant="primary" style={{ background: '#56208c', borderColor: 'transparent' }} onClick={Editar}>Guardar Cambios</Button>
                </Modal.Footer>
            </Modal>
                {/*Modal o ventana emejernte para GUARDAR */}
                {/* <Modal show={mostrarModalGuardar} onHide={cerrarModalGuardar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Generar Cita</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicDate">
                                <Form.Label>Fecha cita</Form.Label>
                                <Form.Control type="date" placeholder="dd/mm/aaaa" onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, date: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formBasicHour">
                                <Form.Label>Hora cita</Form.Label>
                                <Form.Control type="time" placeholder="--:--" onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, hour: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPetName">
                                <Form.Label>Nombre Mascota</Form.Label>
                                <Form.Control as="select" onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, petName: e.target.value })}>
                                    <option value="">Selecciona una mascota</option>
                                    {mascotas.map((mascota, index) => (
                                        <option key={index} value={mascota.name}>{mascota.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicSpecialty">
                                <Form.Label>Especialidad</Form.Label>
                                <Form.Control as="select" onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, specialty: e.target.value })}>
                                    <option value="">Selecciona una especialidad</option>
                                    {especialidades.map((especialidad, index) => (
                                        <option key={index} value={especialidad.name}>{especialidad.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicVeterinarian">
                                <Form.Label>Veterinario</Form.Label>
                                <Form.Control as="select"  onChange={(e) => setDatosFormularioEdicion({ ...datosFormularioEdicion, veterinarian: e.target.value })}>
                                    <option value="">Selecciona un veterinario</option>
                                    {veterinarios.map((veterinario, index) => (
                                        <option key={index} value={veterinario.name}>{veterinario.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cerrarModalGuardar}>Cancelar</Button>
                        <Button variant="primary" style={{background:'#56208c', borderColor: 'transparent'}} onClick={handleGuardarCita}>Guardar Cambios</Button>
                    </Modal.Footer>
                </Modal> */}
        </div>
        </div>
        </div>
        </>
    );
}

export default CrudRegistroClinico;