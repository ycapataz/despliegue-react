import axios from "axios";

const Url_breed = 'http://localhost:8080/api/breeds';

class BreedService {
    getAllBreeds() {
        return axios.get(`${Url_breed}/all`);
    }

    getIdBreed(id) {
        return axios.get(`${Url_breed}/Get/${id}`);
    }

    createBreed(breedData) {
        return axios.post(`${Url_breed}/create`, breedData);
    }

    updateBreed(id, updatedData) {
        return axios.put(`${Url_breed}/update/${id}`, updatedData);
    }
}

export default new BreedService();