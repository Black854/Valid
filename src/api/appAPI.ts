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
    getCodeSettings() {
        return instance.get(`getCodeSettings.php`).then(response => {
            return response.data
        })
    },
    setDepartmentsData(id: string, name2?: string, pos?: string, fio?: string, stat?: string) {
        const requestData = name2 ? { id, name2 } :
            pos ? { id, pos } :
                fio ? { id, fio } :
                    { id, stat }
        return instance.post(`setDepartmentsData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    setVMPDepartmentsData(id: string, vmpname1?: string, vmpname2?: string, code?: string, code2?: string, isactive?: string, menuname?: string) {
        const requestData = vmpname1 ? { id, vmpname1 } :
            vmpname2 ? { id, vmpname2 } :
                code ? { id, code } :
                code2 ? { id, code2 } :
                menuname ? { id, menuname } :
                    { id, isactive }
        return instance.post(`setVMPDepartmentsData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
}