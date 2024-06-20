import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ClinicalRecordService from '../services/ClinicalRecordService';
import { Modal, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Formik, Field, Form as FormikForm } from 'formik';
import * as Yup from 'yup';

const ReporteExcel = ({ modalIsOpen, closeModal }) => {
    const [dni, setDni] = useState('');
    const [clinicalRecords, setClinicalRecords] = useState([]);
    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        const fetchClinicalRecords = async () => {
            try {
                const response = await ClinicalRecordService.getAllClinicalRecords();
                setClinicalRecords(response.data || []);
            } catch (error) {
                console.error('Error al obtener los registros clínicos:', error);
                setClinicalRecords([]);
            }
        };

        fetchClinicalRecords();
    }, []);

    const handleInputChange = (event) => {
        setDni(event.target.value);
    };

    const exportToExcel = () => {
        // Validar que se haya ingresado un DNI
        if (!dni) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Por favor, ingrese un N° de cedula antes de exportar el Excel.'
            });
            return;
        }
        // Mostrar mensaje de espera
        Swal.fire({
            icon: 'success',
            title: 'Descargando',
            text: 'El Excel se descargado esperar un momento.'
        });

        // Filtrar los registros clínicos por el DNI ingresado
        const filteredData = clinicalRecords.filter(record => {
            console.log('Revisando registro:', record);
            console.log('Comparando:', record.idmascota?.idcliente?.dni, 'con', dni);
            return record.idmascota?.idcliente?.dni === dni;
        });


        // Mostrar una alerta si no se encuentra ningún registro con el DNI ingresado
        if (filteredData.length === 0) {
            setExporting(false); // Ocultar mensaje de espera
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'No se encontraron registros con el DNI ingresado.'
            });
            return;
        }

        // Modificar los nombres de los encabezados y asignar las propiedades correctas
        const wsData = filteredData.map(record => ({
            'ID': record.id,
            'Frecuencia cardíaca': record.heart_rate,
            'Temperatura': record.temperature,
            'Fecha Registro Clínico': record.clinical_Record_Data,
            'Observaciones': record.observations,
            'Fecha Ingreso': record.idingreso.date,
            'Creado por': record.idempleado.name,
            'Examen': record.idexamenmedico.exam,
            'Propietario de la Mascota': record.idmascota.idcliente.dni,
            'Mascotas': record.idmascota.name,
            'Enfermedad': record.idenfermedad.name
        }));

        // Crear una hoja de cálculo con los datos filtrados y los nuevos nombres de columnas
        const ws = XLSX.utils.json_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Reporte");

        // Generar el archivo Excel y guardarlo
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
        const buf = new ArrayBuffer(wbout.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < wbout.length; ++i) {
            view[i] = wbout.charCodeAt(i) & 0xFF;
        }
        const blob = new Blob([buf], { type: "application/octet-stream" });
        saveAs(blob, 'reporte.xlsx');
        // Ocultar mensaje de espera después de la descarga
        setExporting(false);
    };

    const validationSchema = Yup.object().shape({
        dni: Yup.string()
            .matches(/^((\d{8})|(\d{10})|(\d{11})|(\d{6}))?$/, 'Por favor ingrese un DNI válido.')
            .required('El DNI es requerido.')
    });

    return (
        <div>
            <Modal show={modalIsOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Generar Reporte Excel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ dni: '' }}
                        validationSchema={validationSchema}
                        onSubmit={exportToExcel}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicDNI">
                                    <Form.Label>N° cedula CLIENTE</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="dni"
                                        value={values.dni}
                                        onChange={(event) => {
                                            // Llamar a handleInputChange para actualizar el estado del componente
                                            handleInputChange(event);
                                            // Llamar a handleChange proporcionado por Formik para que Formik pueda rastrear los cambios en los valores del formulario
                                            handleChange(event);
                                        }}
                                        onBlur={handleBlur}
                                        isInvalid={touched.dni && !!errors.dni}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.dni}</Form.Control.Feedback>
                                </Form.Group>
                                <br></br>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={closeModal}>Cancelar</Button>
                                    <Button variant="primary" type="submit" style={{ background: '#56208c', borderColor: 'transparent' }}>Exportar a Excel</Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ReporteExcel;