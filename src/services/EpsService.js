import axios from "axios";

const Url_eps = 'https://vpetsoft.onrender.com/api/eps';

class EpsService {
    getAllEps() {
        return axios.get(`${Url_eps}/all`);
    }

    getIdEps(id) {
        return axios.get(`${Url_eps}/Get/${id}`);
    }

    createEps(epsData) {
        return axios.post(`${Url_eps}/create`, epsData);
    }

    updateEps(id, updatedData) {
        return axios.put(`${Url_eps}/update/${id}`, updatedData);
    }
}

export default new EpsService();