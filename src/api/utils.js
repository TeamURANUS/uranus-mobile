import {Platform} from 'react-native';
import axios from 'axios';

const DEV_ROUTES = {
  android: 'http://10.0.2.2:3000/',
  ios: 'http://localhost:3000/',
};

const BASE_URL = DEV_ROUTES[Platform.OS];

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

export const notificationAPI = axios.create({
  baseURL: BASE_URL + 'api/notifications/',
});

export const groupAPI = axios.create({
  baseURL: BASE_URL + 'api/groups/',
});

export const groupsAPI = axios.create({
  baseURL: BASE_URL + 'api/groups/',
});

export const postsAPI = axios.create({
  baseURL: BASE_URL + 'api/posts/',
});

export const commentsAPI = axios.create({
  baseURL: BASE_URL + 'api/comments/',
});
