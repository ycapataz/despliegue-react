import axios from "axios";

const Url_MedicalExam= 'https://vpetsoft1.onrender.com/api/medicalExam';

class MedicalExamService {
    getAllMedicalExams() {
        return axios.get(`${Url_MedicalExam}/all`);
    }

    getIdMedicalExam(id) {
        return axios.get(`${Url_MedicalExam}/Get/${id}`);
    }

    createMedicalExam(medicalExamData) {
        return axios.post(`${Url_MedicalExam}/create`, medicalExamData);
    }

    updateMedicalExam(id, updatedData) {
        return axios.put(`${Url_MedicalExam}/update/${id}`, updatedData);
    }
}

export default new MedicalExamService();