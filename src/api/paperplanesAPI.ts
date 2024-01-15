import axios from "axios"
import { getCookie } from "../components/common/cookie"

const token = getCookie('token')

const instance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/common/',
    withCredentials: true,
    headers: {"Authorization" : `Bearer ${token}`}
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
    setPaperplanesDescription(id: string, description: string) {
        const requestData = {
            id,
            description
        }
        return instance.post(`setPaperplanesDescription.php`, requestData, {}).then(response => {
            return response.data
        })
    },
}