import unauthorApi from "./baseAPI/unauthorAPI";
import { LoginRequest, RegisterRequest } from "../types/AuthTypes";

const authAPI = {
    login: (credentials: LoginRequest) => unauthorApi.post('/auth/login', credentials).then(response => response.data),
    register: (form: RegisterRequest) => unauthorApi.post('/auth/register', form).then(response => response.data),
    refreshToken: async (refreshToken: string) => unauthorApi.post('/auth/refresh', { refreshToken }).then(response => response.data),
}

export default authAPI;