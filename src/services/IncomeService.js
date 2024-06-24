import axios from "axios";

const Url_Income= 'https://vpetsoft1.onrender.com/api/income';

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

    deleteIncome(id) {
        return axios.delete(`${Url_Income}/delete/${id}`);
    }
}

export default new IncomeService();