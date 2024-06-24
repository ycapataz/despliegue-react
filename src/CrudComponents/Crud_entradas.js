import React, { useState,useContext,useEffect } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Form, Button} from 'react-bootstrap';
import Navbar from "../components/Navbar_almacenista";
import StylesTabla from '../assets/css/avg_encabezado.module.scss';
import ProductService from '../services/ProductService';
import RegistrationEntryService from '../services/RegistrationEntryService';
import Menu_almacenista from '../components/Menu_almacenista';
import Swal from 'sweetalert2';
import SelectedIngresoContext from '../context/SelectedIngresoContext';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import * as Yup from 'yup';
// Esquema de validación con Yup y Regex
const validationSchema = Yup.object().shape({
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
    product: Yup.string()
        .required('El producto es requerido')
});

const validationSchemaEdit = Yup.object().shape({
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
product: Yup.string()
    .required('El producto es requerido')
});

function Crud_entradas() {
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    const [mostrarModalGuardar, setMostrarModalGuardar] = useState(false);
    const [datosFormularioEdicion, setDatosFormularioEdicion] = useState({ id: '', date: '', amount: '', expiration: '', product: '' });
    const [entradaSeleccionado, setEntradaSeleccionada] = useState(null);
    const [productos, setProductos] = useState([]);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [selectProducto, setSlectProducto] = useState('');

    const handleChangeBusqueda = (event) => {
        setTerminoBusqueda(event.target.value);
    };
    useEffect(() => {
        fetchData();
        fetchSelectProducto();
    }, []);

    const fetchSelectProducto = async () => {
        try {
            const response = await ProductService.getAllProducts();
            setSlectProducto(response.data.DATA);
        } catch (error) {
            console.log("Error al obtener los productos", error)
        }
    };

    const fetchData = async () => {
        try {
            const response = await RegistrationEntryService.getAllEntries();
            setEntries(response.data.DATA.reverse());
            // Obtener categorias, proveedores y estados disponibles
            const productos = response.data.DATA.map(entrada => ({ id: entrada.idproducto.id, name: entrada.idproducto.name }));
            // Filtrar valores únicos
            const productosUnicos = productos.filter((producto, index, self) => self.findIndex(m => m.id === producto.id) === index);
            setProductos(productosUnicos);
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
            text: 'Entrada cancelada.'
        });
    };

    const abrirModalEdicion = (entrada) => {
        setEntradaSeleccionada(entrada);
        setDatosFormularioEdicion({
            id: entrada.id,
            date: entrada.date,
            amount: entrada.amount,
            expiration: entrada.expiration,
            product: entrada.idproducto.name,
        });
        setMostrarModalEdicion(true);
    };

    const cerrarModalEdicion = () => {
        setMostrarModalEdicion(false);
        Swal.fire({
            icon: 'info',
            title: 'Cancelado',
            text: 'Entrada cancelada.'
        });
    };
    
    const handleGuardarEntrada = async (values) => {
        try {
            // Obtener el ID de la categoria seleccionada
            const idProducto = values.product;

            const response = await RegistrationEntryService.createEntry({
                date: new Date().toISOString().split('T')[0],
                amount: values.amount,
                expiration: values.expiration,
                batch: values.batch,
                idproducto: {
                    id: idProducto
                },
            });

            console.log('Respuesta de la API:', response.data);
            fetchData(); // Actualiza la tabla
            cerrarModalGuardar(); // Cierra el modal
            // Limpiar los datos del formulario
            setDatosFormularioEdicion({ id: '', date: '', amount: '', expiration: '', product: '' });
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'La entrada se ha guardado correctamente.',
            });
        } catch (error) {
            console.error('Error al guardar la entrada:', error);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: error.message || 'Hubo un error al guardar la entrada.',
            });
        }
    };

        // Función para manejar el cambio en el input de búsqueda
        const manejarCambioBusqueda = (e) => {
            setTerminoBusqueda(e.target.value);
        };

        const entradasFiltradas = entries.filter(entrada => {
            // Filtrar por ID u otro campo que desees
            return (
                entrada.id.toString().includes(terminoBusqueda) || // Filtrar por ID
                (typeof entrada.date === 'string' && entrada.date.toLowerCase().includes(terminoBusqueda.toLowerCase())) || // Filtrar por fecha
                (typeof entrada.name === 'string' && entrada.name.toLowerCase().includes(terminoBusqueda.toLowerCase())) || // Filtrar por nombre
                (typeof entrada.expiration === 'string' && entrada.expiration.toLowerCase().includes(terminoBusqueda.toLowerCase())) || // Filtrar por fecha vencimiento
                (typeof entrada.amount === 'string' && entrada.amount.toLowerCase().includes(terminoBusqueda.toLowerCase())) || // Filtrar por cantidad
                (entrada.idproducto && typeof entrada.idproducto.name === 'string' && entrada.idproducto.name.toLowerCase().includes(terminoBusqueda.toLowerCase())) // Filtrar por proveedor
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
                    <h1 className={StylesTabla.NombreTable}>Tabla entradas</h1>
                    <div>
                        <button className={StylesTabla.buttonHeader} onClick={() => abrirModalGuardar()}>Crear Entrada</button>
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
                            <th style={{ textAlign: "center" }}>Fecha Entrada</th>
                            <th style={{ textAlign: "center" }}>Cantidad</th>
                            <th style={{ textAlign: "center" }}>Fecha vencimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entradasFiltradas.map(entri => (
                            <tr key={entri.id}>
                                <td style={{ textAlign: "center" }}>{entri.id}</td>
                                <td style={{ textAlign: "center" }}>{entri.idproducto.name}</td>
                                <td style={{ textAlign: "center" }}>{entri.date}</td>                                
                                <td style={{ textAlign: "center" }}>{entri.amount}</td>
                                <td style={{ textAlign: "center" }}>{entri.expiration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                {/*Modal o ventana emejernte para GUARDAR */}
                <Modal show={mostrarModalGuardar} onHide={cerrarModalGuardar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear Entrada</Modal.Title>
                    </Modal.Header>
    <Formik
        initialValues={{
            amount: '',
            expiration: '',
            product: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleGuardarEntrada}
    >
        {({ isSubmitting }) => (
            <FormikForm>
                <Modal.Body>
                <Form.Group controlId="formBasicCity">
                    <Form.Label>Producto</Form.Label>
                    <Field as="select" className="form-control" name="product">
                        <option value="">Seleccionar producto</option>
                        {selectProducto.map(producto => (
                        <option key={producto.id} value={producto.id}>
                            {producto.name}
                        </option>
                        ))}
                    </Field>
                    <ErrorMessage name="product" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Cantidad</Form.Label>
                    <Field className="form-control" type="number" name="amount"  />
                    <ErrorMessage name="amount" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Fecha Vencimiento</Form.Label>
                    <Field className="form-control" type="date" name="expiration"  />
                    <ErrorMessage name="expiration" component="div" className="text-danger" />
                </Form.Group>
                </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={cerrarModalGuardar}>Cancelar</Button>
                            <Button variant="primary" type="submit" style={{ background: '#56208c', borderColor: 'transparent' }} disabled={isSubmitting}>Guardar Entrada</Button>
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

export default Crud_entradas;