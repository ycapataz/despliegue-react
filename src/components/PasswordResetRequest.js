import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap'; // Importar componentes de react-bootstrap
import Swal from 'sweetalert2';
import * as Yup from 'yup'; // Importar Yup para validación de formularios
import { Formik } from 'formik';
import passwordService from '../services/passwordService';
import EmployeeService from '../services/EmployeeService';

const PasswordResetRequestModal = ({ show, onClose }) => {
    const [email, setEmail] = useState('');
    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        fetchEmpleados();
    }, []);

    const fetchEmpleados = async () => {
        try {
            const response = await EmployeeService.getAllEmployees();
            setEmpleados(response.data);
        } catch (error) {
            console.error('Error al obtener los empleados:', error);
        }
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Ingrese un correo electrónico válido')
            .required('El correo electrónico es requerido'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const { email } = values;

        // Verificar si el correo existe en la lista de empleados
        const empleadoEncontrado = empleados.find(empleado => empleado.mail === email);

        if (empleadoEncontrado) {
            try {
                await passwordService.sendResetEmail(email);
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Correo electrónico para restablecer la contraseña enviado.',
                });
                onClose(); // Cerrar el modal después de enviar el correo
            } catch (error) {
                console.error('Error al enviar el correo electrónico para restablecer la contraseña:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al enviar el correo electrónico para restablecer la contraseña.',
                });
            }
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Correo no enviado',
                text: 'El correo electrónico ingresado no corresponde a un empleado registrado.'
            });
        }

        setSubmitting(false);
    };

    return (
        <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Restablecer Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik
                initialValues={{ email: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.email && !!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <br></br>
                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" onClick={onClose} style={{ marginRight: '10px' }}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit" disabled={isSubmitting} style={{ backgroundColor: '#56208c' }} >
                                Enviar correo
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal.Body>
    </Modal>
    );
};

export default PasswordResetRequestModal;