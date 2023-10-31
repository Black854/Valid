import { ThunkAction } from "redux-thunk"
import { premisesAPI } from "../api/premisesAPI"
import { AppStateType, InferActionsTypes } from "./store"

export type DataType = {
    mode: string
    class: string
    nomer: string
    name: string
    sp: string
    sp2: string
    id: string
    foto: string
    fio: string
    ar: string
    date: string
}

type PhotosType = {
    id: string
    idfromtable: string
    src: string
    name: string
}

export type ReestrType = {
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
    reestrData: [] as ReestrType[],
    isLoading: false,
    technicalInfo: '',
    photos: [] as PhotosType[],
    isDepartmentLoading: false,
    isVMPDepartmentLoading: false,
    isClassLoading: false,
    isReestrDataLoading: false,
    isIntervalLoading: false,
    isReestrLoading: false
}

type InitialStateType = typeof initialState

export const premisesReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'prem/PUSH_PREM_DATA':
            return {...state, data: action.data, isLoading: false}
        case 'prem/IS_LOADING':
            return {...state, isLoading: true}
        case 'prem/PUSH_REESTR_DATA':
            return {...state, reestrData: action.data}            
        case 'prem/SET_TECH_INFO':
            return {...state, technicalInfo: action.text}
        case 'prem/SET_PHOTOS':
            return {...state, photos: action.data}
        case 'prem/SET_IS_DEPARTMENT_LOADING':
            return {...state, isDepartmentLoading: action.data}
        case 'prem/SET_IS_VMP_DEPARTMENT_LOADING':
            return {...state, isVMPDepartmentLoading: action.data}
        case 'prem/SET_IS_CLASS_LOADING':
            return {...state, isClassLoading: action.data}
        case 'prem/SET_IS_REESTR_DATA_LOADING':
            return {...state, isReestrDataLoading: action.data}
        case 'prem/SET_IS_INTERVAL_LOADING':
            return {...state, isIntervalLoading: action.data}
        default:
            return state
    }
}

export const getPremises = (): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsLoading())
    let data = await premisesAPI.getPremises()
    dispatch (premActions.pushPremisesData(data.items))
}

export const getReestrData = (id: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsReestrDataLoading(true))
    let data = await premisesAPI.getReestrData(id)
    dispatch (premActions.pushReestrData(data.items))
    dispatch (premActions.setIsReestrDataLoading(false))
}

export const uploadMainPhoto = (id: string, file: File): ThunkType => async (dispatch) => {
    let data = await premisesAPI.uploadMainPhoto(id, file)
    dispatch (premActions.pushPremisesData(data.items))
}

export const deleteMainPhoto = (id: string): ThunkType => async (dispatch) => {
    let data = await premisesAPI.deleteMainPhoto(id)
    dispatch (premActions.pushPremisesData(data.items))
}

export const updateNomer = (id: string, nomer: string): ThunkType => async (dispatch) => {
    let data = await premisesAPI.updateDescription(id, nomer)
    dispatch (premActions.pushPremisesData(data.items))
}

export const updateName = (id: string, name: string): ThunkType => async (dispatch) => {
    let data = await premisesAPI.updateDescription(id, undefined, name)
    dispatch (premActions.pushPremisesData(data.items))
}

export const updateClass = (id: string, premClass: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsGroupLoading(true))
    let data = await premisesAPI.updateDescription(id, undefined, undefined, premClass)
    dispatch (premActions.pushPremisesData(data.items))
    dispatch (premActions.setIsGroupLoading(false))
}

export const getTechnicalInfo = (id: string): ThunkType => async (dispatch) => { 
    let data = await premisesAPI.getTechnicalInfo(id)
    dispatch(premActions.setTechnicalInfo(data.tech))
}

export const updateTechnicalInfo = (id: string, text: string): ThunkType => async (dispatch) => { 
    let data = await premisesAPI.updateTechnicalInfo(id, text)
    dispatch(premActions.setTechnicalInfo(data.tech))
}

export const getPhotos = (id: string): ThunkType => async (dispatch) => { 
    let data = await premisesAPI.getPhotos(id)
    dispatch(premActions.setPhotosData(data.photos))
}

export const uploadPhotos = (id: string, file: any): ThunkType => async (dispatch) => { 
    let data = await premisesAPI.uploadPhotos(id, file)
    dispatch(premActions.setPhotosData(data.photos))
}

export const deletePhoto = (id: string, photoId: string): ThunkType => async (dispatch) => { 
    let data = await premisesAPI.deletePhoto(id, photoId)
    dispatch(premActions.setPhotosData(data.photos))
}

export const updatePdfDescription = (photoId: string, text: string, id: string): ThunkType => async (dispatch) => { 
    let data = await premisesAPI.updatePdfDescription(photoId, text, id)
    dispatch(premActions.setPhotosData(data.photos))
}

export const updateDepartment = (id: string, department: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsDepartmentLoading(true))
    let data = await premisesAPI.updateDescription(id, undefined, undefined, undefined, department)
    dispatch (premActions.pushPremisesData(data.items))
    dispatch (premActions.setIsDepartmentLoading(false))
}

export const updateVMPDepartment = (id: string, VMPdepartment: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsVMPDepartmentLoading(true))
    let data = await premisesAPI.updateDescription(id, undefined, undefined, undefined, undefined, VMPdepartment)
    dispatch (premActions.pushPremisesData(data.items))
    dispatch (premActions.setIsVMPDepartmentLoading(false))
}

export const updatePremInterval = (id: string, interval: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsIntervalLoading(true))
    let data = await premisesAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, interval)
    dispatch (premActions.pushPremisesData(data.items))
    dispatch (premActions.setIsIntervalLoading(false))
}

export const updateReestrDate = (id: string, premId: string, date: string, dateType: 'dvp' | 'dvo'): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsReestrDataLoading(true))
    let data = await premisesAPI.updateReestrDate(id, premId, date, dateType)
    dispatch (premActions.pushReestrData(data.items))
    dispatch (premActions.setIsReestrDataLoading(false))
}

export const updateReestrDocsCode = (id: string, recordId: string, text: string, dataType: 'nvo' | 'nvp'): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsReestrDataLoading(true))
    let data = await premisesAPI.updateReestrDocsCode(id, recordId, text, dataType)
    dispatch (premActions.pushReestrData(data.items))
    dispatch (premActions.setIsReestrDataLoading(false))
}

export const uploadDocument = (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', file: any): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsReestrDataLoading(true))
    let data = await premisesAPI.uploadDocument(objectId, recordId, dataType, file)
    dispatch (premActions.pushReestrData(data.items))
    dispatch (premActions.setIsReestrDataLoading(false))
}

export const deleteDocument = (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', url: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsReestrDataLoading(true))
    let data = await premisesAPI.deleteDocument(objectId, recordId, dataType, url)
    dispatch (premActions.pushReestrData(data.items))
    dispatch (premActions.setIsReestrDataLoading(false))
}

type ActionTypes = InferActionsTypes<typeof premActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

const premActions = {
    pushPremisesData: (data: DataType[]) => ({ type: 'prem/PUSH_PREM_DATA', data } as const),
    pushReestrData: (data: ReestrType[]) => ({ type: 'prem/PUSH_REESTR_DATA', data } as const),
    setIsLoading: () => ({ type: 'prem/IS_LOADING' } as const),
    setTechnicalInfo: (text: string) => ({ type: 'prem/SET_TECH_INFO', text } as const),
    setPhotosData: (data: PhotosType[]) => ({ type: 'prem/SET_PHOTOS', data } as const),
    setIsDepartmentLoading: (data: boolean) => ({ type: 'prem/SET_IS_DEPARTMENT_LOADING', data } as const),
    setIsVMPDepartmentLoading: (data: boolean) => ({ type: 'prem/SET_IS_VMP_DEPARTMENT_LOADING', data } as const),
    setIsGroupLoading: (data: boolean) => ({ type: 'prem/SET_IS_CLASS_LOADING', data } as const),
    setIsReestrDataLoading: (data: boolean) => ({ type: 'prem/SET_IS_REESTR_DATA_LOADING', data } as const),
    setIsIntervalLoading: (data: boolean) => ({ type: 'prem/SET_IS_INTERVAL_LOADING', data } as const),
}