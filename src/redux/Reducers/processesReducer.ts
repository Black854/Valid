import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "../store"
import { processesAPI } from "../../api/processesAPI"

export type DataType = {
    id: string
    sp: string
    sp2: string
    nomer: string
    name: string
    groupp: string
    fio: string
    manual: string
    foto: string
    manufacturer: string
    manufacturdate: string
    serial: string
    inv: string
    ar: string
    date: string
}

type PhotosType = {
    id: string
    idfromtable: string
    src: string
    name: string
}

export type ProcReestrType = {
    dvo: string
    dvp: string
    et: string
    id: string
    idfromtable: string
    nvo: string
    nvp: string
    pam: string
    pam2: string
    period: string
    season: string
    typeval: string
    vo: string
    vp: string
}

let initialState = {
    data: [] as DataType[],
    reestrData: [] as ProcReestrType[],
    isLoading: false,
    technicalInfo: '',
    photos: [] as PhotosType[],
    isDepartmentLoading: false,
    isVMPDepartmentLoading: false,
    isGroupLoading: false,
    isReestrDataLoading: false,
    isIntervalLoading: false,
    isReestrLoading: false,
    procIdArrayAtWorkAtCurrentUser: [] as ProcReestrType[],
}

type InitialStateType = typeof initialState

export const processesReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'proc/PUSH_PROC_DATA':
            return {...state, data: action.data, isLoading: false}
        case 'proc/IS_LOADING':
            return {...state, isLoading: true}
        case 'proc/PUSH_REESTR_DATA':
            return {...state, reestrData: action.data}            
        case 'proc/SET_TECH_INFO':
            return {...state, technicalInfo: action.text}
        case 'proc/SET_PHOTOS':
            return {...state, photos: action.data}
        case 'proc/SET_IS_DEPARTMENT_LOADING':
            return {...state, isDepartmentLoading: action.data}
        case 'proc/SET_IS_VMP_DEPARTMENT_LOADING':
            return {...state, isVMPDepartmentLoading: action.data}
        case 'proc/SET_IS_GROUP_LOADING':
            return {...state, isGroupLoading: action.data}
        case 'proc/SET_IS_REESTR_DATA_LOADING':
            return {...state, isReestrDataLoading: action.data}
        case 'proc/SET_IS_INTERVAL_LOADING':
            return {...state, isIntervalLoading: action.data}
        case 'proc/SET_PROC_ID_ARRAY_AT_WORK_AT_CURRENT_USER':
            return {...state, procIdArrayAtWorkAtCurrentUser: action.data}
        default:
            return state
    }
}

export const getProcesses = (): ThunkType => async (dispatch) => {
    dispatch (procActions.setIsLoading())
    let data = await processesAPI.getProcesses()
    dispatch (procActions.pushProcessesData(data.items))
}

export const getReestrData = (id: string): ThunkType => async (dispatch) => {
    dispatch (procActions.setIsReestrDataLoading(true))
    let data = await processesAPI.getReestrData(id)
    dispatch (procActions.pushReestrData(data.items))
    dispatch (procActions.setIsReestrDataLoading(false))
}

export const uploadMainPhoto = (id: string, file: File): ThunkType => async (dispatch) => {
    let data = await processesAPI.uploadMainPhoto(id, file)
    dispatch (procActions.pushProcessesData(data.items))
}

export const deleteMainPhoto = (id: string): ThunkType => async (dispatch) => {
    let data = await processesAPI.deleteMainPhoto(id)
    dispatch (procActions.pushProcessesData(data.items))
}

export const updateNomer = (id: string, nomer: string): ThunkType => async (dispatch) => {
    let data = await processesAPI.updateDescription(id, nomer)
    dispatch (procActions.pushProcessesData(data.items))
}

export const updateManufacturer = (id: string, manufacturer: string): ThunkType => async (dispatch) => {
    let data = await processesAPI.updateDescription(id, undefined, undefined, undefined, manufacturer)
    dispatch (procActions.pushProcessesData(data.items))
}

export const updateManufacturDate = (id: string, manufacturDate: string): ThunkType => async (dispatch) => {
    let data = await processesAPI.updateDescription(id, undefined, undefined, undefined, undefined, manufacturDate)
    dispatch (procActions.pushProcessesData(data.items))
}

export const updateSerial = (id: string, serial: string): ThunkType => async (dispatch) => {
    let data = await processesAPI.updateDescription(id, undefined, serial)
    dispatch (procActions.pushProcessesData(data.items))
}

export const updateInv = (id: string, inv: string): ThunkType => async (dispatch) => {
    let data = await processesAPI.updateDescription(id, undefined, undefined, inv)
    dispatch (procActions.pushProcessesData(data.items))
}

export const updateName = (id: string, name: string): ThunkType => async (dispatch) => {
    let data = await processesAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, name)
    dispatch (procActions.pushProcessesData(data.items))
}

export const updateGroup = (id: string, group: string): ThunkType => async (dispatch) => {
    dispatch (procActions.setIsGroupLoading(true))
    let data = await processesAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, group)
    dispatch (procActions.pushProcessesData(data.items))
    dispatch (procActions.setIsGroupLoading(false))
}

export const getTechnicalInfo = (id: string): ThunkType => async (dispatch) => { 
    let data = await processesAPI.getTechnicalInfo(id)
    dispatch(procActions.setTechnicalInfo(data.tech))
}

export const updateTechnicalInfo = (id: string, text: string): ThunkType => async (dispatch) => { 
    let data = await processesAPI.updateTechnicalInfo(id, text)
    dispatch(procActions.setTechnicalInfo(data.tech))
}

export const getPhotos = (id: string): ThunkType => async (dispatch) => { 
    let data = await processesAPI.getPhotos(id)
    dispatch(procActions.setPhotosData(data.photos))
}

export const uploadPhotos = (id: string, file: any): ThunkType => async (dispatch) => { 
    let data = await processesAPI.uploadPhotos(id, file)
    dispatch(procActions.setPhotosData(data.photos))
}

export const deletePhoto = (id: string, photoId: string): ThunkType => async (dispatch) => { 
    let data = await processesAPI.deletePhoto(id, photoId)
    dispatch(procActions.setPhotosData(data.photos))
}

export const updatePdfDescription = (photoId: string, text: string, id: string): ThunkType => async (dispatch) => { 
    let data = await processesAPI.updatePdfDescription(photoId, text, id)
    dispatch(procActions.setPhotosData(data.photos))
}

export const updateDepartment = (id: string, department: string): ThunkType => async (dispatch) => {
    dispatch (procActions.setIsDepartmentLoading(true))
    let data = await processesAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, department)
    dispatch (procActions.pushProcessesData(data.items))
    dispatch (procActions.setIsDepartmentLoading(false))
}

export const updateVMPDepartment = (id: string, VMPdepartment: string): ThunkType => async (dispatch) => {
    dispatch (procActions.setIsVMPDepartmentLoading(true))
    let data = await processesAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, VMPdepartment)
    dispatch (procActions.pushProcessesData(data.items))
    dispatch (procActions.setIsVMPDepartmentLoading(false))
}

export const updateProcInterval = (id: string, interval: string): ThunkType => async (dispatch) => {
    dispatch (procActions.setIsIntervalLoading(true))
    let data = await processesAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, interval)
    dispatch (procActions.pushProcessesData(data.items))
    dispatch (procActions.setIsIntervalLoading(false))
}

export const updateReestrDateProc = (id: string, procId: string, date: string, dateType: 'dvp' | 'dvo'): ThunkType => async (dispatch) => {
    dispatch (procActions.setIsReestrDataLoading(true))
    let data = await processesAPI.updateReestrDate(id, procId, date, dateType)
    dispatch (procActions.pushReestrData(data.items))
    dispatch (procActions.setIsReestrDataLoading(false))
}

export const updateReestrDocsCodeProc = (id: string, recordId: string, text: string, dataType: 'nvo' | 'nvp'): ThunkType => async (dispatch) => {
    dispatch (procActions.setIsReestrDataLoading(true))
    let data = await processesAPI.updateReestrDocsCode(id, recordId, text, dataType)
    dispatch (procActions.pushReestrData(data.items))
    dispatch (procActions.setIsReestrDataLoading(false))
}

export const uploadProcDocument = (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', file: any): ThunkType => async (dispatch) => {
    dispatch (procActions.setIsReestrDataLoading(true))
    let data = await processesAPI.uploadDocument(objectId, recordId, dataType, file)
    dispatch (procActions.pushReestrData(data.items))
    dispatch (procActions.setIsReestrDataLoading(false))
}

export const deleteProcDocument = (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', url: string): ThunkType => async (dispatch) => {
    dispatch (procActions.setIsReestrDataLoading(true))
    let data = await processesAPI.deleteDocument(objectId, recordId, dataType, url)
    dispatch (procActions.pushReestrData(data.items))
    dispatch (procActions.setIsReestrDataLoading(false))
}

export const getCurrentProcData = (myProcDataIdArray: Array<string>): ThunkType => async (dispatch) => {
    let data = await processesAPI.getCurrentProcData(myProcDataIdArray)
    dispatch(procActions.setProcIdArrayAtWorkAtCurrentUser(data.items))
}

export const updateProcWorkData = (recordId: string, changeParam: 'et' | 'season' | 'pam2', text: string): ThunkType => async (dispatch) => {
    await processesAPI.updateProcWorkData(recordId, changeParam, text)
}

type ActionTypes = InferActionsTypes<typeof procActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

const procActions = {
    pushProcessesData: (data: DataType[]) => ({ type: 'proc/PUSH_PROC_DATA', data } as const),
    pushReestrData: (data: ProcReestrType[]) => ({ type: 'proc/PUSH_REESTR_DATA', data } as const),
    setIsLoading: () => ({ type: 'proc/IS_LOADING' } as const),
    setTechnicalInfo: (text: string) => ({ type: 'proc/SET_TECH_INFO', text } as const),
    setPhotosData: (data: PhotosType[]) => ({ type: 'proc/SET_PHOTOS', data } as const),
    setIsDepartmentLoading: (data: boolean) => ({ type: 'proc/SET_IS_DEPARTMENT_LOADING', data } as const),
    setIsVMPDepartmentLoading: (data: boolean) => ({ type: 'proc/SET_IS_VMP_DEPARTMENT_LOADING', data } as const),
    setIsGroupLoading: (data: boolean) => ({ type: 'proc/SET_IS_GROUP_LOADING', data } as const),
    setIsReestrDataLoading: (data: boolean) => ({ type: 'proc/SET_IS_REESTR_DATA_LOADING', data } as const),
    setIsIntervalLoading: (data: boolean) => ({ type: 'proc/SET_IS_INTERVAL_LOADING', data } as const),
    setProcIdArrayAtWorkAtCurrentUser: (data: any) => ({ type: 'proc/SET_PROC_ID_ARRAY_AT_WORK_AT_CURRENT_USER', data } as const),
}