import axios from "axios";

const Url_product = 'https://vpetsoft1.onrender.com/api/Product';

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