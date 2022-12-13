import axios from 'axios';

const baseURL = 'http://localhost:4000/api/user';


class UserService {
    generate_qr() {
        return axios.get(`${baseURL}/generate_qr`);
    }

    register(name: string, surname: string, email: string, password: string, secret: string) {
        return axios.post(`${baseURL}/register`, {name: name, surname: surname, email: email, password: password, secret: secret});
    }

    check_email(email: string) {
        return axios.post(`${baseURL}/check_email`, {email: email});
    }

    check_otp(secret: string, otp: number) {
        return axios.post(`${baseURL}/check_otp`, {secret: secret, otp: otp});
    }

    login(email: string, password: string, otp: number) {
        return axios.post(`${baseURL}/login`, {email: email, password: password, otp: otp});
    }

    async check_jwt(token: string) {
        return await axios.post(`${baseURL}/check_jwt`, {token: token});
    }
}


export default new UserService();