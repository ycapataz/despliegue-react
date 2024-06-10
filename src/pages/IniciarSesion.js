import React, { useState, useEffect, useContext } from 'react';
import '../assets/css/contactenos.css';
import Menu from '../components/Menu';
import LoginServices from '../services/LoginServices';
import { Formik } from 'formik';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

function IniciarSesion() {
    const { setUser } = useContext(UserContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLoginSubmit = async (values, { setSubmitting, setErrors }) => {
        console.log('Formulario enviado');
        try {
            const response = await LoginServices.Login({
                mail: values.correo,
                password: values.password
            });

            if (response.status === 200) {
                const data = response.data;
                // Guardar datos del usuario en el contexto
                setUser(data);
                setIsAuthenticated(true);
            } else if (response.status === 401) {
                // Manejar errores de autenticación
                setErrors({ correo: 'Correo o contraseña incorrectos' });
            } else {
                // Manejar otros errores del backend
                setErrors({ correo: 'Error de autenticación' });
            }
        } catch (error) {
            console.error('Error:', error);
            // Suponiendo que 401 es el código de estado para una autenticación fallida
            if (error.response && error.response.status === 401) {
                setErrors({ correo: 'Correo o contraseña incorrectos' });
            } else {
                setErrors({ correo: 'Error en la conexión con el servidor' });
            }
        }
        setSubmitting(false);
    };

    useEffect(() => {
        if (isAuthenticated) {
            console.log('Usuario autenticado');
        }
    }, [isAuthenticated]);

    const user = useContext(UserContext).user; // Obtener el usuario del contexto

    if (isAuthenticated) {
        // Redirigir según el cargo del usuario
        switch (user.idcargo.id) {
            case 1:
                return <Navigate to="/notificacion" />;
            case 2:
                return <Navigate to="/Cita" />;
            case 3:
                return <Navigate to="/Producto" />;
            default:
                return <Navigate to="/menuVeterinario" />;
        }
    }

    return (
        <>
            <Menu />
            <div className='max_conten'>
                <br /><br /><br />
                <div className="contenedor">
                    <Formik
                        initialValues={{ correo: '', password: '' }}
                        validate={(valores) => {
                            let errores = {};
                            // Validar correo.
                            if (!valores.correo) {
                                errores.correo = 'Por favor ingresar un correo.';
                            } else if (!/^[a-zA-Z0-9._-]+@(gmail|hotmail|outlook|misena|soy.sena)+\.(co|com|edu.co|edu.com)$/.test(valores.correo)) {
                                errores.correo = 'Por favor ingresar un correo valido.';
                            }
                            // Validar Password.
                            if (!valores.password) {
                                errores.password = 'Por favor ingresar un password.';
                            } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&+])([A-Za-z\d$@$!%*?&+]|[^ ]){8,15}$/.test(valores.password)) {
                                errores.password = 'Por favor ingresar un password valido.';
                            }
                            return errores;
                        }}
                        onSubmit={handleLoginSubmit}
                    >
                        {({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="form-header">
                                    <h1 className="form-title">INICIO SESIÓN</h1>
                                </div>
                                <label htmlFor="correo" className="form-label">Correo electrónico</label>
                                <input
                                    type="email"
                                    id="correo"
                                    className="form-input"
                                    name='correo'
                                    placeholder="Escriba su correo electrónico"
                                    value={values.correo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                {touched.correo && errors.correo && <div style={{color: 'red'}}>{errors.correo}</div>}

                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-input"
                                    name='password'
                                    placeholder="Escriba su contraseña"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                {touched.password && errors.password && <div style={{color: 'red'}}>{errors.password}</div>}
                                <br /><br />
                                <button className="btn-submit" type="submit" disabled={isSubmitting}>Iniciar sesión</button>
                                <br /><br /><br />
                                {/* <p><a href="../HTML/registrarse.html" className="form-label">¿No tiene cuenta? Regístrese acá</a></p> */}
                                <p><a href="../HTML/olvcon.html" className="form-label">¿Olvidó su contraseña?</a></p>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
}

export default IniciarSesion;