import axios from "axios"

const instance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/plans/',
    // withCredentials: true,
    // headers: {"API-KEY": "4f3d39e5-214f-420c-9ab3-f8c322bdb13c"}
})

export const plansAPI = {
    getMonthList () {
        return instance.get(`getMonthList.php`).then (response => {
            return response.data
        })
    },
    getPlans(month: string) {
        return instance.get(`getPlans.php?month=${month}`).then (response => {
            return response.data
        })
    },
    updatePlansFio(fio: string, objectId: string, tableName: string, recordId: string, month: string) {
        const requestData = {
            fio,
            objectId,
            tableName,
            recordId,
            month
        }
        return instance.post(`updatePlansFio.php`, requestData, {}).then (response => {
            return response.data
        })
    },
}