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
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import * as Yup from 'yup';
// Esquema de validación con Yup y Regex
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/^[a-zA-ZñÑ]+(?:\s[a-zA-ZñÑ]+){0,2}$/, 'Esto no es un producto.')
        .min(3, 'Debe tener al menos 3 caracteres')
        .max(15, 'Exceso de caracteres, esto no parece un producto.')
        .required('El producto es requerido'),
    expiration: Yup.string()
    .required('La fecha de vencimiento es requerida.')
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD).')
        .test(
            'is-valid-date',
            'La fecha de vencimiento debe ser despues a la fecha actual.',
            value => {
                const selectedDate = new Date(value);
                const currentDate = new Date();
                return selectedDate > currentDate;
            }
        )
        .test(
            'El producto no puede tener menos de 1 mes de vencimiento.',
            value => {
                const selectedDate = new Date(value);
                const maxPastDate = new Date();
                maxPastDate.setMonth(maxPastDate.getMonth() - 1);
                return selectedDate > maxPastDate;
            }
        ),
        amount: Yup.string()
        .matches(/^\d+$/, "La cantidad debe ser un número")
        .test(
          'rango',
          'La cantidad debe estar entre 1 y 500',
          value => {
            const num = Number(value);
            return num >= 1 && num <= 500;
          }
        )
        .required('La cantidad es requerida'),
    batch: Yup.string()
        .matches(/^\+?\d{7,12}$/, "Lote inválido")
        .required('El lote es requerido'),
    category: Yup.string()
        .required('La categoria es requerida'),
    provider: Yup.string()
        .required('El proveedor es requerido'),
    state: Yup.string()
        .required('El estado es requerido')
});

const validationSchemaEdit = Yup.object().shape({
    name: Yup.string()
        .matches(/^[a-zA-ZñÑ]+(?:\s[a-zA-ZñÑ]+){0,2}$/, 'Esto no es un producto.')
        .min(3, 'Debe tener al menos 3 caracteres')
        .max(20, 'Exceso de caracteres, esto no parece un producto.')
        .required('El producto es requerido'),
        expiration: Yup.string()
        .required('La fecha de vencimiento es requerida.')
            .matches(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD).')
            .test(
                'is-valid-date',
                'La fecha de vencimiento debe ser despues a la fecha actual.',
                value => {
                    const selectedDate = new Date(value);
                    const currentDate = new Date();
                    return selectedDate > currentDate;
                }
            )
            .test(
                'El producto no puede tener menos de 1 mes de vencimiento.',
                value => {
                    const selectedDate = new Date(value);
                    const maxPastDate = new Date();
                    maxPastDate.setMonth(maxPastDate.getMonth() - 1);
                    return selectedDate > maxPastDate;
                }
            ),
        amount: Yup.string()
            .matches(/^\d+$/, "La cantidad debe ser un número")
            .test(
              'rango',
              'La cantidad debe estar entre 1 y 500',
              value => {
                const num = Number(value);
                return num >= 1 && num <= 500;
              }
            )
            .required('La cantidad es requerida'),
    batch: Yup.string()
        .matches(/^\+?\d{7,12}$/, "Lote inválido")
        .required('El lote es requerido'),
    category: Yup.string()
        .required('La categoria es requerida'),
    provider: Yup.string()
        .required('El proveedor es requerido'),
    state: Yup.string()
        .required('El estado es requerido')
});

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
            setProducts(response.data.DATA.reverse());
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
                            <th style={{ textAlign: "center" }}>Categoria</th>
                            <th style={{ textAlign: "center" }}>Proveedor</th>
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
{/*Modal o ventana emergente para EDITAR */}
<Modal show={mostrarModalEdicion} onHide={cerrarModalEdicion}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Producto</Modal.Title>
            </Modal.Header>
<Formik
        initialValues={datosFormularioEdicion}
        enableReinitialize={true}
        validationSchema={validationSchemaEdit}
        onSubmit={handleActualizarProducto}
>
    {({ isSubmitting }) => (
            <FormikForm>
            <Modal.Body>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Producto</Form.Label>
                    <Field className="form-control" type="text" name="name" disabled />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Fecha Vencimiento</Form.Label>
                    <Field className="form-control" type="date" name="expiration" disabled />
                    <ErrorMessage name="expiration" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Cantidad</Form.Label>
                    <Field className="form-control" type="number" name="amount" disabled />
                    <ErrorMessage name="amount" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Lote</Form.Label>
                    <Field className="form-control" type="number" name="batch" disabled />
                    <ErrorMessage name="batch" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group controlId="formBasicCity">
                    <Form.Label>Categoria</Form.Label>
                    <Field as="select" className="form-control" name="category">
                        <option value="">Seleccionar categoria</option>
                        {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.name}>
                            {categoria.name}
                        </option>
                        ))}
                    </Field>
                    <ErrorMessage name="category" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group controlId="formBasicCity">
                    <Form.Label>Proveedor</Form.Label>
                    <Field as="select" className="form-control" name="provider">
                        <option value="">Seleccionar proveedor</option>
                        {proveedores.map(proveedor => (
                        <option key={proveedor.id} value={proveedor.name}>
                            {proveedor.name}
                        </option>
                        ))}
                    </Field>
                    <ErrorMessage name="provider" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group controlId="formBasicCity">
                    <Form.Label>Estado</Form.Label>
                    <Field as="select" className="form-control" name="state">
                        <option value="">Seleccionar estado</option>
                        {estados.map(estado => (
                        <option key={estado.id} value={estado.name}>
                            {estado.name}
                        </option>
                        ))}
                    </Field>
                    <ErrorMessage name="state" component="div" className="text-danger" />
                </Form.Group>
                </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cerrarModalEdicion}>Cancelar</Button>
                        <Button variant="primary" type="submit" style={{ background: '#56208c', borderColor: 'transparent' }} disabled={isSubmitting}>Actualizar Producto</Button>
                    </Modal.Footer>
                    </FormikForm>
                    )}
                </Formik>    
            </Modal>

                {/*Modal o ventana emejernte para GUARDAR */}
                <Modal show={mostrarModalGuardar} onHide={cerrarModalGuardar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear Producto</Modal.Title>
                    </Modal.Header>
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
        validationSchema={validationSchema}
        onSubmit={handleGuardarProducto}
    >
        {({ isSubmitting }) => (
            <FormikForm>
                <Modal.Body>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Producto</Form.Label>
                    <Field className="form-control" type="text" name="name"  />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Fecha Vencimiento</Form.Label>
                    <Field className="form-control" type="date" name="expiration"  />
                    <ErrorMessage name="expiration" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Cantidad</Form.Label>
                    <Field className="form-control" type="number" name="amount"  />
                    <ErrorMessage name="amount" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Lote</Form.Label>
                    <Field className="form-control" type="number" name="batch"  />
                    <ErrorMessage name="batch" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group controlId="formBasicCity">
                    <Form.Label>Categoria</Form.Label>
                    <Field as="select" className="form-control" name="category">
                        <option value="">Seleccionar categoria</option>
                        {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.name}>
                            {categoria.name}
                        </option>
                        ))}
                    </Field>
                    <ErrorMessage name="category" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group controlId="formBasicCity">
                    <Form.Label>Proveedor</Form.Label>
                    <Field as="select" className="form-control" name="provider">
                        <option value="">Seleccionar proveedor</option>
                        {proveedores.map(proveedor => (
                        <option key={proveedor.id} value={proveedor.name}>
                            {proveedor.name}
                        </option>
                        ))}
                    </Field>
                    <ErrorMessage name="provider" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group controlId="formBasicCity">
                    <Form.Label>Estado</Form.Label>
                    <Field as="select" className="form-control" name="state">
                        <option value="">Seleccionar estado</option>
                        {estados.map(estado => (
                        <option key={estado.id} value={estado.name}>
                            {estado.name}
                        </option>
                        ))}
                    </Field>
                    <ErrorMessage name="state" component="div" className="text-danger" />
                </Form.Group>
                </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={cerrarModalGuardar}>Cancelar</Button>
                            <Button variant="primary" type="submit" style={{ background: '#56208c', borderColor: 'transparent' }} disabled={isSubmitting}>Guardar Producto</Button>
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

export default Crud_Prducto;