import { plansInstance } from "./instance"

export const plansAPI = {
    getMonthList() {
        return plansInstance.get(`getMonthList.php`).then(response => {
            return response.data
        })
    },
    getPlans(month: string) {
        return plansInstance.get(`getPlans.php?month=${month}`).then(response => {
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
        return plansInstance.post(`updatePlansFio.php`, requestData, {}).then(response => {
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
        return plansInstance.post(`updatePlansDoc.php`, requestData, {}).then(response => {
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
        return plansInstance.post(`updatePlansDates.php`, requestData, {}).then(response => {
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
        return plansInstance.post(`deletePlans.php`, requestData, {}).then(response => {
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
        return plansInstance.post(`updateReportStatus.php`, requestData, {}).then(response => {
            return response.data
        })
    },
}