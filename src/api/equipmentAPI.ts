import { NewEquipObjectType } from "../redux/Reducers/equipmentReducer"
import { equipInstance } from "./instance"

export const equipmentAPI = {
    getEquipment() {
        return equipInstance.get(`getEquipList.php`).then(response => {
            return response.data
        })
    },
    getReestrData(id: string) {
        return equipInstance.get(`getReestrData.php?id=${id}&equip`).then(response => {
            return response.data
        })
    },
    uploadMainPhoto(id: string, file: any) {
        let formData = new FormData()
        formData.append("image", file)
        return equipInstance.post(`uploadMainPhoto.php?id=${id}&table=equipment`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            return response.data
        })
    },
    deleteMainPhoto(id: string) {
        return equipInstance.get(`deleteMainPhoto.php?id=${id}&table=equipment`).then(response => {
            return response.data
        })
    },
    updateDescription(id: string,
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
        data.append("table", 'equipment')
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

        return equipInstance.post(`updateDescription.php`, data, {}).then(response => {
            return response.data
        })
    },
    getTechnicalInfo(id: string) {
        return equipInstance.get(`getTechnicalInfo.php?id=${id}`).then(response => {
            return response.data
        })
    },
    updateTechnicalInfo(id: string, text: string) {
        let data = new FormData()
        data.append("id", id)
        data.append("text", text)
        return equipInstance.post(`updateTechnicalInfo.php`, data).then(response => {
            return response.data
        })
    },
    getPhotos(id: string) {
        let data = new FormData()
        data.append("id", id)
        return equipInstance.post(`getPhotos.php`, data).then(response => {
            return response.data
        })
    },
    uploadPhotos(id: string, file: any) {
        let formData = new FormData()
        formData.append("id", id)
        formData.append("image", file)
        formData.append("table", "equipment")
        return equipInstance.post(`uploadPhotos.php`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            return response.data
        })
    },
    deletePhoto(id: string, photoId: string) {
        let formData = new FormData()
        formData.append("id", id)
        formData.append("photoId", photoId)
        return equipInstance.post(`deletePhoto.php`, formData, {}).then(response => {
            return response.data
        })
    },
    updatePdfDescription(photoId: string, text: string, id: string) {
        let data = new FormData()
        data.append("photoId", photoId)
        data.append("text", text)
        data.append("id", id)
        return equipInstance.post(`updatePdfDescription.php`, data, {}).then(response => {
            return response.data
        })
    },
    updateReestrDate(id: string, equipId: string, date: string, dateType: 'dvo' | 'dvp') {
        let data = new FormData()
        data.append("id", id)
        data.append("equipId", equipId)
        data.append("date", date)
        data.append("dateType", dateType)
        return equipInstance.post(`updateReestrDate.php`, data, {}).then(response => {
            return response.data
        })
    },
    updateReestrDateTask(id: string, equipId: string, date: string, dateType: 'dvo' | 'dvp') {
        let data = new FormData()
        data.append("id", id)
        data.append("equipId", equipId)
        data.append("date", date)
        data.append("dateType", dateType)
        return equipInstance.post(`updateReestrDateTask.php`, data, {}).then(response => {
            return response.data
        })
    },
    updateReestrDocsCode(id: string, recordId: string, text: string, dataType: 'nvo' | 'nvp') {
        let data = new FormData()
        data.append("id", id)
        data.append("recordId", recordId)
        data.append("text", text)
        data.append("dataType", dataType)
        return equipInstance.post(`updateReestrDocsCode.php`, data, {}).then(response => {
            return response.data
        })
    },
    updateReestrDocsCodeTask(id: string, recordId: string, text: string, dataType: 'nvo' | 'nvp') {
        let data = new FormData()
        data.append("id", id)
        data.append("recordId", recordId)
        data.append("text", text)
        data.append("dataType", dataType)
        return equipInstance.post(`updateReestrDocsCodeTask.php`, data, {}).then(response => {
            return response.data
        })
    },
    uploadDocument(objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', file: any) {
        let data = new FormData()
        data.append("objectId", objectId)
        data.append("recordId", recordId)
        data.append("dataType", dataType)
        data.append("file", file)
        return equipInstance.post(`uploadDocument.php`, data, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            return response.data
        })
    },
    uploadTaskDocument(objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', file: any) {
        let data = new FormData()
        data.append("objectId", objectId)
        data.append("recordId", recordId)
        data.append("dataType", dataType)
        data.append("file", file)
        return equipInstance.post(`uploadTaskDocument.php`, data, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            return response.data
        })
    },
    deleteDocument(objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', url: string) {
        let data = new FormData()
        data.append("objectId", objectId)
        data.append("recordId", recordId)
        data.append("dataType", dataType)
        data.append("url", url)
        return equipInstance.post(`deleteDocument.php`, data, {}).then(response => {
            return response.data
        })
    },
    getCurrentEquipData(myEquipDataIdArray: Array<string>) {
        const requestData = {
            myEquipDataIdArray
        }
        return equipInstance.post(`getCurrentEquipData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    updateEquipWorkData(recordId: string, changeParam: 'et' | 'season' | 'pam2' | 'isCardUpdated', text: string) {
        const requestData = {
            recordId,
            changeParam,
            text
        }
        return equipInstance.post(`updateEquipWorkData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    createNewObject(data: NewEquipObjectType) {
        return equipInstance.post(`createNewObject.php`, data, {}).then(response => {
            return response.data
        })
    },
}