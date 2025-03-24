import axios from 'axios';
import AuthAPI from '../authAPI';

// Create Axios instance
const authorApi = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // Ensures cookies are sent with requests
});

// Request Interceptor
authorApi.interceptors.request.use(config => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor
authorApi.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent infinite loops

            const response = await AuthAPI.refreshToken();
            if (response) return authorApi(originalRequest);
            // If refresh fails, redirect to login
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default authorApi;
