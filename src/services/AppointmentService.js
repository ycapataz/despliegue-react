import axios from "axios";

const Url_appointment = 'http://localhost:8080/api/Appointment';

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
}

export default new AppointmentService();