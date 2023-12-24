import axios from "axios"

const instance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/common/',
    // withCredentials: true,
    // headers: {"API-KEY": "4f3d39e5-214f-420c-9ab3-f8c322bdb13c"}
})

export const appAPI = {
    getEquipGroups(type: 'active' | 'all') {
        return instance.get(`getEquipGroups.php?type=${type}`).then(response => {
            return response.data
        })
    },
    getPremModes() {
        return instance.get(`getPremModes.php`).then(response => {
            return response.data
        })
    },
    getDepartments() {
        return instance.get(`getDepartments.php`).then(response => {
            return response.data
        })
    },
    getVMPDepartments() {
        return instance.get(`getVMPDepartments.php`).then(response => {
            return response.data
        })
    },
    getSopCodeForm() {
        return instance.get(`getSopCodeForm.php`).then(response => {
            return response.data
        })
    },
    getAllValidators() {
        return instance.get(`getAllValidators.php`).then(response => {
            return response.data
        })
    },
    getVacationsData() {
        return instance.get(`getVacationsData.php`).then(response => {
            return response.data
        })
    },
    setVacationsData(fio: string, dates: string, month: string) {
        const requestData = {
            fio,
            dates,
            month
        }
        return instance.post(`setVacationsData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    deleteVacationsData(fio: string, month: string) {
        const requestData = {
            fio,
            month
        }
        return instance.post(`deleteVacationsData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    getPainterData() {
        return instance.get(`getPainterData.php`).then(response => {
            return response.data
        })
    },
    setPainterData(data: any) {
        const requestData = {
            data
        }
        return instance.post(`setPainterData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
}