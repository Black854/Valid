import axios from 'axios'
import { getCookie } from '../components/common/cookie'


export const equipInstance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/equip/',
    withCredentials: true,
})

equipInstance.interceptors.request.use((config) => {
    const token = getCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const appInstance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/common/'
})

appInstance.interceptors.request.use((config) => {
    const token = getCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const instInstance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/inst/'
})

instInstance.interceptors.request.use((config) => {
    const token = getCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const plansInstance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/plans/'
})

plansInstance.interceptors.request.use((config) => {
    const token = getCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const sysInstance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/sys/'
})

sysInstance.interceptors.request.use((config) => {
    const token = getCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})
export const procInstance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/proc/'
})

procInstance.interceptors.request.use((config) => {
    const token = getCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const premInstance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/prem/'
})

premInstance.interceptors.request.use((config) => {
    const token = getCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const vmpInstance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/vmp/'
})

vmpInstance.interceptors.request.use((config) => {
    const token = getCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const workInstance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/work/'
})

workInstance.interceptors.request.use((config) => {
    const token = getCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})