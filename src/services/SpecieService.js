import axios from "axios";

const Url_specie = 'https://vpetsoft1.onrender.com/api/Species';

class SpecieService {
    getAllSpecies() {
        return axios.get(`${Url_specie}/all`);
    }

    getIdSpecie(id) {
        return axios.get(`${Url_specie}/Get/${id}`);
    }

    createSpecie(specieData) {
        return axios.post(`${Url_specie}/create`, specieData);
    }

    updateSpecie(id, updatedData) {
        return axios.put(`${Url_specie}/update/${id}`, updatedData);
    }
}

export default new SpecieService();