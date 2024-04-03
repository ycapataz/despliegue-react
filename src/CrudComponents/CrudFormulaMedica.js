import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrudFormulaMedica = () => {
    const [formulasMedicas, setFormulasMedicas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [registrosClinicos, setRegistrosClinicos] = useState([]);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create');
    const [formulaMedica, setFormulaMedica] = useState({
        id: '',
        dose: '',
        duration: '',
        amount: '',
        observations: '',
        idproducto: '',
        idregistroclinico: ''
    });

    const fetchFormulasMedicas = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/medicalFormula/all');
            if (response.data.status === "success") {
                setFormulasMedicas(response.data.data);
            } else {
                console.error('Error en la respuesta de la API:', response.data.message);
            }
        } catch (error) {
            console.error('Error al obtener las fórmulas médicas', error);
        }
    };

    const fetchProductos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/Product/all');
            if (response.data.status === "success") {
                setProductos(response.data.data);
            } else {
                console.error('Error en la respuesta de la API:', response.data.message);
            }
        } catch (error) {
            console.error('Error al obtener los productos', error);
        }
    };

    const fetchRegistrosClinicos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/registroclinico/all');
            if (response.data.status === "success") {
                setRegistrosClinicos(response.data.data);
            } else {
                console.error('Error en la respuesta de la API:', response.data.message);
            }
        } catch (error) {
            console.error('Error al obtener los registros clínicos', error);
        }
    };

    useEffect(() => {
        fetchFormulasMedicas();
        fetchProductos();
        fetchRegistrosClinicos();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormulaMedica({
            ...formulaMedica,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formType === 'create') {
            await createFormulaMedica();
        } else {
            await updateFormulaMedica();
        }
    }

    const createFormulaMedica = async () => {
        try {
            await axios.post('http://localhost:8080/api/medicalFormula/create', formulaMedica);
            setShowForm(false);
            fetchFormulasMedicas();
            setMessage('Fórmula médica creada exitosamente');
        } catch (error) {
            console.error('Error al crear la fórmula médica', error);
        }
    };

    const updateFormulaMedica = async () => {
        try {
            await axios.put(`http://localhost:8080/api/medicalFormula/update/${formulaMedica.id}`, formulaMedica);
            setShowForm(false);
            fetchFormulasMedicas();
            setMessage('Fórmula médica actualizada exitosamente');
        } catch (error) {
            console.error('Error al actualizar la fórmula médica', error);
        }
    };

    const showCreateForm = () => {
        setShowForm(true);
        setFormType('create');
        setFormulaMedica({
            id: '',
            dose: '',
            duration: '',
            amount: '',
            observations: '',
            idproducto: '',
            idregistroclinico: ''
        });
    };

    const showEditForm = (selectedFormulaMedica) => {
        if (selectedFormulaMedica) {
            setShowForm(true);
            setFormType('edit');
            setFormulaMedica(selectedFormulaMedica);
        } else {
            console.error('Error: No se ha seleccionado ninguna fórmula médica para editar');
        }
    };

    return (
        <>
            <div className='formula-medica'>
                <h2>Lista de fórmulas médicas</h2>
                <button
                    className='btn btn-primary'
                    onClick={showCreateForm}
                    style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                >
                    Crear Fórmula Médica
                </button>
                {showForm && (
                    <div className='card'>
                        <div className='card-header'>
                            <h3 className='cart-title'>
                                {formType === "create" ? (
                                    <><span>Crear Fórmula Médica</span></>
                                ) : (
                                    <><span>Editar fórmula médica</span></>
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
                                    <label className="form-label">Dosis</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Dosis"
                                        name="dose"
                                        value={formulaMedica.dose}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Duración</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Duración"
                                        name="duration"
                                        value={formulaMedica.duration}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Cantidad</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Cantidad"
                                        name="amount"
                                        value={formulaMedica.amount}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Observaciones</label>
                                    <textarea
                                        className="form-control"
                                        placeholder="Observaciones"
                                        name="observations"
                                        value={formulaMedica.observations}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Producto</label>
                                    <select
                                        className='form-select'
                                        name='idproducto'
                                        value={formulaMedica.idproducto}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Selecciona un producto</option>
                                        {productos.map((producto) => (
                                            <option key={producto.id} value={producto.id}>
                                                {producto.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Registro Clínico</label>
                                    <select
                                        className='form-select'
                                        name='idregistroclinico'
                                        value={formulaMedica.idregistroclinico}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Selecciona un registro clínico</option>
                                        {registrosClinicos.map((registro) => (
                                            <option key={registro.id} value={registro.id}>
                                                {registro.id}
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
                            <th>Dosis</th>
                            <th>Duración</th>
                            <th>Cantidad</th>
                            <th>Observaciones</th>
                            <th>Producto</th>
                            <th>Registro Clínico</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formulasMedicas.map((formula) => (
                            <tr key={formula.id}>
                                <td>{formula.id}</td>
                                <td>{formula.dose}</td>
                                <td>{formula.duration}</td>
                                <td>{formula.amount}</td>
                                <td>{formula.observations}</td>
                                <td>{formula.idproducto ? formula.idproducto.nombre : 'N/A'}</td>
                                <td>{formula.idregistroclinico}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => showEditForm(formula)}
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

export default CrudFormulaMedica;