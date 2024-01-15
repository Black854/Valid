import axios from "axios"
import { getCookie } from "../components/common/cookie"

const token = getCookie('token')

const instance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/plans/',
    withCredentials: true,
    headers: {"Authorization" : `Bearer ${token}`}
})

export const plansAPI = {
    getMonthList() {
        return instance.get(`getMonthList.php`).then(response => {
            return response.data
        })
    },
    getPlans(month: string) {
        return instance.get(`getPlans.php?month=${month}`).then(response => {
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
        return instance.post(`updatePlansFio.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    updatePlansDoc(doc: string, objectId: string, tableName: string, recordId: string, month: string) {
        const requestData = {
            doc,
            objectId,
            tableName,
            recordId,
            month
        }
        return instance.post(`updatePlansDoc.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    updatePlansDates(startDate: string, endDate: string, objectId: string, tableName: string, recordId: string, month: string) {
        const requestData = {
            startDate,
            endDate,
            objectId,
            tableName,
            recordId,
            month
        }
        return instance.post(`updatePlansDates.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    deletePlans(recordId: string, objectId: string, tableName: string, month: string) {
        const requestData = {
            recordId,
            objectId,
            tableName,
            month
        }
        return instance.post(`deletePlans.php`, requestData, {}).then(response => {
            return response.data
        })
    },
    updateReportStatus(status: string, objectId: string, tableName: string, recordId: string, month: string) {
        const requestData = {
            status,
            objectId,
            tableName,
            recordId,
            month
        }
        return instance.post(`updateReportStatus.php`, requestData, {}).then(response => {
            return response.data
        })
    },
}