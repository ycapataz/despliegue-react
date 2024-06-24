import axios from "axios";

const Url_Logint = 'https://vpetsoft1.onrender.com/api/employees';

class LoginServices {
    Login(LoginData) {
        return axios.post(`${Url_Logint}/login`, LoginData);
    }
}


export default new LoginServices();