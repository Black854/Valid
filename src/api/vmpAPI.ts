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
    getObjectNextYearVMPPlansData(objectId: string, sp: string, objectType: 'premises' | 'equipment' | 'systems' | 'processes') {
        const requestData = {
            objectId,
            sp,
            objectType
        }
        return vmpInstance.post(`getObjectNextYearVMPPlansData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    updateVMPPlansData(daysCount: number, month: number, recordId: string, sp: string, objectName: string) {
        const requestData = {
            daysCount,
            month,
            recordId,
            sp,
            objectName
        }
        return vmpInstance.post(`updateVMPPlansData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    updateVMPPlansNextYearData(daysCount: number, month: number, recordId: string, sp: string, objectName: string) {
        const requestData = {
            daysCount,
            month,
            recordId,
            sp,
            objectName
        }
        return vmpInstance.post(`updateVMPPlansNextYearData.php`, requestData, {}).then(response => {
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
    createNextYearVMPPlansData(objectName: string, objectId: string, sp: string, typeval: string, objectType: 'premises' | 'equipment' | 'systems' | 'processes') {
        const requestData = {
            objectName,
            objectId,
            sp,
            typeval,
            objectType
        }
        return vmpInstance.post(`createNextYearVMPPlansData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    getVMPChangeList(vmpId: string, vmpYear: string) {
        const requestData = {
            vmpId,
            vmpYear
        }
        return vmpInstance.post(`getVMPChangeList.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    updateChangeListData(id: string, text: string, type: string) {
        const requestData = {
            id,
            text,
            type
        }
        return vmpInstance.post(`updateChangeListData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    startAutoCreateGraph(tablename: string, year: string) {
        const requestData = {
            tablename,
            year,
        }
        return vmpInstance.post(`startAutoCreateGraph.php`, requestData, {}).then(response => {
            return response.data
        })
    },
}
