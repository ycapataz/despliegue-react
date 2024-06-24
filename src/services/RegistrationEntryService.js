import axios from "axios";

const Url_entry = 'https://vpetsoft.onrender.com/api/RegistrationEntry';

class RegistrationEntryService {
    getAllEntries() {
        return axios.get(`${Url_entry}/all`);
    }

    getIdEntry(id) {
        return axios.get(`${Url_entry}/Get/${id}`);
    }

    createEntry(registrationEntryData) {
        return axios.post(`${Url_entry}/create`, registrationEntryData);
    }

    updateEntry(id, updatedData) {
        return axios.put(`${Url_entry}/update/${id}`, updatedData);
    }
}

export default new RegistrationEntryService();