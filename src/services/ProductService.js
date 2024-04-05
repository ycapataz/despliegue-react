import axios from "axios";

const Url_product = 'http://localhost:8080/api/Product';

class ProviderService {
    getAllProducts() {
        return axios.get(`${Url_product}/all`);
    }

    getIdProduct(id) {
        return axios.get(`${Url_product}/Get/${id}`);
    }

    createProduct(productData) {
        return axios.post(`${Url_product}/create`, productData);
    }

    updateProduct(id, updatedData) {
        return axios.put(`${Url_product}/update/${id}`, updatedData);
    }
}

export default new ProviderService();