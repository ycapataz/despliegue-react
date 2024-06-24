import axios from "axios";

const Url_provider = 'https://vpetsoft.onrender.com/api/Provider';

class ProviderService {
    getAllProviders() {
        return axios.get(`${Url_provider}/all`);
    }

    getIdProvider(id) {
        return axios.get(`${Url_provider}/Get/${id}`);
    }

    createProvider(providerData) {
        return axios.post(`${Url_provider}/create`, providerData);
    }

    updateProvider(id, updatedData) {
        return axios.put(`${Url_provider}/update/${id}`, updatedData);
    }
}

export default new ProviderService();