import React from 'react';
import '../assets/css/contactenos.css';
import Menu from '../components/Menu';
import { Formik } from 'formik';

function IniciarSesion() {
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
                            //Valida correo
                            if (!valores.correo) {
                                errores.correo = 'Por favor ingresar un correo.'
                            }else if(!/^[a-zA-Z0-9._-]+@(gmail|hotmail|outlook|misena|soy.sena)+\.(co|com|edu.co|edu.com)$/.test(valores.correo)){
                                errores.correo = 'Por favor ingressar un correo valido.'
                            }
                            //Validar Password
                            if (!valores.password) {
                                errores.password = 'Por favor ingresar un password.'
                            }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&+])([A-Za-z\d$@$!%*?&+]|[^ ]){8,15}$/.test(valores.password)){
                                errores.password = 'Por favor ingressar un password valido.'
                            }
                            return errores;
                        }}
                        onSubmit={(valores) => {
                            console.log('Fomulario enviado');
                        }}
                    >
                        {({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="form-header">
                                    <h1 className="form-title">INICIO SESION</h1>
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
                                <p><a href="../HTML/registrarse.html" className="form-label">¿No tiene cuenta? Regístrese acá</a></p>
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