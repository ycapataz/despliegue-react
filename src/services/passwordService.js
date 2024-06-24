import axios from 'axios';

const API_URL = 'http://localhost:8080/api/password';

const sendResetEmail = (email) => {
    return axios.post(`${API_URL}/reset-request`, null, {
        params: { email }
    });
};

const resetPassword = (token, newPassword) => {
    return axios.post(`${API_URL}/reset`, null, {
        params: { token, newPassword }
    });
};

export default {
    sendResetEmail,
    resetPassword
};
