import axios from "axios";

const Url_State = 'https://vpetsoft1.onrender.com/api/State';

class StateService {
    getAllStates() {
        return axios.get(`${Url_State}/all`);
    }

    getIdState(id) {
        return axios.get(`${Url_State}/Get/${id}`);
    }

    createState(appointmentData) {
        return axios.post(`${Url_State}/create`, appointmentData);
    }

    updateState(id, updatedData) {
        return axios.put(`${Url_State}/update/${id}`, updatedData);
    }
}

export default new StateService();