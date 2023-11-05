import axios from "axios"

const instance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/common/',
    // withCredentials: true,
    // headers: {"API-KEY": "4f3d39e5-214f-420c-9ab3-f8c322bdb13c"}
})

export const appAPI = {
    getEquipGroups (type: 'active' | 'all') {
        return instance.get(`getEquipGroups.php?type=${type}`).then (response => {
            return response.data
        })
    },
    getPremModes () {
        return instance.get(`getPremModes.php`).then (response => {
            return response.data
        })
    },
    getDepartments () {
        return instance.get(`getDepartments.php`).then (response => {
            return response.data
        })
    },
    getVMPDepartments () {
        return instance.get(`getVMPDepartments.php`).then (response => {
            return response.data
        })
    },
    getSopCodeForm () {
        return instance.get(`getSopCodeForm.php`).then (response => {
            return response.data
        })
    },
}