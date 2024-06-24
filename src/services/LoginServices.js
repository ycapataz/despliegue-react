import axios from "axios";

const Url_Logint = 'https://vpetsoft.onrender.com/api/employees';

class LoginServices {
    Login(LoginData) {
        return axios.post(`${Url_Logint}/login`, LoginData);
    }
}


export default new LoginServices();