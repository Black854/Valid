import { vmpInstance } from "./instance"

export const vmpAPI = {
    getVMPData(tablename: string, year: string) {
        return vmpInstance.get(`getVMPData.php?tablename=${tablename}&year=${year}`).then(response => {
            return response.data
        })
    },
    getObjectVMPPlansData(objectId: string, sp: string, objectType: 'premises' | 'equipment' | 'systems' | 'processes') {
        const requestData = {
            objectId,
            sp,
            objectType
        }
        return vmpInstance.post(`getObjectVMPPlansData.php`, requestData, {}).then(response => {
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
        return vmpInstance.post(`updateVMPPlansData.php`, requestData, {}).then(response => {
            return response.data
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
        return vmpInstance.post(`createVMPPlansData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
}
