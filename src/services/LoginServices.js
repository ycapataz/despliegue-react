import axios from "axios";

const Url_Logint = 'http://localhost:8080/api/employees';

class LoginServices {
    Login(LoginData) {
        return axios.post(`${Url_Logint}/login`, LoginData);
    }
}


export default new LoginServices();