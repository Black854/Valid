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

type TechnicalInfoType = {
    id: string
    idfromtable: string
    l: string
    w: string
    h: string
    s: string
    v: string
    bat: string
    steam: string
    con: string
    ref: string
    sensor1: string
    sensor2: string
    sensor3: string
    sensor4: string
    sensor5: string
    flow: string
    flowsize: string
    lamp: string
    temp: string
    hum: string
    light: string
    air: string
    project: string
}

export type CleanPremListType = {
    id: string
    sp: string
    nomer: string
    name: string
}

export type CleanGroupLabelsType = {
    numbers: string
    count: string
    department: string
    groupId: string
}

let initialState = {
    data: [] as DataType[],
    reestrData: [] as ReestrType[],
    isLoading: false,
    technicalInfo: null as TechnicalInfoType | null,
    photos: [] as PhotosType[],
    cleanPremList: [] as CleanPremListType[],
    cleanGroupLabels: [] as CleanGroupLabelsType[],
    isDepartmentLoading: false,
    isVMPDepartmentLoading: false,
    isClassLoading: false,
    isReestrDataLoading: false,
    isIntervalLoading: false,
    isReestrLoading: false,
    isCleanPremDataLoading: false,
    isCleanPremGroupsLoading: false,
    cleanTab: '',
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
            return {...state, technicalInfo: action.data}
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
        case 'prem/SET_CLEAN_PREM_LIST':
            return {...state, cleanPremList: action.items}
        case 'prem/SET_IS_CLEAN_PREM_DATA_LOADING':
            return {...state, isCleanPremDataLoading: action.data}
        case 'prem/SET_CLEAN_GROUP_LABELS':
            return {...state, cleanGroupLabels: action.data, cleanTab: action.tab}
        case 'prem/SET_IS_PREM_GROUPS_LOADING':
            return {...state, isCleanPremGroupsLoading: action.data}
        case 'prem/SET_CLEAN_TAB':
            return {...state, cleanTab: action.cleanTab}
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

export const updateTechnicalInfo = (id: string, techType: string, text: string): ThunkType => async (dispatch) => { 
    let data = await premisesAPI.updateTechnicalInfo(id, techType, text)
    dispatch(premActions.setTechnicalInfo(data.tech))
}

export const getPhotos = (id: string): ThunkType => async (dispatch) => { 
    let data = await premisesAPI.getPhotos(id)
    dispatch(premActions.setPhotosData(data.photos))
}

export const getCleanPremList = (id: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsCleanPremDataLoading(true))
    let data = await premisesAPI.getCleanPremList(id)
    dispatch(premActions.setCleanPremList(data.items))
    dispatch (premActions.setCleanTab(data.cleanTab))
    dispatch (premActions.setIsCleanPremDataLoading(false))
}

export const getCleanGroupLabels = (premId: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsCleanPremGroupsLoading(true))
    let data = await premisesAPI.getCleanGroupLabels(premId)
    dispatch(premActions.setCleanGroupLabels(data.items, data.tab))
    dispatch (premActions.setIsCleanPremGroupsLoading(false))
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

export const updateCleanPremItemData = (premId: string, recordId: string, text: string, dataType: 'sp' | 'nomer' | 'name'): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsCleanPremDataLoading(true))
    let data = await premisesAPI.updateCleanPremItemData(premId, recordId, text, dataType)
    dispatch (premActions.setCleanPremList(data.items))
    dispatch (premActions.setIsCleanPremDataLoading(false))
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

export const createCleanPrem = (cleanTab: string, nomer: string, sp: string, name: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsCleanPremDataLoading(true))
    let data = await premisesAPI.createCleanPrem(cleanTab, nomer, sp, name)
    dispatch (premActions.setCleanPremList(data.items))
    dispatch (premActions.setIsCleanPremDataLoading(false))
}

export const deleteCleanPrem = (cleanTab: string, id: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsCleanPremDataLoading(true))
    let data = await premisesAPI.deleteCleanPrem(cleanTab, id)
    dispatch (premActions.setCleanPremList(data.items))
    dispatch (premActions.setIsCleanPremDataLoading(false))
}

export const deleteCleanPremGroup = (cleanTab: string, groupId: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsCleanPremGroupsLoading(true))
    let data = await premisesAPI.deleteCleanPremGroup(cleanTab, groupId)
    dispatch(premActions.setCleanGroupLabels(data.items, data.tab))
    dispatch (premActions.setIsCleanPremGroupsLoading(false))
}

export const createCleanPremGroup = (cleanTab: string, dataItems: Array<string>, count: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsCleanPremGroupsLoading(true))
    let data = await premisesAPI.createCleanPremGroup(cleanTab, dataItems, count)
    dispatch(premActions.setCleanGroupLabels(data.items, data.tab))
    dispatch (premActions.setIsCleanPremGroupsLoading(false))
}

type ActionTypes = InferActionsTypes<typeof premActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

const premActions = {
    pushPremisesData: (data: DataType[]) => ({ type: 'prem/PUSH_PREM_DATA', data } as const),
    pushReestrData: (data: ReestrType[]) => ({ type: 'prem/PUSH_REESTR_DATA', data } as const),
    setIsLoading: () => ({ type: 'prem/IS_LOADING' } as const),
    setTechnicalInfo: (data: TechnicalInfoType) => ({ type: 'prem/SET_TECH_INFO', data } as const),
    setPhotosData: (data: PhotosType[]) => ({ type: 'prem/SET_PHOTOS', data } as const),
    setIsDepartmentLoading: (data: boolean) => ({ type: 'prem/SET_IS_DEPARTMENT_LOADING', data } as const),
    setIsVMPDepartmentLoading: (data: boolean) => ({ type: 'prem/SET_IS_VMP_DEPARTMENT_LOADING', data } as const),
    setIsGroupLoading: (data: boolean) => ({ type: 'prem/SET_IS_CLASS_LOADING', data } as const),
    setIsReestrDataLoading: (data: boolean) => ({ type: 'prem/SET_IS_REESTR_DATA_LOADING', data } as const),
    setIsIntervalLoading: (data: boolean) => ({ type: 'prem/SET_IS_INTERVAL_LOADING', data } as const),
    setIsCleanPremDataLoading: (data: boolean) => ({ type: 'prem/SET_IS_CLEAN_PREM_DATA_LOADING', data } as const),
    setCleanPremList: (items: CleanPremListType[]) => ({ type: 'prem/SET_CLEAN_PREM_LIST', items } as const),
    setCleanGroupLabels: (data: [], tab: string) => ({ type: 'prem/SET_CLEAN_GROUP_LABELS', data, tab } as const),
    setIsCleanPremGroupsLoading: (data: boolean) => ({ type: 'prem/SET_IS_PREM_GROUPS_LOADING', data } as const),
    setCleanTab: (cleanTab: string) => ({ type: 'prem/SET_CLEAN_TAB', cleanTab } as const),
}