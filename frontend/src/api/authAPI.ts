import unauthorApi from "./baseAPI/unauthorAPI";
import { LoginRequest, RegisterRequest } from "../types/AuthTypes";

const authAPI = {
    login: (credentials: LoginRequest) => unauthorApi.post('/auth/login', credentials).then(response => response.data),
    register: (form: RegisterRequest) => unauthorApi.post('/auth/register', form).then(response => response.data),
    refreshToken: async () => unauthorApi.post('/auth/refresh').then(response => response.data),
    logout: async () => unauthorApi.post('/auth/logout').then(response => response.data),
}

export default authAPI;