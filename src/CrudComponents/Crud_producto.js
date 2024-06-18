import React, { useState,useContext,useEffect } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Form, Button} from 'react-bootstrap';
import Navbar from "../components/Navbar_almacenista";
import StylesTabla from '../assets/css/avg_encabezado.module.scss';
import ProductService from '../services/ProductService';
import Menu_almacenista from '../components/Menu_almacenista';
import Swal from 'sweetalert2';
import SelectedIngresoContext from '../context/SelectedIngresoContext';

import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

import { Formik, Field, ErrorMessage } from 'formik';

function Crud_Prducto() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    const [mostrarModalGuardar, setMostrarModalGuardar] = useState(false);
    const [datosFormularioEdicion, setDatosFormularioEdicion] = useState({ id: '', name: '', expiration: '', amount: '', batch: '', category:'', provider: '', state: '' });
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [estados, setEstados] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');

    const handleChangeBusqueda = (event) => {
        setTerminoBusqueda(event.target.value);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await ProductService.getAllProducts();
            setProducts(response.data.DATA);
            // Obtener categorias, proveedores y estados disponibles
            const categorias = response.data.DATA.map(producto => ({ id: producto.idcategoria.id, name: producto.idcategoria.name }));
            const proveedores = response.data.DATA.map(producto => ({ id: producto.idproveedor.id, name: producto.idproveedor.name }));
            const estados = response.data.DATA.map(producto => ({ id: producto.idestado.id, name: producto.idestado.name }));
            // Filtrar valores únicos
            const categoriasUnicas = categorias.filter((categoria, index, self) => self.findIndex(m => m.id === categoria.id) === index);
            const proveedoresUnicos = proveedores.filter((proveedor, index, self) => self.findIndex(e => e.id === proveedor.id) === index);
            const estadosUnicos = estados.filter((estado, index, self) => self.findIndex(e => e.id === estado.id) === index);
            setCategorias(categoriasUnicas);
            setProveedores(proveedoresUnicos);
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
        Swal.fire({
            icon: 'info',
            title: 'Cancelado',
            text: 'Producto cancelado.'
        });
    };

    const abrirModalEdicion = (producto) => {
        setProductoSeleccionado(producto);
        setDatosFormularioEdicion({
            id: producto.id,
            name: producto.name,
            expiration: producto.expiration,
            amount: producto.amount,
            batch: producto.batch,
            category: producto.idcategoria.name,
            provider: producto.idproveedor.name,
            state: producto.idestado.name
        });
        setMostrarModalEdicion(true);
    };

    const cerrarModalEdicion = () => {
        setMostrarModalEdicion(false);
        Swal.fire({
            icon: 'info',
            title: 'Cancelado',
            text: 'Producto cancelado.'
        });
    };
    
    const handleGuardarProducto = async (values) => {
        try {
            // Obtener el ID de la categoria seleccionada
            const idCategoria = categorias.find(categoria => categoria.name === values.category)?.id;

            // Obtener el ID del proveedor seleccionado
            const idProveedor = proveedores.find(proveedor => proveedor.name === values.provider)?.id;

            // Obtener el ID del estado seleccionado
            const idEstado = estados.find(estado => estado.name === values.state)?.id;

            const response = await ProductService.createProduct({
                name: values.name,
                expiration: values.expiration,
                amount: values.amount,
                batch: values.batch,
                idcategoria: {
                    id: idCategoria
                },
                idproveedor: {
                    id: idProveedor
                },
                idestado: {
                    id: idEstado
                }
            });

            console.log('Respuesta de la API:', response.data);
            fetchData(); // Actualiza la tabla
            cerrarModalGuardar(); // Cierra el modal
            // Limpiar los datos del formulario
            setDatosFormularioEdicion({ id: '', name: '', expiration: '', amount: '', batch: '', category: '', provider: '', state: '' });
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'El producto se ha guardado correctamente.',
            });
        } catch (error) {
            console.error('Error al guardar el producto:', error);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: error.message || 'Hubo un error al guardar el producto.',
            });
        }
    };
     //Funcion de actualizar
        const handleActualizarProducto = async (values) => {
            try {
                console.log('Datos del producto a actualizar:', values);
    
                // Obtener el ID de la mascota seleccionada
                const idCategoria = categorias.find(categoria => categoria.name === values.category)?.id;
                
                // Obtener el ID de la especialidad seleccionada
                const idProveedor = proveedores.find(proveedor => proveedor.name === values.provider)?.id;
    
                // Obtener el ID de la especialidad seleccionada
                const idEstado = estados.find(estado => estado.name === values.state)?.id;
    
                const response = await ProductService.updateProduct(values.id, {
                    name: values.name,
                    expiration: values.expiration,
                    amount: values.amount,
                    batch: values.batch,
                    idcategoria: {
                        id: idCategoria
                    },
                    idproveedor: {
                        id: idProveedor
                    },
                    idestado: {
                        id: idEstado
                    }
                });
                console.log('Respuesta de la API:', response.data);
                fetchData();//Actualiza la tabla
                cerrarModalEdicion();//Cierra el modal o ventana emergente
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'El producto se ha actualizado correctamente.',
                });
    
            } catch (error) {
                console.error('Error al actualizar el producto:', error);
                // Manejar el error
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: error.message || 'Hubo un error al guardar el producto.',
                });
            }
        };

    //Funcion para Guardar
    const validateForm = (values) => {
        const errors = {};
        // Validar nombre.
        if (!values.name) {
            errors.name = 'El nombre es requerido.';
        } else if (!/^[a-zA-Z\s]*$/.test(values.name)) {
            errors.name = 'Por favor ingrese un nombre valido';
        }
        // Validar fecha de expiración.
        if (!values.expiration) {
            errors.expiration = 'La fecha de expiración es requerida.';
        }
        // Validar cantidad.
        if (!values.amount) {
            errors.amount = 'La cantidad es requerida.';
        } else if (!/^[1-9][0-9]*$/.test(values.amount)) {
            errors.amount = 'Por favor ingresar una cantidad válida.';
        }
        // Validar lote.
        if (!values.batch) {
            errors.batch = 'El lote es requerido.';
        }
        // Validar categoría.
        if (!values.category) {
            errors.category = 'Selecciona una categoría.';
        }
        // Validar proveedor.
        if (!values.provider) {
            errors.provider = 'Selecciona un proveedor.';
        }
        // Validar estado.
        if (!values.state) {
            errors.state = 'Selecciona un estado.';
        }
        return errors;
    };
        // Función para manejar el cambio en el input de búsqueda
        const manejarCambioBusqueda = (e) => {
            setTerminoBusqueda(e.target.value);
        };

    const productosFiltrados = products.filter(producto => {
        // Filtrar por ID u otro campo que desees
        return (
            producto.id.toString().includes(terminoBusqueda) || // Filtrar por ID
            (typeof producto.name === 'string' && producto.name.toLowerCase().includes(terminoBusqueda.toLowerCase())) || // Filtrar por nombre
            (typeof producto.expiration === 'string' && producto.expiration.toLowerCase().includes(terminoBusqueda.toLowerCase())) || // Filtrar por fecha vencimiento
            (typeof producto.amount === 'string' && producto.amount.toLowerCase().includes(terminoBusqueda.toLowerCase())) || // Filtrar por cantidad
            (typeof producto.batch === 'string' && producto.batch.toLowerCase().includes(terminoBusqueda.toLowerCase())) || // Filtrar por lote
            (typeof producto.idcategoria?.name === 'string' && producto.idcategoria?.name.toLowerCase().includes(terminoBusqueda.toLowerCase())) || // Filtrar por categoria
            (typeof producto.idproveedor?.name === 'string' && producto.idproveedor?.name.toLowerCase().includes(terminoBusqueda.toLowerCase())) || // Filtrar por proveedor
            (typeof producto.idestado?.name === 'string' && producto.idestado?.name.toLowerCase().includes(terminoBusqueda.toLowerCase())) // Filtrar por proveedor     
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
                    <h1 className={StylesTabla.NombreTable}>Tabla productos</h1>
                    <div>
                        <button className={StylesTabla.buttonHeader} onClick={() => abrirModalGuardar()}>Crear Producto</button>
                    </div>
                    <br/>
                    <div className={StylesTabla.DivInpuctsearch}>
                        <input className={StylesTabla.Inpuctsearch} type="search" placeholder="Buscar" value={terminoBusqueda} onChange={manejarCambioBusqueda}/>
                        <i className="bi bi-search-heart" style={{ color: '#56208c', position: 'absolute', top: '10px', right: '1rem', fontSize: '1.2rem' }}></i>
                    </div>
                    <br/>
                </section>
            </div>
            <div className={StylesTabla.tablebody}>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>Id</th>
                            <th style={{ textAlign: "center" }}>Producto</th>
                            <th style={{ textAlign: "center" }}>Fecha vencimiento</th>
                            <th style={{ textAlign: "center" }}>Cantidad</th>
                            <th style={{ textAlign: "center" }}>Lote</th>
                            <th style={{ textAlign: "center" }}>Proveedor</th>
                            <th style={{ textAlign: "center" }}>Categoria</th>
                            <th style={{ textAlign: "center" }}>Estado</th>
                            <th style={{ textAlign: "center" }}>Acciones</th>

                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.map(product => (
                            <tr key={product.id}>
                                <td style={{ textAlign: "center" }}>{product.id}</td>
                                <td style={{ textAlign: "center" }}>{product.name}</td>
                                <td style={{ textAlign: "center" }}>{product.expiration}</td>
                                <td style={{ textAlign: "center" }}>{product.amount}</td>
                                <td style={{ textAlign: "center" }}>{product.batch}</td>
                                <td style={{ textAlign: "center" }}>{product.idcategoria.name}</td>
                                <td style={{ textAlign: "center" }}>{product.idproveedor.name}</td>
                                <td style={{ textAlign: "center" }}>{product.idestado.name}</td>
                                <td style={{ textAlign: "center" }}>
                                    <button type="button" className="btn btn-primary btn-sm" style={{ height: '3rem', width: '3rem', background: 'transparent', boxShadow: 'none', borderColor: 'transparent' }} onClick={() => abrirModalEdicion(product)}>
                                        <i className="bi bi-pencil-square" style={{ fontSize: '2rem', textAlign: "center", cursor: 'pointer' }}></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


                {/*Modal o ventana emejernte para GUARDAR */}
    <Formik
        initialValues={{
            name: '',
            expiration: '',
            amount: '',
            batch: '',
            category: '',
            provider: '',
            state: '',
        }}
        validate={validateForm}
        onSubmit={handleGuardarProducto}
    >
        {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
            <Modal show={mostrarModalGuardar} onHide={cerrarModalGuardar}>
                <Modal.Header closeButton>
                    <Modal.Title>Generar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Producto</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el nombre del producto"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.name && !!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicExpiration">
                            <Form.Label>Fecha Vencimiento</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Ingrese la fecha de vencimiento"
                                name="expiration"
                                value={values.expiration}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.expiration && !!errors.expiration}
                            />
                            <Form.Control.Feedback type="invalid">{errors.expiration}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicAmount">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="500"
                                placeholder="Ingrese la cantidad del producto"
                                name="amount"
                                value={values.amount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.amount && !!errors.amount}
                            />
                            <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicBatch">
                            <Form.Label>Lote</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                placeholder="Ingrese el lote del producto"
                                name="batch"
                                value={values.batch}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.batch && !!errors.batch}
                            />
                            <Form.Control.Feedback type="invalid">{errors.batch}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicCategory">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control
                                as="select"
                                name="category"
                                value={values.category}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.category && !!errors.category}
                            >
                                <option value="">Selecciona una categoria</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.name}>
                                        {categoria.name}
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicProvider">
                            <Form.Label>Proveedor</Form.Label>
                            <Form.Control
                                as="select"
                                name="provider"
                                value={values.provider}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.provider && !!errors.provider}
                            >
                                <option value="">Selecciona un proveedor</option>
                                {proveedores.map((proveedor) => (
                                    <option key={proveedor.id} value={proveedor.name}>
                                        {proveedor.name}
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.provider}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicState">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                as="select"
                                name="state"
                                value={values.state}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.state && !!errors.state}
                            >
                                <option value="">Selecciona un estado</option>
                                {estados.map((estado) => (
                                    <option key={estado.id} value={estado.name}>
                                        {estado.name}
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={cerrarModalGuardar}>Cancelar</Button>
                            <Button variant="primary" type="submit" style={{ background: '#56208c', borderColor: 'transparent' }}>Guardar Producto</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        )}
    </Formik>
{/*Modal o ventana emergente para EDITAR */}
<Formik
    initialValues={{
        name: datosFormularioEdicion.name || '',
        expiration: datosFormularioEdicion.expiration || '',
        amount: datosFormularioEdicion.amount || '',
        batch: datosFormularioEdicion.batch || '',
        category: datosFormularioEdicion.category || '',
        provider: datosFormularioEdicion.provider || '',
        state: datosFormularioEdicion.state || '',
    }}
    validate={validateForm}
    onSubmit={handleActualizarProducto}
>
    {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
        <Modal show={mostrarModalEdicion} onHide={cerrarModalEdicion}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Producto</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre del producto"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.name && !!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicExpiration">
                        <Form.Label>Fecha Vencimiento</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Ingrese la fecha de vencimiento"
                            name="expiration"
                            value={values.expiration}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.expiration && !!errors.expiration}
                        />
                        <Form.Control.Feedback type="invalid">{errors.expiration}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicAmount">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            max="500"
                            placeholder="Ingrese la cantidad del producto"
                            name="amount"
                            value={values.amount}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.amount && !!errors.amount}
                        />
                        <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicBatch">
                        <Form.Label>Lote</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            placeholder="Ingrese el lote del producto"
                            name="batch"
                            value={values.batch}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.batch && !!errors.batch}
                        />
                        <Form.Control.Feedback type="invalid">{errors.batch}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicCategory">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                            as="select"
                            name="category"
                            value={values.category}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.category && !!errors.category}
                        >
                            <option value="">Selecciona una categoria</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.name}>
                                    {categoria.name}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicProvider">
                        <Form.Label>Proveedor</Form.Label>
                        <Form.Control
                            as="select"
                            name="provider"
                            value={values.provider}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.provider && !!errors.provider}
                        >
                            <option value="">Selecciona un proveedor</option>
                            {proveedores.map((proveedor) => (
                                <option key={proveedor.id} value={proveedor.name}>
                                    {proveedor.name}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.provider}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicState">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control
                            as="select"
                            name="state"
                            value={values.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.state && !!errors.state}
                        >
                            <option value="">Selecciona un estado</option>
                            {estados.map((estado) => (
                                <option key={estado.id} value={estado.name}>
                                    {estado.name}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cerrarModalEdicion}>Cancelar</Button>
                        <Button variant="primary" type="submit" style={{ background: '#56208c', borderColor: 'transparent' }}>Actualizar Producto</Button>
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

export default Crud_Prducto;