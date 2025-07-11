import axios from 'axios';

const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2/", // consome a API
    timeout: 5000, // tempo limite de 5s para retornar algo
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api;