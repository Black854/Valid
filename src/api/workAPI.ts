import axios from "axios"
import { getCookie } from "../components/common/cookie"

const token = getCookie('token')

const instance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/work/',
    withCredentials: true,
    headers: {"Authorization" : `Bearer ${token}`}
})

export const workAPI = {
    setSuccessTask (objectId: string, objectType: 'equipment' | 'premises' | 'systems' | 'processes') {
        const requestData = {
            objectId,
            objectType
        }
        return instance.post(`successTask.php`, requestData, {}).then (response => {
            return response.data
        })
    },
    setCancelTask (objectId: string, objectType: 'equipment' | 'premises' | 'systems' | 'processes') {
        const requestData = {
            objectId,
            objectType
        }
        return instance.post(`cancelTask.php`, requestData, {}).then (response => {
            return response.data
        })
    },
}