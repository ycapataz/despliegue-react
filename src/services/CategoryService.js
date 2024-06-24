import axios from "axios";

const Url_category = 'https://vpetsoft.onrender.com/api/categories';

class CateforyService {
    getAllCategories() {
        return axios.get(`${Url_category}/all`);
    }

    getIdCategory(id) {
        return axios.get(`${Url_category}/Get/${id}`);
    }

    createCategory(categoryData) {
        return axios.post(`${Url_category}/create`, categoryData);
    }

    updateCategory(id, updatedData) {
        return axios.put(`${Url_category}/update/${id}`, updatedData);
    }
}

export default new CateforyService();