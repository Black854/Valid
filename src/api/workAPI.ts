import axios from "axios"

const instance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/work/',
    // withCredentials: true,
    // headers: {"API-KEY": "4f3d39e5-214f-420c-9ab3-f8c322bdb13c"}
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