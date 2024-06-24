import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Form, Button } from 'react-bootstrap'; // Importar componentes de react-bootstrap
import { Formik } from 'formik';
import * as Yup from 'yup';
import passwordService from '../services/passwordService';

const PasswordReset = () => {
    const [resetSuccess, setResetSuccess] = useState(false);
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');

    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .required('La nueva contraseña es requerida')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&+])([A-Za-z\d$@$!%*?&+]|[^ ]){8,15}$/,
                'La contraseña debe contener al menos 8 caracteres, incluyendo minúsculas, mayúsculas, números y caracteres ($ @ $ ! % * ? & +)'
            ),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await passwordService.resetPassword(token, values.newPassword);
            setResetSuccess(true);
            // También puedes manejar la navegación aquí si es necesario
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Contraseña restablecida exitosamente.',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al restablecer la contraseña.',
            });
        }
        setSubmitting(false);
    };

    if (resetSuccess) {
        return (
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f1f1f1' }}>
                <div className="col-lg-4 col-md-6">
                    <div className="p-4 bg-light border rounded text-center">
                        <h2>Contraseña restablecida exitosamente</h2>
                        <br />
                        <Link to="/iniciosesion" style={{ textDecoration: 'none', color: '#56208c' }}>Volver al inicio de sesión</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f1f1f1' }}>
            <div className="col-lg-4 col-md-6">
                <Formik
                    initialValues={{ newPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit} className="p-4 bg-light border rounded">
                            <h2 className="text-center mb-4">Ingresar Nueva Contraseña</h2>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control
                                    type="password"
                                    name="newPassword"
                                    value={values.newPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Ingresar nueva contraseña"
                                    isInvalid={touched.newPassword && !!errors.newPassword}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
                            </Form.Group>
                            <div className="text-center">
                                <br></br>
                                <Button variant="primary" type="submit" style={{ width: '70%', maxWidth: '200px', backgroundColor: '#56208c', borderColor: '#56208c' }} disabled={isSubmitting}>
                                    Cambiar Contraseña
                                </Button>
                                <br></br><br></br>
                                <div style={{ marginBottom: '10px' }}>
                                    <Link to="/iniciosesion" style={{ textDecoration: 'none', color: '#56208c' }}>Volver al inicio de sesión</Link>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default PasswordReset;