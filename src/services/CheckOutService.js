import axios from "axios";

const Url_checkOut = 'http://localhost:8080/api/checkouts';

class CheckOutService {
    getAllOuts() {
        return axios.get(`${Url_checkOut}/all`);
    }

    getIdOut(id) {
        return axios.get(`${Url_checkOut}/Get/${id}`);
    }

    createOut(checkOutData) {
        return axios.post(`${Url_checkOut}/create`, checkOutData);
    }

    updateOut(id, updatedData) {
        return axios.put(`${Url_checkOut}/update/${id}`, updatedData);
    }
}

export default new CheckOutService();