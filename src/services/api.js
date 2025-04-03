import axios from 'axios';

//pasta de serviços para conexão do backend com o front pelo axios-
// criando a conexiao do axios com create para a baseUrl da api
export const api = axios.create({
    baseURL: 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    config.headers.authorization = `Bearer ${token}`;

    return config;
})