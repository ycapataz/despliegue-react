import axios from "axios";

const Url_Diseases= 'http://localhost:8080/api/diseases';

class DiseasesService {
    getAllDiseases() {
        return axios.get(`${Url_Diseases}/all`);
    }

    getIdDiseases(id) {
        return axios.get(`${Url_Diseases}/Get/${id}`);
    }

    createDiseases(DiseasesData) {
        return axios.post(`${Url_Diseases}/create`, DiseasesData);
    }

    updateDiseases(id, updatedData) {
        return axios.put(`${Url_Diseases}/update/${id}`, updatedData);
    }
}

export default new DiseasesService();