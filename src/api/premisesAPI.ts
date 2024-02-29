import { NewPremObjectType } from "../redux/Reducers/premisesReducer"
import { premInstance } from "./instance"

export const premisesAPI = {
    getPremises () {
        return premInstance.get(`getPremList.php`).then (response => {
            return response.data
        })
    },
    getReestrData (id: string) {
        return premInstance.get(`getReestrData.php?id=${id}&prem`).then (response => {
            return response.data
        })
    },
    uploadMainPhoto (id: string, file: any) {
        let formData = new FormData()
        formData.append("image", file)
        return premInstance.post(`uploadMainPhoto.php?id=${id}&table=premises`, formData, { headers: {'Content-Type': 'multipart/form-data'}}).then (response => {
            return response.data
        })
    },
    deleteMainPhoto (id: string) {
        return premInstance.get(`deleteMainPhoto.php?id=${id}&table=premises`).then (response => {
            return response.data
        })
    },
    updateDescription (id: string,
            nomer?: string,
            name?: string,
            premClass?: string,
            department?: string,
            VMPDepartment?: string,
            interval?: string,
            mode?: string
        ) {
        let data = new FormData()
        data.append("id", id)
        data.append("table", 'premises')
        nomer !== undefined && data.append("nomer", nomer)
        name !== undefined && data.append("name", name)
        premClass !== undefined && data.append("class", premClass)
        department !== undefined && data.append("department", department)
        VMPDepartment !== undefined && data.append("VMPDepartment", VMPDepartment)
        interval !== undefined && data.append("interval", interval)
        mode !== undefined && data.append("mode", mode)
        
        return premInstance.post(`updateDescription.php`, data, {}).then (response => {
            return response.data
        })
    },
    getTechnicalInfo (id: string) {
        return premInstance.get(`getTechnicalInfo.php?id=${id}`).then (response => {
            return response.data
        })
    },
    updateTechnicalInfo (id: string, techType: string, text: string) {
        let data = new FormData()
        data.append("id", id)
        data.append("techType", techType)
        data.append("text", text)
        return premInstance.post(`updateTechnicalInfo.php`, data).then (response => {
            return response.data
        })
    },
    getPhotos (id: string) {
        let data = new FormData()
        data.append("id", id)
        return premInstance.post(`getPhotos.php`, data).then (response => {
            return response.data
        })
    },
    getCleanPremList (id: string) {
        let data = new FormData()
        data.append("id", id)
        return premInstance.post(`getCleanPremList.php`, data).then (response => {
            return response.data
        })
    },
    getCleanGroupLabels (premId: string) {
        let data = new FormData()
        data.append("premId", premId)
        return premInstance.post(`getCleanGroupLabels.php`, data).then (response => {
            return response.data
        })
    },
    uploadPhotos (id: string, file: any) {
        let formData = new FormData()
        formData.append("id", id)
        formData.append("image", file)
        formData.append("table", "premises")
        return premInstance.post(`uploadPhotos.php`, formData, { headers: {'Content-Type': 'multipart/form-data'}}).then (response => {
            return response.data
        })
    },
    deletePhoto (id: string, photoId: string) {
        let formData = new FormData()
        formData.append("id", id)
        formData.append("photoId", photoId)
        return premInstance.post(`deletePhoto.php`, formData, {}).then (response => {
            return response.data
        })
    },
    updatePdfDescription (photoId: string, text: string, id: string) {
        let data = new FormData()
        data.append("photoId", photoId)
        data.append("text", text)
        data.append("id", id)
        return premInstance.post(`updatePdfDescription.php`, data, {}).then (response => {
            return response.data
        })
    },
    updateReestrDate (id: string, premId: string, date: string, dateType: 'dvo' | 'dvp') {
        let data = new FormData()
        data.append("id", id)
        data.append("premId", premId)
        data.append("date", date)
        data.append("dateType", dateType)
        return premInstance.post(`updateReestrDate.php`, data, {}).then (response => {
            return response.data
        })
    },
    updateReestrDateTask (id: string, premId: string, date: string, dateType: 'dvo' | 'dvp') {
        let data = new FormData()
        data.append("id", id)
        data.append("premId", premId)
        data.append("date", date)
        data.append("dateType", dateType)
        return premInstance.post(`updateReestrDateTask.php`, data, {}).then (response => {
            return response.data
        })
    },
    updateReestrDocsCode (id: string, recordId: string, text: string, dataType: 'nvo' | 'nvp') {
        let data = new FormData()
        data.append("id", id)
        data.append("recordId", recordId)
        data.append("text", text)
        data.append("dataType", dataType)
        return premInstance.post(`updateReestrDocsCode.php`, data, {}).then (response => {
            return response.data
        })
    },
    updateReestrDocsCodeTask (id: string, recordId: string, text: string, dataType: 'nvo' | 'nvp') {
        let data = new FormData()
        data.append("id", id)
        data.append("recordId", recordId)
        data.append("text", text)
        data.append("dataType", dataType)
        return premInstance.post(`updateReestrDocsCodeTask.php`, data, {}).then (response => {
            return response.data
        })
    },
    updateCleanPremItemData (premId: string, recordId: string, text: string, dataType: 'sp' | 'nomer' | 'name') {
        let data = new FormData()
        data.append("premId", premId)
        data.append("recordId", recordId)
        data.append("dataType", dataType)
        data.append("text", text)
        return premInstance.post(`updateCleanPremItemData.php`, data, {}).then (response => {
            return response.data
        })
    },
    uploadDocument (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', file: any) {
        let data = new FormData()
        data.append("objectId", objectId)
        data.append("recordId", recordId)
        data.append("dataType", dataType)
        data.append("file", file)
        return premInstance.post(`uploadDocument.php`, data, { headers: {'Content-Type': 'multipart/form-data'} }).then (response => {
            return response.data
        })
    },
    uploadTaskDocument (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', file: any) {
        let data = new FormData()
        data.append("objectId", objectId)
        data.append("recordId", recordId)
        data.append("dataType", dataType)
        data.append("file", file)
        return premInstance.post(`uploadTaskDocument.php`, data, { headers: {'Content-Type': 'multipart/form-data'} }).then (response => {
            return response.data
        })
    },
    deleteDocument (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', url: string) {
        let data = new FormData()
        data.append("objectId", objectId)
        data.append("recordId", recordId)
        data.append("dataType", dataType)
        data.append("url", url)
        return premInstance.post(`deleteDocument.php`, data, {}).then (response => {
            return response.data
        })
    },
    createCleanPrem (cleanTab: string, nomer: string, sp: string, name: string) {
        let data = new FormData()
        data.append("cleanTab", cleanTab)
        data.append("nomer", nomer)
        data.append("sp", sp)
        data.append("name", name)
        return premInstance.post(`createCleanPrem.php`, data, {}).then (response => {
            return response.data
        })
    },
    deleteCleanPrem (cleanTab: string, id: string) {
        let data = new FormData()
        data.append("cleanTab", cleanTab)
        data.append("id", id)
        return premInstance.post(`deleteCleanPrem.php`, data, {}).then (response => {
            return response.data
        })
    },
    deleteCleanPremGroup (cleanTab: string, groupId: string) {
        let data = new FormData()
        data.append("cleanTab", cleanTab)
        data.append("groupId", groupId)
        return premInstance.post(`deleteCleanPremGroup.php`, data, {}).then (response => {
            return response.data
        })
    },
    createCleanPremGroup (cleanTab: string, dataItems: Array<string>, count: string) {
        const requestData = {
            cleanTab,
            dataItems,
            count
        }
        return premInstance.post(`createCleanPremGroup.php`, requestData, {}).then (response => {
            return response.data
        })
    },
    editCleanPremGroup (cleanTab: string, dataItems: Array<string>, count: string, groupId: string) {
        const requestData = {
            cleanTab,
            dataItems,
            count,
            groupId
        }
        return premInstance.post(`editCleanPremGroup.php`, requestData, {}).then (response => {
            return response.data
        })
    },
    getCurrentPremData (myPremDataIdArray: Array<string>) {
        const requestData = {
            myPremDataIdArray
        }
        return premInstance.post(`getCurrentPremData.php`, requestData, {}).then (response => {
            return response.data
        })
    },
    updatePremWorkData (recordId: string, changeParam: 'et' | 'season' | 'pam2' | 'isCardUpdated', text: string) {
        const requestData = {
            recordId,
            changeParam,
            text
        }
        return premInstance.post(`updatePremWorkData.php`, requestData, {}).then (response => {
            return response.data
        })
    },
    createNewObject(data: NewPremObjectType) {
        return premInstance.post(`createNewObject.php`, data, {}).then(response => {
            return response.data
        })
    },
}