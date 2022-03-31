import axios from 'axios';

const BASE_URL = 'http://localhost:3000/';

export const authAPI = axios.create({
  baseURL: BASE_URL + 'api/auth/',
});

export const userAPI = axios.create({
  baseURL: BASE_URL + 'api/users/',
});

export const newsAPI = axios.create({
  baseURL: BASE_URL + 'api/news/',
});
