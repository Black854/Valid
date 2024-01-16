import { workInstance } from "./instance"

export const workAPI = {
    setSuccessTask (objectId: string, objectType: 'equipment' | 'premises' | 'systems' | 'processes') {
        const requestData = {
            objectId,
            objectType
        }
        return workInstance.post(`successTask.php`, requestData, {}).then (response => {
            return response.data
        })
    },
    setCancelTask (objectId: string, objectType: 'equipment' | 'premises' | 'systems' | 'processes') {
        const requestData = {
            objectId,
            objectType
        }
        return workInstance.post(`cancelTask.php`, requestData, {}).then (response => {
            return response.data
        })
    },
}