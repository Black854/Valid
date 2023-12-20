import axios from "axios"

const instance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/common/',
    // withCredentials: true,
    // headers: {"API-KEY": "4f3d39e5-214f-420c-9ab3-f8c322bdb13c"}
})

export const paperplanesAPI = {
    getPaperplanes() {
        return instance.get(`getPaperplanes.php`).then(response => {
            return response.data
        })
    },
    deletePaperplanes(id: string) {
        const requestData = {
            id
        }
        return instance.post(`deletePaperplanes.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    createPaperplanes(file: any) {
        const formData = new FormData()
        formData.append("image", file)
        return instance.post(`createPaperplanes.php`, formData, { headers: {'Content-Type': 'multipart/form-data'}}).then (response => {
            return response.data
        })
    },
}