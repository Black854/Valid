import { appInstance } from "./instance"

export const paperplanesAPI = {
    getPaperplanes() {
        return appInstance.get(`getPaperplanes.php`).then(response => {
            return response.data
        })
    },
    deletePaperplanes(id: string) {
        const requestData = {
            id
        }
        return appInstance.post(`deletePaperplanes.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    createPaperplanes(file: any) {
        const formData = new FormData()
        formData.append("image", file)
        return appInstance.post(`createPaperplanes.php`, formData, { headers: {'Content-Type': 'multipart/form-data'}}).then (response => {
            return response.data
        })
    },
    setPaperplanesDescription(id: string, description: string) {
        const requestData = {
            id,
            description
        }
        return appInstance.post(`setPaperplanesDescription.php`, requestData, {}).then(response => {
            return response.data
        })
    },
}