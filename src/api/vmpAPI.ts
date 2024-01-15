import axios from "axios"
import { getCookie } from "../components/common/cookie"

const token = getCookie('token')

const instance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/vmp/',
    withCredentials: true,
    headers: {"Authorization" : `Bearer ${token}`}
})

export const vmpAPI = {
    getVMPData(tablename: string, year: string) {
        return instance.get(`getVMPData.php?tablename=${tablename}&year=${year}`).then(response => {
            return response.data
        })
    },
    getObjectVMPPlansData(objectId: string, sp: string, objectType: 'premises' | 'equipment' | 'systems' | 'processes') {
        const requestData = {
            objectId,
            sp,
            objectType
        }
        return instance.post(`getObjectVMPPlansData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    updateVMPPlansData(daysCount: number, month: number, recordId: string, sp: string, objectId: string, objectType: 'premises' | 'equipment' | 'systems' | 'processes') {
        const requestData = {
            daysCount,
            month,
            recordId,
            sp
        }
        return instance.post(`updateVMPPlansData.php`, requestData, {}).then(response => {
            return response.data ?
                vmpAPI.getObjectVMPPlansData(objectId, sp, objectType).then(response => {
                    return response
                })
            : null
        })
    },
    createVMPPlansData(objectName: string, objectId: string, sp: string, typeval: string, objectType: 'premises' | 'equipment' | 'systems' | 'processes') {
        const requestData = {
            objectName,
            objectId,
            sp,
            typeval,
            objectType
        }
        return instance.post(`createVMPPlansData.php`, requestData, {}).then(response => {
            return response.data ?
                vmpAPI.getObjectVMPPlansData(objectId, sp, objectType).then(response => {
                    return response
                })
            : null
        })
    },
}
