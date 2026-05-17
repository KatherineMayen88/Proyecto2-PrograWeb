import axios from 'axios';

const api = axios.create({
    baseURL: 'http://proyecto2-prograweb-backend-env.eba-z2smuvpp.us-east-2.elasticbeanstalk.com/api'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
