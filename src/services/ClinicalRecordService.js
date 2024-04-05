import axios from "axios";

const Url_clinicalrecords = 'http://localhost:8080/api/clinicalrecords';

class ClinicalRecordService {
    getAllClinicalRecords() {
        return axios.get(`${Url_clinicalrecords}/all`);
    }

    getIdClinicalRecord(id) {
        return axios.get(`${Url_clinicalrecords}/Get/${id}`);
    }

    createClinicalRecord(clinicalRecordData) {
        return axios.post(`${Url_clinicalrecords}/create`, clinicalRecordData);
    }

    updateClinicalRecord(id, updatedData) {
        return axios.put(`${Url_clinicalrecords}/update/${id}`, updatedData);
    }
}

export default new ClinicalRecordService();