import axios from "axios"

const instance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/',
    // withCredentials: true,
    // headers: {"API-KEY": "4f3d39e5-214f-420c-9ab3-f8c322bdb13c"}
});

export const equipmentAPI = {
    getEquipment () {
        return instance.get(`equip.php`).then (response => {
            return response.data
        })
    },
    getReestrData (id: string) {
        return instance.get(`getReestrData.php?id=${id}&equip`).then (response => {
            return response.data
        })
    },
    uploadMainPhoto (id: string, file: any) {
        let formData = new FormData()
        formData.append("image", file)
        return instance.post(`uploadMainPhoto.php?id=${id}&table=equipment`, formData, { headers: {'Content-Type': 'multipart/form-data'}}).then (response => {
            return response.data
        })
    },
    deleteMainPhoto (id: string) {
        return instance.get(`deleteMainPhoto.php?id=${id}&table=equipment`).then (response => {
            return response.data
        })
    },
    updateDescription (id: string, nomer?: string, serial?: string, inv?: string, manufacturer?: string, manufacturDate?: string) {
        let data = new FormData()
        data.append("id", id)
        data.append("table", 'equipment')
        nomer !== undefined && data.append("nomer", nomer)
        serial !== undefined && data.append("serial", serial)
        inv !== undefined && data.append("inv", inv)
        manufacturer !== undefined && data.append("manufacturer", manufacturer)
        manufacturDate !== undefined && data.append("manufacturdate", manufacturDate)
        
        return instance.post(`updateData.php`, data, {}).then (response => {
            return response.data
        })
    },
    getTechnicalInfo (id: string) {
        return instance.get(`getTechnicalInfo.php?id=${id}`).then (response => {
            return response.data
        })
    },
    updateTechnicalInfo (id: string, text: string) {
        let data = new FormData()
        data.append("id", id)
        data.append("text", text)
        return instance.post(`updateTechnicalInfo.php`, data).then (response => {
            return response.data
        })
    },
    getPhotos (id: string) {
        let data = new FormData()
        data.append("id", id)
        return instance.post(`getPhotos.php`, data).then (response => {
            return response.data
        })
    }
}