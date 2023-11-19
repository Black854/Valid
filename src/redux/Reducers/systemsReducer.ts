import { ThunkAction } from "redux-thunk"
import { systemsAPI } from "../../api/systemsAPI"
import { AppStateType, InferActionsTypes } from "../store"

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

export type SysReestrType = {
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
    reestrData: [] as SysReestrType[],
    isLoading: false,
    technicalInfo: '',
    photos: [] as PhotosType[],
    isReestrDataLoading: false,
    isDescriptionLoading: false,
    sysIdArrayAtWorkAtCurrentUser: [] as SysReestrType[],
}

type InitialStateType = typeof initialState

export const systemsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'sys/PUSH_SYS_DATA':
            return {...state, data: action.data, isLoading: false}
        case 'sys/IS_LOADING':
            return {...state, isLoading: true}
        case 'sys/PUSH_REESTR_DATA':
            return {...state, reestrData: action.data}            
        case 'sys/SET_TECH_INFO':
            return {...state, technicalInfo: action.text}
        case 'sys/SET_PHOTOS':
            return {...state, photos: action.data}
        case 'sys/SET_IS_REESTR_DATA_LOADING':
            return {...state, isReestrDataLoading: action.data}
        case 'sys/SET_SYS_ID_ARRAY_AT_WORK_AT_CURRENT_USER':
            return {...state, sysIdArrayAtWorkAtCurrentUser: action.data}
        case 'sys/SET_IS_DESCRIPTION_LOADING':
            return {...state, isDescriptionLoading: action.data}
        default:
            return state
    }
}

export const getSystems = (): ThunkType => async (dispatch) => {
    dispatch (sysActions.setIsLoading())
    let data = await systemsAPI.getSystems()
    dispatch (sysActions.pushSystemsData(data.items))
}

export const getReestrData = (id: string): ThunkType => async (dispatch) => {
    dispatch (sysActions.setIsReestrDataLoading(true))
    let data = await systemsAPI.getReestrData(id)
    dispatch (sysActions.pushReestrData(data.items))
    dispatch (sysActions.setIsReestrDataLoading(false))
}

export const uploadMainPhoto = (id: string, file: File): ThunkType => async (dispatch) => {
    let data = await systemsAPI.uploadMainPhoto(id, file)
    dispatch (sysActions.pushSystemsData(data.items))
}

export const deleteMainPhoto = (id: string): ThunkType => async (dispatch) => {
    let data = await systemsAPI.deleteMainPhoto(id)
    dispatch (sysActions.pushSystemsData(data.items))
}

export const updateNomer = (id: string, nomer: string): ThunkType => async (dispatch) => {
    let data = await systemsAPI.updateDescription(id, nomer)
    dispatch (sysActions.pushSystemsData(data.items))
}

export const updateManufacturer = (id: string, manufacturer: string): ThunkType => async (dispatch) => {
    let data = await systemsAPI.updateDescription(id, undefined, undefined, undefined, manufacturer)
    dispatch (sysActions.pushSystemsData(data.items))
}

export const updateManufacturDate = (id: string, manufacturDate: string): ThunkType => async (dispatch) => {
    let data = await systemsAPI.updateDescription(id, undefined, undefined, undefined, undefined, manufacturDate)
    dispatch (sysActions.pushSystemsData(data.items))
}

export const updateSerial = (id: string, serial: string): ThunkType => async (dispatch) => {
    let data = await systemsAPI.updateDescription(id, undefined, serial)
    dispatch (sysActions.pushSystemsData(data.items))
}

export const updateInv = (id: string, inv: string): ThunkType => async (dispatch) => {
    let data = await systemsAPI.updateDescription(id, undefined, undefined, inv)
    dispatch (sysActions.pushSystemsData(data.items))
}

export const updateName = (id: string, name: string): ThunkType => async (dispatch) => {
    dispatch (sysActions.setIsDescriptionLoading(true))
    let data = await systemsAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, name)
    dispatch (sysActions.pushSystemsData(data.items))
    dispatch (sysActions.setIsDescriptionLoading(false))
}

export const updateGroup = (id: string, group: string): ThunkType => async (dispatch) => {
    dispatch (sysActions.setIsDescriptionLoading(true))
    let data = await systemsAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, group)
    dispatch (sysActions.pushSystemsData(data.items))
    dispatch (sysActions.setIsDescriptionLoading(false))
}

export const getTechnicalInfo = (id: string): ThunkType => async (dispatch) => { 
    let data = await systemsAPI.getTechnicalInfo(id)
    dispatch(sysActions.setTechnicalInfo(data.tech))
}

export const updateTechnicalInfo = (id: string, text: string): ThunkType => async (dispatch) => { 
    let data = await systemsAPI.updateTechnicalInfo(id, text)
    dispatch(sysActions.setTechnicalInfo(data.tech))
}

export const getPhotos = (id: string): ThunkType => async (dispatch) => { 
    let data = await systemsAPI.getPhotos(id)
    dispatch(sysActions.setPhotosData(data.photos))
}

export const uploadPhotos = (id: string, file: any): ThunkType => async (dispatch) => { 
    let data = await systemsAPI.uploadPhotos(id, file)
    dispatch(sysActions.setPhotosData(data.photos))
}

export const deletePhoto = (id: string, photoId: string): ThunkType => async (dispatch) => { 
    let data = await systemsAPI.deletePhoto(id, photoId)
    dispatch(sysActions.setPhotosData(data.photos))
}

export const updatePdfDescription = (photoId: string, text: string, id: string): ThunkType => async (dispatch) => { 
    let data = await systemsAPI.updatePdfDescription(photoId, text, id)
    dispatch(sysActions.setPhotosData(data.photos))
}

export const updateDepartment = (id: string, department: string): ThunkType => async (dispatch) => {
    dispatch (sysActions.setIsDescriptionLoading(true))
    let data = await systemsAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, department)
    dispatch (sysActions.pushSystemsData(data.items))
    dispatch (sysActions.setIsDescriptionLoading(false))
}

export const updateVMPDepartment = (id: string, VMPdepartment: string): ThunkType => async (dispatch) => {
    dispatch (sysActions.setIsDescriptionLoading(true))
    let data = await systemsAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, VMPdepartment)
    dispatch (sysActions.pushSystemsData(data.items))
    dispatch (sysActions.setIsDescriptionLoading(false))
}

export const updateSysInterval = (id: string, interval: string): ThunkType => async (dispatch) => {
    dispatch (sysActions.setIsDescriptionLoading(true))
    let data = await systemsAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, interval)
    dispatch (sysActions.pushSystemsData(data.items))
    dispatch (sysActions.setIsDescriptionLoading(false))
}

export const updateReestrDateSys = (id: string, sysId: string, date: string, dateType: 'dvp' | 'dvo'): ThunkType => async (dispatch) => {
    dispatch (sysActions.setIsReestrDataLoading(true))
    let data = await systemsAPI.updateReestrDate(id, sysId, date, dateType)
    dispatch (sysActions.pushReestrData(data.items))
    dispatch (sysActions.setIsReestrDataLoading(false))
}

export const updateReestrDocsCodeSys = (id: string, recordId: string, text: string, dataType: 'nvo' | 'nvp'): ThunkType => async (dispatch) => {
    dispatch (sysActions.setIsReestrDataLoading(true))
    let data = await systemsAPI.updateReestrDocsCode(id, recordId, text, dataType)
    dispatch (sysActions.pushReestrData(data.items))
    dispatch (sysActions.setIsReestrDataLoading(false))
}

export const uploadSysDocument = (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', file: any): ThunkType => async (dispatch) => {
    dispatch (sysActions.setIsReestrDataLoading(true))
    let data = await systemsAPI.uploadDocument(objectId, recordId, dataType, file)
    dispatch (sysActions.pushReestrData(data.items))
    dispatch (sysActions.setIsReestrDataLoading(false))
}

export const deleteSysDocument = (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', url: string): ThunkType => async (dispatch) => {
    dispatch (sysActions.setIsReestrDataLoading(true))
    let data = await systemsAPI.deleteDocument(objectId, recordId, dataType, url)
    dispatch (sysActions.pushReestrData(data.items))
    dispatch (sysActions.setIsReestrDataLoading(false))
}

export const getCurrentSysData = (mySysDataIdArray: Array<string>): ThunkType => async (dispatch) => {
    let data = await systemsAPI.getCurrentSysData(mySysDataIdArray)
    dispatch(sysActions.setSysIdArrayAtWorkAtCurrentUser(data.items))
}

export const updateSysWorkData = (recordId: string, changeParam: 'et' | 'season' | 'pam2', text: string): ThunkType => async (dispatch) => {
    await systemsAPI.updateSysWorkData(recordId, changeParam, text)
}

type ActionTypes = InferActionsTypes<typeof sysActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

const sysActions = {
    pushSystemsData: (data: DataType[]) => ({ type: 'sys/PUSH_SYS_DATA', data } as const),
    pushReestrData: (data: SysReestrType[]) => ({ type: 'sys/PUSH_REESTR_DATA', data } as const),
    setIsLoading: () => ({ type: 'sys/IS_LOADING' } as const),
    setTechnicalInfo: (text: string) => ({ type: 'sys/SET_TECH_INFO', text } as const),
    setPhotosData: (data: PhotosType[]) => ({ type: 'sys/SET_PHOTOS', data } as const),
    setIsReestrDataLoading: (data: boolean) => ({ type: 'sys/SET_IS_REESTR_DATA_LOADING', data } as const),
    setSysIdArrayAtWorkAtCurrentUser: (data: any) => ({ type: 'sys/SET_SYS_ID_ARRAY_AT_WORK_AT_CURRENT_USER', data } as const),
    setIsDescriptionLoading: (data: boolean) => ({ type: 'sys/SET_IS_DESCRIPTION_LOADING', data } as const),
}