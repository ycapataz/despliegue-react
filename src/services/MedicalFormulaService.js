import axios from "axios";

const Url_medicalFormula = 'https://vpetsoft1.onrender.com/api/medicalFormula';

class MedicalFormulaService {
    getAllMedicalFormula() {
        return axios.get(`${Url_medicalFormula}/all`);
    }

    getIdMedicalFormula(id) {
        return axios.get(`${Url_medicalFormula}/Get/${id}`);
    }

    createMedicalFormula(medicalFormulaData) {
        return axios.post(`${Url_medicalFormula}/create`, medicalFormulaData);
    }

    updateMedicalFormula(id, updatedData) {
        return axios.put(`${Url_medicalFormula}/update/${id}`, updatedData);
    }
}

export default new MedicalFormulaService();