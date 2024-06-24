import axios from "axios";

const Url_city = 'https://vpetsoft.onrender.com/api/city';

class CityService {
    getAllCitys() {
        return axios.get(`${Url_city}/all`);
    }

    getIdCity(id) {
        return axios.get(`${Url_city}/Get/${id}`);
    }

    createCity(cityData) {
        return axios.post(`${Url_city}/create`, cityData);
    }

    updateCity(id, updatedData) {
        return axios.put(`${Url_city}/update/${id}`, updatedData);
    }
}

export default new CityService();