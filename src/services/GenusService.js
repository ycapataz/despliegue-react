import axios from "axios";

const Url_genus = 'https://vpetsoft.onrender.com/api/PetGenus';

class GenusService {
    getAllGenus() {
        return axios.get(`${Url_genus}/all`);
    }

    getIdGenus(id) {
        return axios.get(`${Url_genus}/Get/${id}`);
    }

    createGenus(genusData) {
        return axios.post(`${Url_genus}/create`, genusData);
    }

    updateGenus(id, updatedData) {
        return axios.put(`${Url_genus}/update/${id}`, updatedData);
    }
}

export default new GenusService();