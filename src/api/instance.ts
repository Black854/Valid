import axios from 'axios'
import { getCookie } from '../components/common/cookie'

// https://validcontrol.ru для глобальной версии
// http://is.kphk.kz:81/ov/ для рабочей версии ОВ
// http://10.85.10.212/ov для разработки

const server = 'http://10.85.10.212/ov'; // прописать домен сайта

export const authInstance = axios.create({
    baseURL: server + '/api/auth/'
})

export const equipInstance = axios.create({
    baseURL: server + '/api/equip/'
})

equipInstance.interceptors.request.use((config) => {
    const token = getCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const appInstance = axios.create({
    baseURL: server + '/api/common/'
})

appInstance.interceptors.request.use((config) => {
    const token = getCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const instInstance = axios.create({
    baseURL: server + '/api/inst/'
})

instInstance.interceptors.request.use((config) => {
    const token = getCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const plansInstance = axios.create({
    baseURL: server + '/api/plans/'
})

plansInstance.interceptors.request.use((config) => {
    const token = getCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const sysInstance = axios.create({
    baseURL: server + '/api/sys/'
})

sysInstance.interceptors.request.use((config) => {
    const token = getCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})
export const procInstance = axios.create({
    baseURL: server + '/api/proc/'
})

procInstance.interceptors.request.use((config) => {
    const token = getCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const premInstance = axios.create({
    baseURL: server + '/api/prem/'
})

premInstance.interceptors.request.use((config) => {
    const token = getCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const vmpInstance = axios.create({
    baseURL: server + '/api/vmp/'
})

vmpInstance.interceptors.request.use((config) => {
    const token = getCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const workInstance = axios.create({
    baseURL: server + '/api/work/'
})

workInstance.interceptors.request.use((config) => {
    const token = getCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})