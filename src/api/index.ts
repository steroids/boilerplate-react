import axios, {AxiosInstance} from 'axios';

import CONFIG from './config';

const http: AxiosInstance = axios.create({
    baseURL: CONFIG.apiUrl,
    headers: {
        apiKey: CONFIG.apiKey,
    },
});

export default http;
