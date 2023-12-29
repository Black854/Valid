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
        const requestData = name2 !== undefined && name2 !== null ? { id, name2 } :
            pos !== undefined && pos !== null ? { id, pos } :
                fio !== undefined && fio !== null ? { id, fio } :
                    { id, stat }
        return instance.post(`setDepartmentsData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    setVMPDepartmentsData(id: string, vmpname1?: string, vmpname2?: string, code?: string, code2?: string, isactive?: string, menuname?: string) {
        const requestData = vmpname1 !== undefined && vmpname1 !== null ? { id, vmpname1 } :
            vmpname2 !== undefined && vmpname2 !== null ? { id, vmpname2 } :
                code !== undefined && code !== null ? { id, code } :
                    code2 !== undefined && code2 !== null ? { id, code2 } :
                        menuname !== undefined && menuname !== null ? { id, menuname } :
                            { id, isactive }
        return instance.post(`setVMPDepartmentsData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    setCodeFormsData(id: string, codeform: string) {
        const requestData = {
            id,
            codeform
        }
        return instance.post(`setCodeSettings.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    setPremModesData(id: string, type?: string, low?: string, hight?: string, isactive?: string) {
        const requestData = type !== undefined && type !== null ? { id, type } :
            low !== undefined && low !== null ? { id, low } :
                hight !== undefined && hight !== null ? { id, hight } :
                    { id, isactive }
        return instance.post(`setPremModes.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    setEquipGroupsData(id: string, name?: string, isactive?: string) {
        const requestData = name !== undefined && name !== null ? { id, name } : { id, isactive }
        return instance.post(`setEquipGroups.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    createNewDepartment(name: string, name2: string, pos: string, fio: string, stat: string) {
        const requestData = {
            name,
            name2,
            pos,
            fio,
            stat
        }
        return instance.post(`createNewDepartment.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    createNewVMPDepartment(vmpname1: string, vmpname2: string, menuname: string, code: string, code2: string, datevmp: string, isactive: string) {
        const requestData = {
            vmpname1,
            vmpname2,
            menuname,
            code,
            code2,
            datevmp,
            isactive
        }
        return instance.post(`createNewVMPDepartment.php`, requestData, {}).then(response => {
            return response.data
        })
    },
}