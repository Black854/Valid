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
        var formData = new FormData()
        formData.append("image", file)
        return instance.post(`uploadMainPhoto.php?id=${id}&table=equipment`, formData, { headers: {'Content-Type': 'multipart/form-data'}}).then (response => {
            return response.data
        })
    },
    deleteMainPhoto (id: string) {
        return instance.get(`deleteMainPhoto.php?id=${id}&table=equipment`).then (response => {
            return response.data
        })
    }
}