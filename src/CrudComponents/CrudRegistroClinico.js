import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrudRegistroClinico = () => {
    const [registrosClinicos, setRegistrosClinicos] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [examenesMedicos, setExamenesMedicos] = useState([]);
    const [enfermedades, setEnfermedades] = useState([]);
    const [mascotas, setMascotas] = useState([]);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create');
    const [registroClinico, setRegistroClinico] = useState({
        id: '',
        heart_rate: '',
        observations: '',
        clinical_Record_Data: '',
        temperature: '',
        idingreso: '',
        idempleado: '',
        idexamenmedico: '',
        idenfermedad: '',
        idmascota: ''
    });

    const fetchRegistrosClinicos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/clinicalrecords/all');
            if (Array.isArray(response.data)) {
                setRegistrosClinicos(response.data);
            } else {
                console.error('La respuesta de la API no es un array:', response.data);
            }
        } catch (error) {
            console.error('Error al listar los registros clínicos', error);
        }
    };

    const fetchEmpleados = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/employees/all');
            if (Array.isArray(response.data)) {
                setEmpleados(response.data);
            } else {
                console.error('La respuesta de la API no es un array:', response.data);
            }
        } catch (error) {
            console.error('Error al buscar empleados', error);
        }
    };

    const fetchExamenesMedicos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/medicalExam/all');
            if (Array.isArray(response.data)) {
                setExamenesMedicos(response.data);
            } else {
                console.error('La respuesta de la API no es un array:', response.data);
            }
        } catch (error) {
            console.error('Error al buscar exámenes médicos', error);
        }
    };

    const fetchEnfermedades = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/diseases/all');
            if (Array.isArray(response.data)) {
                setEnfermedades(response.data);
            } else {
                console.error('La respuesta de la API no es un array:', response.data);
            }
        } catch (error) {
            console.error('Error al buscar enfermedades', error);
        }
    };

    const fetchMascotas = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/pet/all');
            if (Array.isArray(response.data)) {
                setMascotas(response.data);
            } else {
                console.error('La respuesta de la API no es un array:', response.data);
            }
        } catch (error) {
            console.error('Error al buscar mascotas', error);
        }
    };

    useEffect(() => {
        fetchRegistrosClinicos();
        fetchEmpleados();
        fetchExamenesMedicos();
        fetchEnfermedades();
        fetchMascotas();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegistroClinico({
            ...registroClinico,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formType === 'create') {
            await createRegistroClinico();
        } else {
            await updateRegistroClinico();
        }
    };

    const createRegistroClinico = async () => {
        try {
            await axios.post('http://localhost:8080/api/clinicalrecords/create', registroClinico);
            setShowForm(false);
            fetchRegistrosClinicos();
            setMessage('Registro clínico creado exitosamente');
        } catch (error) {
            console.error('Error al crear el registro clínico', error);
        }
    };

    const updateRegistroClinico = async () => {
        try {
            await axios.put(`http://localhost:8080/api/clinicalrecords/update/${registroClinico.id}`, registroClinico);
            setShowForm(false);
            fetchRegistrosClinicos();
            setMessage('Registro clínico actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar el registro clínico', error);
        }
    };

    const showCreateForm = () => {
        setShowForm(true);
        setFormType('create');
        setRegistroClinico({
            id: '',
            heart_rate: '',
            observations: '',
            clinical_Record_Data: '',
            temperature: '',
            idingreso: '',
            idempleado: '',
            idexamenmedico: '',
            idenfermedad: '',
            idmascota: ''
        });
    };

    const showEditForm = (selectedRegistroClinico) => {
        if (selectedRegistroClinico) {
            setShowForm(true);
            setFormType('edit');
            setRegistroClinico(selectedRegistroClinico);
        } else {
            console.error('Error: No se ha seleccionado ningún registro clínico para editar');
        }
    };

    return (
        <>
            <div className='registro-clinico'>
                <h2>Lista de registros clínicos</h2>
                <button
                    className='btn btn-primary'
                    onClick={showCreateForm}
                    style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                >
                    Crear Registro Clínico
                </button>
                {showForm && (
                    <div className='card'>
                        <div className='card-header'>
                            <h3 className='cart-title'>
                                {formType === "create" ? (
                                    <><span>Crear Registro Clínico</span></>
                                ) : (
                                    <><span>Editar registro clínico</span></>
                                )}
                            </h3>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={() => setShowForm(false)}
                            ></button>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Frecuencia Cardíaca</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Frecuencia Cardíaca"
                                        name="heart_rate"
                                        value={registroClinico.heart_rate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Observaciones</label>
                                    <textarea
                                        className="form-control"
                                        placeholder="Observaciones"
                                        name="observations"
                                        value={registroClinico.observations}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Fecha de Registro Clínico</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Fecha de Registro Clínico"
                                        name="clinical_Record_Data"
                                        value={registroClinico.clinical_Record_Data}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Temperatura</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Temperatura"
                                        name="temperature"
                                        value={registroClinico.temperature}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Empleado</label>
                                    <select
                                        className='form-select'
                                        name='idempleado'
                                        value={registroClinico.idempleado}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Selecciona un empleado</option>
                                        {empleados.map((empleado) => (
                                            <option key={empleado.id} value={empleado.id}>
                                                {empleado.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Examen Médico</label>
                                    <select
                                        className='form-select'
                                        name='idexamenmedico'
                                        value={registroClinico.idexamenmedico}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Selecciona un examen médico</option>
                                        {examenesMedicos.map((examen) => (
                                            <option key={examen.id} value={examen.id}>
                                                {examen.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Enfermedad</label>
                                    <select
                                        className='form-select'
                                        name='idenfermedad'
                                        value={registroClinico.idenfermedad}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Selecciona una enfermedad</option>
                                        {enfermedades.map((enfermedad) => (
                                            <option key={enfermedad.id} value={enfermedad.id}>
                                                {enfermedad.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Mascota</label>
                                    <select
                                        className='form-select'
                                        name='idmascota'
                                        value={registroClinico.idmascota}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Selecciona una mascota</option>
                                        {mascotas.map((mascota) => (
                                            <option key={mascota.id} value={mascota.id}>
                                                {mascota.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-success me-2" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}>
                                    {formType === 'create' ? 'Crear' : 'Editar'}
                                </button>
                                <button type="button" className="btn btn-secondary me-2" style={{ backgroundColor: '#a11129' }} onClick={() => setShowForm(false)}>
                                    Cancelar
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Frecuencia Cardíaca</th>
                            <th>Observaciones</th>
                            <th>Fecha de Registro Clínico</th>
                            <th>Temperatura</th>
                            <th>Empleado</th>
                            <th>Examen Médico</th>
                            <th>Enfermedad</th>
                            <th>Mascota</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrosClinicos.map((registro) => (
                            <tr key={registro.id}>
                                <td>{registro.id}</td>
                                <td>{registro.heart_rate}</td>
                                <td>{registro.observations}</td>
                                <td>{registro.clinical_Record_Data}</td>
                                <td>{registro.temperature}</td>
                                <td>{registro.idempleado ? registro.idempleado.nombre : 'N/A'}</td>
                                <td>{registro.idexamenmedico ? registro.idexamenmedico.nombre : 'N/A'}</td>
                                <td>{registro.idenfermedad ? registro.idenfermedad.nombre : 'N/A'}</td>
                                <td>{registro.idmascota ? registro.idmascota.nombre : 'N/A'}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => showEditForm(registro)}
                                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {message && <p>{message}</p>}
            </div>
        </>
    );
};

export default CrudRegistroClinico;
