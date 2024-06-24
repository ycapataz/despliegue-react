import axios from "axios";

const Url_customer = 'https://vpetsoft.onrender.com/api/Customers';

class CustomerService {
    getAllCustomers() {
        return axios.get(`${Url_customer}/all`);
    }

    getIdCustomer(id) {
        return axios.get(`${Url_customer}/Get/${id}`);
    }

    createCustomer(customerData) {
        return axios.post(`${Url_customer}/create`, customerData);
    }

    updateCustomer(id, updatedData) {
        return axios.put(`${Url_customer}/update/${id}`, updatedData);
    }
}

export default new CustomerService();