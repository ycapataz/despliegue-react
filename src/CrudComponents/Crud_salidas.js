import React, { useState,useContext,useEffect } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Form, Button} from 'react-bootstrap';
import Navbar from "../components/Navbar_almacenista";
import StylesTabla from '../assets/css/avg_encabezado.module.scss';
import ProductService from '../services/ProductService';
import OutTypeService from '../services/OutTypeService';
import RegistrationEntryService from '../services/RegistrationEntryService';
import Menu_almacenista from '../components/Menu_almacenista';
import Swal from 'sweetalert2';
import SelectedIngresoContext from '../context/SelectedIngresoContext';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import * as Yup from 'yup';
import CheckOutService from '../services/CheckOutService';
// Esquema de validación con Yup y Regex
const validationSchema = Yup.object().shape({
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
    outType: Yup.string()
        .required('El tipo de salida es requerido'),
    product: Yup.string()
        .required('El producto es requerido')
});

const validationSchemaEdit = Yup.object().shape({
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
outType: Yup.string()
    .required('El tipo de salida es requerido'),
product: Yup.string()
    .required('El producto es requerido')
});

function Crud_entradas() {
    const [outs, setOuts] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    const [mostrarModalGuardar, setMostrarModalGuardar] = useState(false);
    const [datosFormularioEdicion, setDatosFormularioEdicion] = useState({ id: '', date: '', amount: '', outType: '', product: '' });
    const [salidaSeleccionada, setSalidaSeleccionada] = useState(null);
    const [productos, setProductos] = useState([]);
    const [Selectproductos, setSlectProducto] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [SlectTiposalida, setSlectTiposalida] = useState([]);

    const handleChangeBusqueda = (event) => {
        setTerminoBusqueda(event.target.value);
    };
    useEffect(() => {
        fetchData();
        fetchSelectProducto();
        fetchSlectTiposalida();
    }, []);

    const fetchSlectTiposalida = async () => {
        try {
            const response = await OutTypeService.getAllOutTypes();
            setSlectTiposalida(response.data.data);
        } catch (error) {
            console.log("Error al obtener los tipos de salida", error)
        }
    };

    const fetchData = async () => {
        try {
            const response = await CheckOutService.getAllOuts();
            setOuts(response.data.DATA.reverse());
            // Obtener categorias, proveedores y estados disponibles
            const productos = response.data.DATA.map(salida => ({ id: salida.idproducto.id, name: salida.idproducto.name }));
            const tipos = response.data.DATA.map(salida => ({ id: salida.idtiposalida.id, name: salida.idtiposalida.name }));
           
            // Filtrar valores únicos
            const productosUnicos = productos.filter((producto, index, self) => self.findIndex(m => m.id === producto.id) === index);
            const tiposUnicos = tipos.filter((tipo, index, self) => self.findIndex(m => m.id === tipo.id) === index);     
            setProductos(productosUnicos);
            setTipos(tiposUnicos);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchSelectProducto = async () => {
        try {
            const response = await ProductService.getAllProducts();
            console.log("Select Producto",response);
            setSlectProducto(response.data.DATA);
        } catch (error) {
            console.log("Error al obtener los productos", error)
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
            text: 'Salida cancelada.'
        });
    };

    const abrirModalEdicion = (salida) => {
        setSalidaSeleccionada(salida);
        setDatosFormularioEdicion({
            id: salida.id,
            date: salida.date,
            amount: salida.amount,
            product: salida.idproducto.name,
            outType: salida.idtiposalida.name
        });
        setMostrarModalEdicion(true);
    };

    const cerrarModalEdicion = () => {
        setMostrarModalEdicion(false);
        Swal.fire({
            icon: 'info',
            title: 'Cancelado',
            text: 'Salida cancelada.'
        });
    };
    
    const handleGuardarSalida = async (values) => {
        try {
            const idProducto = values.product;
            const idTiposalida = values.outType;
    
            // Obtener el producto para verificar el stock disponible
            const responseProducto = await ProductService.getIdProduct(idProducto);
            console.log(responseProducto);
            const productoId = responseProducto.data.data;
            
            if (productoId.amount < values.amount) {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'No hay suficiente stock para realizar esta salida.',
                });
                return;
            }
    
            const response = await CheckOutService.createOut({
                date: new Date().toISOString().split('T')[0],
                amount: values.amount,
                idtiposalida: {
                    id: idTiposalida
                },
                idproducto: {
                    id: idProducto
                },
            });
    
            console.log('Respuesta de la API:', response.data);
            fetchData(); // Actualiza la tabla
            cerrarModalGuardar(); // Cierra el modal
            setDatosFormularioEdicion({ id: '', date: '', amount: '', outType: '', product: '' });
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'La salida se ha guardado correctamente.',
            });
        } catch (error) {
            console.error('Error al guardar la salida:', error);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: error.message || 'Hubo un error al guardar la salida.',
            });
        }
    };    

        // Función para manejar el cambio en el input de búsqueda
        const manejarCambioBusqueda = (e) => {
            setTerminoBusqueda(e.target.value);
        };

        const salidasFiltradas = outs.filter(salida => {
            // Filtrar por ID u otro campo que desees
            return (
                salida.id.toString().includes(terminoBusqueda) || // Filtrar por ID
                (typeof salida.date === 'string' && salida.date.toLowerCase().includes(terminoBusqueda.toLowerCase())) || // Filtrar por fecha
                (typeof salida.amount === 'string' && salida.amount.toLowerCase().includes(terminoBusqueda.toLowerCase())) || // Filtrar por cantidad
                (salida.idtiposalida && typeof salida.idtiposalida.name === 'string' && salida.idtiposalida.name.toLowerCase().includes(terminoBusqueda.toLowerCase())) // Filtrar por proveedor               
                (salida.idproducto && typeof salida.idproducto.name === 'string' && salida.idproducto.name.toLowerCase().includes(terminoBusqueda.toLowerCase())) // Filtrar por proveedor
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
                    <h1 className={StylesTabla.NombreTable}>Tabla salidas</h1>
                    <div>
                        <button className={StylesTabla.buttonHeader} onClick={() => abrirModalGuardar()}>Crear Salida</button>
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
                            <th style={{ textAlign: "center" }}>Fecha salida</th>
                            <th style={{ textAlign: "center" }}>Cantidad</th>
                            <th style={{ textAlign: "center" }}>Tipo Salida</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salidasFiltradas.map(out => (
                            <tr key={out.id}>
                                <td style={{ textAlign: "center" }}>{out.id}</td>
                                <td style={{ textAlign: "center" }}>{out.idproducto.name}</td>                                
                                <td style={{ textAlign: "center" }}>{out.date}</td>
                                <td style={{ textAlign: "center" }}>{out.amount}</td>
                                <td style={{ textAlign: "center" }}>{out.idtiposalida.name}</td>                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                {/*Modal o ventana emejernte para GUARDAR */}
                <Modal show={mostrarModalGuardar} onHide={cerrarModalGuardar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear Salida</Modal.Title>
                    </Modal.Header>
    <Formik
        initialValues={{
            product: '',
            outType: '',
            amount: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleGuardarSalida}
    >
        {({ isSubmitting }) => (
            <FormikForm>
                <Modal.Body>
                <Form.Group controlId="formBasicCity">
                        <Form.Label>Producto</Form.Label>
                        <Field as="select" className="form-control" name="product">
                            <option value="">Seleccionar producto</option>
                            {Selectproductos.map(producto => (
                                <option key={producto.id} value={producto.id}>
                                    {producto.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="product" component="div" className="text-danger" />
                    </Form.Group>
                <Form.Group controlId="formBasicCity">
                        <Form.Label>Tipo Salida</Form.Label>
                        <Field as="select" className="form-control" name="outType">
                            <option value="">Seleccionar tipo salida</option>
                            {SlectTiposalida.map(tipo => (
                                <option key={tipo.id} value={tipo.id}>
                                    {tipo.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="outType" component="div" className="text-danger" />
                    </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Cantidad</Form.Label>
                    <Field className="form-control" type="number" name="amount"  />
                    <ErrorMessage name="amount" component="div" className="text-danger" />
                </Form.Group>
                </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={cerrarModalGuardar}>Cancelar</Button>
                            <Button variant="primary" type="submit" style={{ background: '#56208c', borderColor: 'transparent' }} disabled={isSubmitting}>Guardar salida</Button>
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