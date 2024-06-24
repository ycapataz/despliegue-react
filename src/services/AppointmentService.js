import axios from "axios";

const Url_appointment = 'https://vpetsoft1.onrender.com/api/Appointment';

class AppointmentService {
    getAllAppointments() {
        return axios.get(`${Url_appointment}/all`);
    }

    getIdAppointment(id) {
        return axios.get(`${Url_appointment}/Get/${id}`);
    }

    createAppointment(appointmentData) {
        return axios.post(`${Url_appointment}/create`, appointmentData);
    }

    updateAppointment(id, updatedData) {
        return axios.put(`${Url_appointment}/update/${id}`, updatedData);
    }
    
    deleteAppointment(id) {
        return axios.delete(`${Url_appointment}/delete/${id}`);
    }
}

export default new AppointmentService();