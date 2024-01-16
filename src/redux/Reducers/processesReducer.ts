import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "../store"
import { processesAPI } from "../../api/processesAPI"
import { VMPDataTypeForPlansComponent } from "./vmpReducer"
import { logout } from "./authReducer"

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
    type1?: VMPDataTypeForPlansComponent
    type2?: VMPDataTypeForPlansComponent
}

let initialState = {
    data: [] as DataType[],
    reestrData: [] as ProcReestrType[],
    isLoading: false,
    technicalInfo: '',
    photos: [] as PhotosType[],
    isReestrDataLoading: false,
    isDescriptionLoading: false,
    procIdArrayAtWorkAtCurrentUser: [] as ProcReestrType[],
}

export type NewProcObjectType = {
    spVMP: string,
    sp: string,
    name: string,
    ar: string
}

type InitialStateType = typeof initialState

export const processesReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'proc/PUSH_PROC_DATA':
            return {...state, data: action.data}
        case 'proc/IS_LOADING':
            return {...state, isLoading: action.data}
        case 'proc/PUSH_REESTR_DATA':
            return {...state, reestrData: action.data}            
        case 'proc/SET_TECH_INFO':
            return {...state, technicalInfo: action.text}
        case 'proc/SET_PHOTOS':
            return {...state, photos: action.data}
        case 'proc/SET_IS_REESTR_DATA_LOADING':
            return {...state, isReestrDataLoading: action.data}
        case 'proc/SET_PROC_ID_ARRAY_AT_WORK_AT_CURRENT_USER':
            return {...state, procIdArrayAtWorkAtCurrentUser: action.data}
        case 'proc/SET_IS_DESCRIPTION_LOADING':
            return {...state, isDescriptionLoading: action.data}
        default:
            return state
    }
}

export const getProcesses = (): ThunkType => async (dispatch) => {
    dispatch (procActions.setIsLoading(true))
    let data = await processesAPI.getProcesses()
    if (data.resultCode === 0) {
        dispatch (procActions.pushProcessesData(data.items))
    } else if (data.resultCode === 1) {
        // dispatch(procActions.setEquipErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch (procActions.setIsLoading(false))
}

export const getProcReestrData = (id: string): ThunkType => async (dispatch) => {
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

export const updateName = (id: string, name: string): ThunkType => async (dispatch) => {
    dispatch (procActions.setIsDescriptionLoading(true))
    let data = await processesAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, name)
    dispatch (procActions.pushProcessesData(data.items))
    dispatch (procActions.setIsDescriptionLoading(false))
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
    dispatch (procActions.setIsDescriptionLoading(true))
    let data = await processesAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, department)
    dispatch (procActions.pushProcessesData(data.items))
    dispatch (procActions.setIsDescriptionLoading(false))
}

export const updateVMPDepartment = (id: string, VMPdepartment: string): ThunkType => async (dispatch) => {
    dispatch (procActions.setIsDescriptionLoading(true))
    let data = await processesAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, VMPdepartment)
    dispatch (procActions.pushProcessesData(data.items))
    dispatch (procActions.setIsDescriptionLoading(false))
}

export const updateProcInterval = (id: string, interval: string): ThunkType => async (dispatch) => {
    dispatch (procActions.setIsDescriptionLoading(true))
    let data = await processesAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, interval)
    dispatch (procActions.pushProcessesData(data.items))
    dispatch (procActions.setIsDescriptionLoading(false))
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

export const createNewObject = (data: NewProcObjectType): ThunkType => async (dispatch) => {
    dispatch(procActions.setIsLoading(true))
    const responseData = await processesAPI.createNewObject(data)
    if (responseData.resultCode === '0') {
        dispatch(procActions.pushProcessesData(responseData.items))
    } else {
        console.log('someError')
    }
    dispatch(procActions.setIsLoading(false))
}


type ActionTypes = InferActionsTypes<typeof procActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

const procActions = {
    pushProcessesData: (data: DataType[]) => ({ type: 'proc/PUSH_PROC_DATA', data } as const),
    pushReestrData: (data: ProcReestrType[]) => ({ type: 'proc/PUSH_REESTR_DATA', data } as const),
    setIsLoading: (data: boolean) => ({ type: 'proc/IS_LOADING', data } as const),
    setTechnicalInfo: (text: string) => ({ type: 'proc/SET_TECH_INFO', text } as const),
    setPhotosData: (data: PhotosType[]) => ({ type: 'proc/SET_PHOTOS', data } as const),
    setIsReestrDataLoading: (data: boolean) => ({ type: 'proc/SET_IS_REESTR_DATA_LOADING', data } as const),
    setProcIdArrayAtWorkAtCurrentUser: (data: any) => ({ type: 'proc/SET_PROC_ID_ARRAY_AT_WORK_AT_CURRENT_USER', data } as const),
    setIsDescriptionLoading: (data: any) => ({ type: 'proc/SET_IS_DESCRIPTION_LOADING', data } as const),
}