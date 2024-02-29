import { NewProcObjectType } from "../redux/Reducers/processesReducer" 
import { procInstance } from "./instance"

export const processesAPI = {
    getProcesses () {
        return procInstance.get(`getProcList.php`).then (response => {
            return response.data
        })
    },
    getReestrData (id: string) {
        return procInstance.get(`getReestrData.php?id=${id}&proc`).then (response => {
            return response.data
        })
    },
    uploadMainPhoto (id: string, file: any) {
        let formData = new FormData()
        formData.append("image", file)
        return procInstance.post(`uploadMainPhoto.php?id=${id}&table=processes`, formData, { headers: {'Content-Type': 'multipart/form-data'}}).then (response => {
            return response.data
        })
    },
    deleteMainPhoto (id: string) {
        return procInstance.get(`deleteMainPhoto.php?id=${id}&table=processes`).then (response => {
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
        data.append("table", 'processes')
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
        
        return procInstance.post(`updateDescription.php`, data, {}).then (response => {
            return response.data
        })
    },
    getTechnicalInfo (id: string) {
        return procInstance.get(`getTechnicalInfo.php?id=${id}`).then (response => {
            return response.data
        })
    },
    updateTechnicalInfo (id: string, text: string) {
        let data = new FormData()
        data.append("id", id)
        data.append("text", text)
        return procInstance.post(`updateTechnicalInfo.php`, data).then (response => {
            return response.data
        })
    },
    getPhotos (id: string) {
        let data = new FormData()
        data.append("id", id)
        return procInstance.post(`getPhotos.php`, data).then (response => {
            return response.data
        })
    },
    uploadPhotos (id: string, file: any) {
        let formData = new FormData()
        formData.append("id", id)
        formData.append("image", file)
        formData.append("table", "processes")
        return procInstance.post(`uploadPhotos.php`, formData, { headers: {'Content-Type': 'multipart/form-data'}}).then (response => {
            return response.data
        })
    },
    deletePhoto (id: string, photoId: string) {
        let formData = new FormData()
        formData.append("id", id)
        formData.append("photoId", photoId)
        return procInstance.post(`deletePhoto.php`, formData, {}).then (response => {
            return response.data
        })
    },
    updatePdfDescription (photoId: string, text: string, id: string) {
        let data = new FormData()
        data.append("photoId", photoId)
        data.append("text", text)
        data.append("id", id)
        return procInstance.post(`updatePdfDescription.php`, data, {}).then (response => {
            return response.data
        })
    },
    updateReestrDate (id: string, procId: string, date: string, dateType: 'dvo' | 'dvp') {
        let data = new FormData()
        data.append("id", id)
        data.append("procId", procId)
        data.append("date", date)
        data.append("dateType", dateType)
        return procInstance.post(`updateReestrDate.php`, data, {}).then (response => {
            return response.data
        })
    },
    updateReestrDateTask (id: string, procId: string, date: string, dateType: 'dvo' | 'dvp') {
        let data = new FormData()
        data.append("id", id)
        data.append("procId", procId)
        data.append("date", date)
        data.append("dateType", dateType)
        return procInstance.post(`updateReestrDateTask.php`, data, {}).then (response => {
            return response.data
        })
    },
    updateReestrDocsCode (id: string, recordId: string, text: string, dataType: 'nvo' | 'nvp') {
        let data = new FormData()
        data.append("id", id)
        data.append("recordId", recordId)
        data.append("text", text)
        data.append("dataType", dataType)
        return procInstance.post(`updateReestrDocsCode.php`, data, {}).then (response => {
            return response.data
        })
    },
    updateReestrDocsCodeTask (id: string, recordId: string, text: string, dataType: 'nvo' | 'nvp') {
        let data = new FormData()
        data.append("id", id)
        data.append("recordId", recordId)
        data.append("text", text)
        data.append("dataType", dataType)
        return procInstance.post(`updateReestrDocsCodeTask.php`, data, {}).then (response => {
            return response.data
        })
    },
    uploadDocument (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', file: any) {
        let data = new FormData()
        data.append("objectId", objectId)
        data.append("recordId", recordId)
        data.append("dataType", dataType)
        data.append("file", file)
        return procInstance.post(`uploadDocument.php`, data, { headers: {'Content-Type': 'multipart/form-data'} }).then (response => {
            return response.data
        })
    },
    uploadTaskDocument (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', file: any) {
        let data = new FormData()
        data.append("objectId", objectId)
        data.append("recordId", recordId)
        data.append("dataType", dataType)
        data.append("file", file)
        return procInstance.post(`uploadTaskDocument.php`, data, { headers: {'Content-Type': 'multipart/form-data'} }).then (response => {
            return response.data
        })
    },
    deleteDocument (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', url: string) {
        let data = new FormData()
        data.append("objectId", objectId)
        data.append("recordId", recordId)
        data.append("dataType", dataType)
        data.append("url", url)
        return procInstance.post(`deleteDocument.php`, data, {}).then (response => {
            return response.data
        })
    },
    getCurrentProcData (myProcDataIdArray: Array<string>) {
        const requestData = {
            myProcDataIdArray
        }
        return procInstance.post(`getCurrentProcData.php`, requestData, {}).then (response => {
            return response.data
        })
    },
    updateProcWorkData (recordId: string, changeParam: 'et' | 'season' | 'pam2' | 'isCardUpdated', text: string) { // по идее можно убрать
        const requestData = {
            recordId,
            changeParam,
            text
        }
        return procInstance.post(`updateProcWorkData.php`, requestData, {}).then (response => {
            return response.data
        })
    },
    createNewObject(data: NewProcObjectType) {
        return procInstance.post(`createNewObject.php`, data, {}).then(response => {
            return response.data
        })
    },
}