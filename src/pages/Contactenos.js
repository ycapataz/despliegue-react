import React, { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import emailjs from 'emailjs-com';
import Menu from '../components/Menu';
import '../assets/css/contactenos.css';
import Swal from 'sweetalert2'; 

function Contactenos() {
  const form = useRef();

  const sendEmail = (values, actions) => {
    
      emailjs
        .send('service_q2okorn', 'template_2rje43f', values, 'YCT3CKFIxh7es5zL5')
        .then(
          (result) => {
            Swal.fire({
              icon: 'success',
              title: 'CORREO ENVIADO CON ÉXITO',
              text: 'Recuerde que nos estaremos comunicando con usted en un plazo de 24 horas.'
          });
            console.log('SUCCESS!', result.status, result.text);
            actions.resetForm();
          },
          (error) => {
            alert('Error enviando el correo');
            console.error('FAILED...', error);
          }
        );
  };

  const validationSchema = Yup.object({
    user_name: Yup.string()
      .matches(/^[a-zA-ZñÑ]+(?:\s[a-zA-ZñÑ]+){0,2}$/, 'Esto no es un nombre.')
      .min(3, 'Debe tener al menos 3 caracteres')
      .max(25, 'Exceso de caracteres, esto no parece un nombre.')
      .required('Campo requerido'),
    user_lastname: Yup.string()
      .matches(/^[a-zA-ZñÑ]+(?:\s[a-zA-ZñÑ]+){0,2}$/, 'Esto no es un apellido.')
      .min(3, 'Debe tener al menos 3 caracteres')
      .max(25, 'Exceso de caracteres, esto no parece un nombre.')
      .required('Campo requerido'),
    user_email: Yup.string()
      .matches(/^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|misena|soy\.sena)+\.(co|com|edu\.co|edu\.com)$/, 'Por favor ingresar un correo válido')
      .required('Campo requerido'),
    user_telefono: Yup.string()
      .matches(/^(310|311|312|313|314|321|320|322|323|315|316|317|318|319|350|351|300|301|302|324|304)[0-9]{7}$/, 'Ingresar un numero valido.')
      .required('Campo requerido'),
    from_name: Yup.string()
      .notOneOf(['Seleccionar'], 'Debe seleccionar un tipo de solicitud')
      .required('Campo requerido'),
    message: Yup.string()
      .test('at-least-two-words', 'Ingresar una descripción valida ', value => {
        if (!value) return false;
        const words = value.split(/\s+/).filter(word => word.trim() !== '');
        return words.length >= 2;
      })
      .required('Campo requerido'),
      
    aceptar_datos_personales: Yup.boolean()
      .oneOf([true], 'Debe aceptar el tratamiento de datos personales.')
      .required('Campo requerido')
  });

  return (
    <>
      <Menu />
      <div className='max_conten'>
        <br /><br />
        <div className="contenedor">
          <Formik
            initialValues={{
              user_name: '',
              user_lastname: '',
              user_email: '',
              user_telefono: '',
              from_name:'',
              message: '',
              aceptar_datos_personales: false,
            }}
            validationSchema={validationSchema}
            onSubmit={sendEmail}
          >
            {({ isSubmitting }) => (
              <Form className="form">
                <div className="form-header">
                  <h1 className="form-title">PQR VPETSOFT</h1>
                </div>
                <label htmlFor="nombre" className="form-label">Nombres</label>
                <Field type="text" id="nombre" name="user_name" className="form-input" placeholder="Escriba sus nombres" />
                <ErrorMessage name="user_name" component="div" className="error-message" />

                <label htmlFor="apellido" className="form-label">Apellidos</label>
                <Field type="text" id="apellido" name="user_lastname" className="form-input" placeholder="Escriba sus apellidos" />
                <ErrorMessage name="user_lastname" component="div" className="error-message" />

                <label htmlFor="correo" className="form-label">Correo</label>
                <Field type="email" id="correo" name="user_email" className="form-input" placeholder="Escriba su correo electrónico" />
                <ErrorMessage name="user_email" component="div" className="error-message" />

                <label htmlFor="telefono" className="form-label">Teléfono</label>
                <Field type="text" id="telefono" name="user_telefono" className="form-input" placeholder="Escriba su número telefónico" />
                <ErrorMessage name="user_telefono" component="div" className="error-message" />

                <label htmlFor="tipo" className="form-label">Tipo Solicitud</label>
                <Field as="select" className="lista" name="from_name">
                  <option value="">Seleccionar</option>
                  <option value="Queja">Queja</option>
                  <option value="Solicitud">Solicitud</option>
                  <option value="Reclamo">Reclamo</option>
                  <option value="Sugerencia">Sugerencia</option>
                </Field>
                <ErrorMessage name="from_name" component="div" className="error-message" />
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <Field as="textarea" id="descripcion" name="message" className="form-textarea" placeholder="Escriba la descripción del PQR" />
                <ErrorMessage name="message" component="div" className="error-message" />
                <br></br>
                <div className="checkbox-container">
                  <Field type="checkbox" id="aceptar_datos_personales" name="aceptar_datos_personales" className="checkbox-input" />
                  <label htmlFor="aceptar_datos_personales" className="checkbox-label">Acepto el tratamiento de mis datos personales</label>
                  <ErrorMessage name="aceptar_datos_personales" component="div" className="error-message" />
                </div>
                <br></br>
                <button type="submit" className="btn-submit" disabled={isSubmitting}>Enviar</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Contactenos;