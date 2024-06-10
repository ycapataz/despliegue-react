import axios from "axios";

const Url_Income= 'http://localhost:8080/api/income';

class IncomeService {
    getAllIncomes() {
        return axios.get(`${Url_Income}/all`);
    }

    getIdIncomes(id) {
        return axios.get(`${Url_Income}/Get/${id}`);
    }

    createIncomes(IncomeData) {
        return axios.post(`${Url_Income}/create`, IncomeData);
    }

    updateIncomes(id, updatedData) {
        return axios.put(`${Url_Income}/update/${id}`, updatedData);
    }
}

export default new IncomeService();