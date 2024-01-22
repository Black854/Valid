import { appInstance } from "./instance"

export const appAPI = {
    getEquipGroups(type: 'active' | 'all') {
        return appInstance.get(`getEquipGroups.php?type=${type}`).then(response => {
            return response.data
        })
    },
    getPremModes() {
        return appInstance.get(`getPremModes.php`).then(response => {
            return response.data
        })
    },
    getDepartments() {
        return appInstance.get(`getDepartments.php`).then(response => {
            return response.data
        })
    },
    getVMPDepartments() {
        return appInstance.get(`getVMPDepartments.php`).then(response => {
            return response.data
        })
    },
    getSopCodeForm() {
        return appInstance.get(`getSopCodeForm.php`).then(response => {
            return response.data
        })
    },
    getAllValidators() {
        return appInstance.get(`getAllValidators.php`).then(response => {
            return response.data
        })
    },
    getVacationsData() {
        return appInstance.get(`getVacationsData.php`).then(response => {
            return response.data
        })
    },
    setVacationsData(fio: string, dates: string, month: string) {
        const requestData = {
            fio,
            dates,
            month
        }
        return appInstance.post(`setVacationsData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    deleteVacationsData(fio: string, month: string) {
        const requestData = {
            fio,
            month
        }
        return appInstance.post(`deleteVacationsData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    getPainterData() {
        return appInstance.get(`getPainterData.php`).then(response => {
            return response.data
        })
    },
    setPainterData(data: any) {
        const requestData = {
            data
        }
        return appInstance.post(`setPainterData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    getCodeSettings() {
        return appInstance.get(`getCodeSettings.php`).then(response => {
            return response.data
        })
    },
    setDepartmentsData(id: string, name2?: string, pos?: string, fio?: string, stat?: string) {
        const requestData = name2 !== undefined && name2 !== null ? { id, name2 } :
            pos !== undefined && pos !== null ? { id, pos } :
                fio !== undefined && fio !== null ? { id, fio } :
                    { id, stat }
        return appInstance.post(`setDepartmentsData.php`, requestData, {}).then(response => {
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
        return appInstance.post(`setVMPDepartmentsData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    setCodeFormsData(id: string, codeform: string) {
        const requestData = {
            id,
            codeform
        }
        return appInstance.post(`setCodeSettings.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    setPremModesData(id: string, type?: string, low?: string, hight?: string, isactive?: string) {
        const requestData = type !== undefined && type !== null ? { id, type } :
            low !== undefined && low !== null ? { id, low } :
                hight !== undefined && hight !== null ? { id, hight } :
                    { id, isactive }
        return appInstance.post(`setPremModes.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    setEquipGroupsData(id: string, name?: string, isactive?: string) {
        const requestData = name !== undefined && name !== null ? { id, name } : { id, isactive }
        return appInstance.post(`setEquipGroups.php`, requestData, {}).then(response => {
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
        return appInstance.post(`createNewDepartment.php`, requestData, {}).then(response => {
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
        return appInstance.post(`createNewVMPDepartment.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    createNewEquipGroup(name: string, isactive: string) {
        const requestData = {
            name,
            isactive
        }
        return appInstance.post(`createNewEquipGroup.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    createNewPremMode(type: string, low: string, hight: string, isactive: string) {
        const requestData = {
            type,
            low,
            hight,
            isactive
        }
        return appInstance.post(`createNewPremMode.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    setVMPConsumers(id: string, data: string[]) {
        const requestData = {
            id,
            data
        }
        return appInstance.post(`setVMPConsumers.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    getMonthPlanObjectData(id: string, objectType: 'equipment' | 'premises' | 'systems' | 'processes', month: string) {
        const requestData = {
            id,
            objectType,
            month
        }
        return appInstance.post(`getMonthPlanObjectData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    createObjectInMonthPlane(id: string, objectType: 'equipment' | 'premises' | 'systems' | 'processes', month: string) {
        const requestData = {
            id,
            objectType,
            month
        }
        return appInstance.post(`createObjectInMonthPlane.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    addReestrData(id: string, objectType: 'equipment' | 'premises' | 'systems' | 'processes', nvp: string, dvp: string, nvo: string, dvo: string, typeval: string) {
        const requestData = {
            id,
            objectType,
            nvp,
            dvp,
            nvo,
            dvo,
            typeval
        }
        return appInstance.post(`addReestrData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    getUserActions() {
        return appInstance.get(`getUserActions.php`).then(response => {
            return response.data
        })
    },
    getUserAccountsActions() {
        return appInstance.get(`getUserAccountsActions.php`).then(response => {
            return response.data
        })
    },
    uploadCodeForm(file: any) {
        let data = new FormData()
        data.append("fileform", file)
        return appInstance.post(`uploadCodeForm.php`, data, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            return response.data
        })
    },
}