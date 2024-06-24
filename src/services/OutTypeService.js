import axios from "axios";

const Url_outType = 'https://vpetsoft1.onrender.com/api/outptType';

class OutTypeService {
    getAllOutTypes() {
        return axios.get(`${Url_outType}/all`);
    }

    getIdOutType(id) {
        return axios.get(`${Url_outType}/Get/${id}`);
    }

    createOutType(outTypeData) {
        return axios.post(`${Url_outType}/create`, outTypeData);
    }

    updateOutType(id, updatedData) {
        return axios.put(`${Url_outType}/update/${id}`, updatedData);
    }
}

export default new OutTypeService();