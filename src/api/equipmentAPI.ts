import axios from "axios"
import { NewEquipObjectType } from "../redux/Reducers/equipmentReducer"

const instance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/equip/',
    // withCredentials: true,
    // headers: {"API-KEY": "4f3d39e5-214f-420c-9ab3-f8c322bdb13c"}
})

export const equipmentAPI = {
    getEquipment() {
        return instance.get(`getEquipList.php`).then(response => {
            return response.data
        })
    },
    getReestrData(id: string) {
        return instance.get(`getReestrData.php?id=${id}&equip`).then(response => {
            return response.data
        })
    },
    uploadMainPhoto(id: string, file: any) {
        let formData = new FormData()
        formData.append("image", file)
        return instance.post(`uploadMainPhoto.php?id=${id}&table=equipment`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            return response.data
        })
    },
    deleteMainPhoto(id: string) {
        return instance.get(`deleteMainPhoto.php?id=${id}&table=equipment`).then(response => {
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

        return instance.post(`updateDescription.php`, data, {}).then(response => {
            return response.data
        })
    },
    getTechnicalInfo(id: string) {
        return instance.get(`getTechnicalInfo.php?id=${id}`).then(response => {
            return response.data
        })
    },
    updateTechnicalInfo(id: string, text: string) {
        let data = new FormData()
        data.append("id", id)
        data.append("text", text)
        return instance.post(`updateTechnicalInfo.php`, data).then(response => {
            return response.data
        })
    },
    getPhotos(id: string) {
        let data = new FormData()
        data.append("id", id)
        return instance.post(`getPhotos.php`, data).then(response => {
            return response.data
        })
    },
    uploadPhotos(id: string, file: any) {
        let formData = new FormData()
        formData.append("id", id)
        formData.append("image", file)
        formData.append("table", "equipment")
        return instance.post(`uploadPhotos.php`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            return response.data
        })
    },
    deletePhoto(id: string, photoId: string) {
        let formData = new FormData()
        formData.append("id", id)
        formData.append("photoId", photoId)
        return instance.post(`deletePhoto.php`, formData, {}).then(response => {
            return response.data
        })
    },
    updatePdfDescription(photoId: string, text: string, id: string) {
        let data = new FormData()
        data.append("photoId", photoId)
        data.append("text", text)
        data.append("id", id)
        return instance.post(`updatePdfDescription.php`, data, {}).then(response => {
            return response.data
        })
    },
    updateReestrDate(id: string, equipId: string, date: string, dateType: 'dvo' | 'dvp') {
        let data = new FormData()
        data.append("id", id)
        data.append("equipId", equipId)
        data.append("date", date)
        data.append("dateType", dateType)
        return instance.post(`updateReestrDate.php`, data, {}).then(response => {
            return response.data
        })
    },
    updateReestrDocsCode(id: string, recordId: string, text: string, dataType: 'nvo' | 'nvp') {
        let data = new FormData()
        data.append("id", id)
        data.append("recordId", recordId)
        data.append("text", text)
        data.append("dataType", dataType)
        return instance.post(`updateReestrDocsCode.php`, data, {}).then(response => {
            return response.data
        })
    },
    uploadDocument(objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', file: any) {
        let data = new FormData()
        data.append("objectId", objectId)
        data.append("recordId", recordId)
        data.append("dataType", dataType)
        data.append("file", file)
        return instance.post(`uploadDocument.php`, data, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            return response.data
        })
    },
    deleteDocument(objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', url: string) {
        let data = new FormData()
        data.append("objectId", objectId)
        data.append("recordId", recordId)
        data.append("dataType", dataType)
        data.append("url", url)
        return instance.post(`deleteDocument.php`, data, {}).then(response => {
            return response.data
        })
    },
    getCurrentEquipData(myEquipDataIdArray: Array<string>) {
        const requestData = {
            myEquipDataIdArray
        }
        return instance.post(`getCurrentEquipData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    updateEquipWorkData(recordId: string, changeParam: 'et' | 'season' | 'pam2', text: string) {
        const requestData = {
            recordId,
            changeParam,
            text
        }
        return instance.post(`updateEquipWorkData.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    createNewObject(data: NewEquipObjectType) {
        return instance.post(`createNewObject.php`, data, {}).then(response => {
            return response.data
        })
    },
}