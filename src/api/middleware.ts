import axios from 'axios'
import { getCookie } from '../components/common/cookie'

export const equipInstance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/equip/',
    withCredentials: true,
})

equipInstance.interceptors.request.use((config) => {
    //   const token = store.getState().auth.token;
    const token = getCookie('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})