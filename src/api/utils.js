import axios from 'axios';

//const BASE_URL = 'http://localhost:3000/';
const BASE_URL = 'http://10.0.2.2:3000/';

export const authAPI = axios.create({
  baseURL: BASE_URL + 'api/auth/',
});

export const userAPI = axios.create({
  baseURL: BASE_URL + 'api/users/',
});

export const newsAPI = axios.create({
  baseURL: BASE_URL + 'api/news/',
});

export const eventsAPI = axios.create({
  baseURL: BASE_URL + 'api/events/',
});
