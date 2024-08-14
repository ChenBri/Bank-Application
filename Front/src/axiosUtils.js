import axios from 'axios';

let api = axios.create({ baseURL: 'http://127.0.0.1:3500/api', withCredentials: true });

export default api;