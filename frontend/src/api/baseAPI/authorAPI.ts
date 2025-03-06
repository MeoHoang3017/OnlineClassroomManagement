import axios from 'axios';

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
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized! Redirecting to login...');
            window.location.href = '/login'; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default authorApi;
