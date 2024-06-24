import axios from "axios";

const Url_specialty = 'https://vpetsoft.onrender.com/api/Specialty';

class SpecialtyService {
    getAllSpecialtys() {
        return axios.get(`${Url_specialty}/all`);
    }

    getIdSpecialty(id) {
        return axios.get(`${Url_specialty}/Get/${id}`);
    }

    createSpecialty(specialtyData) {
        return axios.post(`${Url_specialty}/create`, specialtyData);
    }

    updateSpecialty(id, updatedData) {
        return axios.put(`${Url_specialty}/update/${id}`, updatedData);
    }
}

export default new SpecialtyService();