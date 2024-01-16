import { NewInstObjectType } from "../redux/Reducers/instrumentsReducer"
import { instInstance } from "./instance"

export const instrumentsAPI = {
    getInstruments() {
        return instInstance.get(`getInstList.php`).then(response => {
            return response.data
        })
    },
    uploadMainPhoto(id: string, file: any) {
        let formData = new FormData()
        formData.append("image", file)
        return instInstance.post(`uploadMainPhoto.php?id=${id}&table=instruments`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            return response.data
        })
    },
    deleteMainPhoto(id: string) {
        return instInstance.get(`deleteMainPhoto.php?id=${id}&table=instruments`).then(response => {
            return response.data
        })
    },
    updateDescription(
        id: string,
        name?: string,
        name2?: string,
        quantity?: string,
        date1?: string,
        date2?: string,
        manufacturer?: string,
        manufacturDate?: string,
        serial?: string,
        invno?: string
    ) {
        let data = new FormData()
        data.append("id", id)
        data.append("table", 'instruments')
        serial !== undefined && data.append("serial", serial)
        invno !== undefined && data.append("invno", invno)
        name !== undefined && data.append("name", name)
        name2 !== undefined && data.append("name2", name2)
        date1 !== undefined && data.append("date1", date1)
        date2 !== undefined && data.append("date2", date2)
        quantity !== undefined && data.append("quantity", quantity)
        manufacturer !== undefined && data.append("manufacturer", manufacturer)
        manufacturDate !== undefined && data.append("manufacturdate", manufacturDate)

        return instInstance.post(`updateDescription.php`, data, {}).then(response => {
            return response.data
        })
    },
    getTechnicalInfo(id: string) {
        return instInstance.get(`getTechnicalInfo.php?id=${id}`).then(response => {
            return response.data
        })
    },
    updateTechnicalInfo(id: string, text: string) {
        let data = new FormData()
        data.append("id", id)
        data.append("text", text)
        return instInstance.post(`updateTechnicalInfo.php`, data).then(response => {
            return response.data
        })
    },
    getPhotos(id: string) {
        let data = new FormData()
        data.append("id", id)
        return instInstance.post(`getPhotos.php`, data).then(response => {
            return response.data
        })
    },
    uploadPhotos(id: string, file: any) {
        let formData = new FormData()
        formData.append("id", id)
        formData.append("image", file)
        formData.append("table", "instruments")
        return instInstance.post(`uploadPhotos.php`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            return response.data
        })
    },
    deletePhoto(id: string, photoId: string) {
        let formData = new FormData()
        formData.append("id", id)
        formData.append("photoId", photoId)
        return instInstance.post(`deletePhoto.php`, formData, {}).then(response => {
            return response.data
        })
    },
    updatePdfDescription(photoId: string, text: string, id: string) {
        let data = new FormData()
        data.append("photoId", photoId)
        data.append("text", text)
        data.append("id", id)
        return instInstance.post(`updatePdfDescription.php`, data, {}).then(response => {
            return response.data
        })
    },
    createNewObject(data: NewInstObjectType) {
        return instInstance.post(`createNewObject.php`, data, {}).then(response => {
            return response.data
        })
    },
}