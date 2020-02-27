import axios, { AxiosRequestConfig } from 'axios';
import config from '../config';
const { baseURL } = config;
import storage from './storage';
import { TOKEN } from '../constants';
let authInterceptorID: number;

const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authInterceptor = (config: AxiosRequestConfig) => {
  const token: string = storage.loadState(TOKEN);
  config.headers['authorization'] = token;
  return config;
}

/**
 * Sets the authorization header of the request to the JWT token returned by the API
 */
function setAuthHeader(): void {
  authInterceptorID = httpClient.interceptors.request.use(authInterceptor);
}

/**
 * Removes the authorization header of the request
 */
function removeAuthHeader() {
  httpClient.interceptors.request.eject(authInterceptorID);
}

export {
  httpClient,
  setAuthHeader,
  removeAuthHeader,
};