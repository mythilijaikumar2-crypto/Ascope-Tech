import axios from 'axios';

// Create an instance of Axios with a base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL}/api`
        : (import.meta.env.DEV ? 'http://localhost:5004/api' : '/api'),
    timeout: 10000, // Increased to 10s to allow proper database warmup if needed
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor to automatically add JWT token to request headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('user_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
