import axios from 'axios';

const API_URL = 'https://vpetsoft1.onrender.com/api/password';

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
