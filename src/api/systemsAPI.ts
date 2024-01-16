import { NewSysObjectType } from "../redux/Reducers/systemsReducer"
import { sysInstance } from "./instance"

export const systemsAPI = {
    getSystems () {
        return sysInstance.get(`getSysList.php`).then (response => {
            return response.data
        })
    },
    getReestrData (id: string) {
        return sysInstance.get(`getReestrData.php?id=${id}&sys`).then (response => {
            return response.data
        })
    },
    uploadMainPhoto (id: string, file: any) {
        let formData = new FormData()
        formData.append("image", file)
        return sysInstance.post(`uploadMainPhoto.php?id=${id}&table=systems`, formData, { headers: {'Content-Type': 'multipart/form-data'}}).then (response => {
            return response.data
        })
    },
    deleteMainPhoto (id: string) {
        return sysInstance.get(`deleteMainPhoto.php?id=${id}&table=systems`).then (response => {
            return response.data
        })
    },
    updateDescription (id: string,
            nomer?: string,
            serial?: string,
            inv?: string,
            manufacturer?: string,
            manufacturDate?: string,
            name?: string,
            group?: string,
            department?: string,
            VMPDepartment?: string,
            interval?: string
        ) {
        let data = new FormData()
        data.append("id", id)
        data.append("table", 'systems')
        nomer !== undefined && data.append("nomer", nomer)
        serial !== undefined && data.append("serial", serial)
        inv !== undefined && data.append("inv", inv)
        name !== undefined && data.append("name", name)
        manufacturer !== undefined && data.append("manufacturer", manufacturer)
        manufacturDate !== undefined && data.append("manufacturdate", manufacturDate)
        group !== undefined && data.append("group", group)
        department !== undefined && data.append("department", department)
        VMPDepartment !== undefined && data.append("VMPDepartment", VMPDepartment)
        interval !== undefined && data.append("interval", interval)
        
        return sysInstance.post(`updateDescription.php`, data, {}).then (response => {
            return response.data
        })
    },
    getTechnicalInfo (id: string) {
        return sysInstance.get(`getTechnicalInfo.php?id=${id}`).then (response => {
            return response.data
        })
    },
    updateTechnicalInfo (id: string, text: string) {
        let data = new FormData()
        data.append("id", id)
        data.append("text", text)
        return sysInstance.post(`updateTechnicalInfo.php`, data).then (response => {
            return response.data
        })
    },
    getPhotos (id: string) {
        let data = new FormData()
        data.append("id", id)
        return sysInstance.post(`getPhotos.php`, data).then (response => {
            return response.data
        })
    },
    uploadPhotos (id: string, file: any) {
        let formData = new FormData()
        formData.append("id", id)
        formData.append("image", file)
        formData.append("table", "systems")
        return sysInstance.post(`uploadPhotos.php`, formData, { headers: {'Content-Type': 'multipart/form-data'}}).then (response => {
            return response.data
        })
    },
    deletePhoto (id: string, photoId: string) {
        let formData = new FormData()
        formData.append("id", id)
        formData.append("photoId", photoId)
        return sysInstance.post(`deletePhoto.php`, formData, {}).then (response => {
            return response.data
        })
    },
    updatePdfDescription (photoId: string, text: string, id: string) {
        let data = new FormData()
        data.append("photoId", photoId)
        data.append("text", text)
        data.append("id", id)
        return sysInstance.post(`updatePdfDescription.php`, data, {}).then (response => {
            return response.data
        })
    },
    updateReestrDate (id: string, sysId: string, date: string, dateType: 'dvo' | 'dvp') {
        let data = new FormData()
        data.append("id", id)
        data.append("sysId", sysId)
        data.append("date", date)
        data.append("dateType", dateType)
        return sysInstance.post(`updateReestrDate.php`, data, {}).then (response => {
            return response.data
        })
    },
    updateReestrDocsCode (id: string, recordId: string, text: string, dataType: 'nvo' | 'nvp') {
        let data = new FormData()
        data.append("id", id)
        data.append("recordId", recordId)
        data.append("text", text)
        data.append("dataType", dataType)
        return sysInstance.post(`updateReestrDocsCode.php`, data, {}).then (response => {
            return response.data
        })
    },
    uploadDocument (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', file: any) {
        let data = new FormData()
        data.append("objectId", objectId)
        data.append("recordId", recordId)
        data.append("dataType", dataType)
        data.append("file", file)
        return sysInstance.post(`uploadDocument.php`, data, { headers: {'Content-Type': 'multipart/form-data'} }).then (response => {
            return response.data
        })
    },
    deleteDocument (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', url: string) {
        let data = new FormData()
        data.append("objectId", objectId)
        data.append("recordId", recordId)
        data.append("dataType", dataType)
        data.append("url", url)
        return sysInstance.post(`deleteDocument.php`, data, {}).then (response => {
            return response.data
        })
    },
    getCurrentSysData (mySysDataIdArray: Array<string>) {
        const requestData = {
            mySysDataIdArray
        }
        return sysInstance.post(`getCurrentSysData.php`, requestData, {}).then (response => {
            return response.data
        })
    },
    updateSysWorkData (recordId: string, changeParam: 'et' | 'season' | 'pam2', text: string) {
        const requestData = {
            recordId,
            changeParam,
            text
        }
        return sysInstance.post(`updateSysWorkData.php`, requestData, {}).then (response => {
            return response.data
        })
    },
    createNewObject(data: NewSysObjectType) {
        return sysInstance.post(`createNewObject.php`, data, {}).then(response => {
            return response.data
        })
    },
}