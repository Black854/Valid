import { ThunkAction } from "redux-thunk"
import { premisesAPI } from "../../api/premisesAPI"
import { AppStateType, InferActionsTypes } from "../store"
import { VMPDataTypeForPlansComponent } from "./vmpReducer"

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

export type PremReestrType = {
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

export type NewPremObjectType = {
    spVMP: string,
    sp: string,
    name: string,
    nomer: string,
    class: string,
    mode: string,
    ar: string
}

let initialState = {
    data: [] as DataType[],
    reestrData: [] as PremReestrType[],
    isLoading: false,
    technicalInfo: null as TechnicalInfoType | null,
    photos: [] as PhotosType[],
    cleanPremList: [] as CleanPremListType[],
    cleanGroupLabels: [] as CleanGroupLabelsType[],
    isReestrDataLoading: false,
    isCleanPremDataLoading: false,
    isCleanPremGroupsLoading: false,
    isDescriptionLoading: false,
    cleanTab: '',
    premIdArrayAtWorkAtCurrentUser: [] as PremReestrType[],
}

type InitialStateType = typeof initialState

export const premisesReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'prem/PUSH_PREM_DATA':
            return {...state, data: action.data}
        case 'prem/IS_LOADING':
            return {...state, isLoading: action.data}
        case 'prem/PUSH_REESTR_DATA':
            return {...state, reestrData: action.data}            
        case 'prem/SET_TECH_INFO':
            return {...state, technicalInfo: action.data}
        case 'prem/SET_PHOTOS':
            return {...state, photos: action.data}
        case 'prem/SET_IS_REESTR_DATA_LOADING':
            return {...state, isReestrDataLoading: action.data}
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
        case 'prem/SET_PREM_ID_ARRAY_AT_WORK_AT_CURRENT_USER':
            return {...state, premIdArrayAtWorkAtCurrentUser: action.data}
        case 'prem/SET_IS_DESCRIPTION_LOADING':
            return {...state, isDescriptionLoading: action.data}
        default:
            return state
    }
}

export const getPremises = (): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsLoading(true))
    let data = await premisesAPI.getPremises()
    dispatch (premActions.pushPremisesData(data.items))
    dispatch (premActions.setIsLoading(false))
}

export const getPremReestrData = (id: string): ThunkType => async (dispatch) => {
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
    dispatch (premActions.setIsLoading(true))
    let data = await premisesAPI.deleteMainPhoto(id)
    dispatch (premActions.pushPremisesData(data.items))
    dispatch (premActions.setIsDescriptionLoading(false))
    dispatch (premActions.setIsLoading(false))
}

export const updateNomer = (id: string, nomer: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsDescriptionLoading(true))
    let data = await premisesAPI.updateDescription(id, nomer)
    dispatch (premActions.pushPremisesData(data.items))
    dispatch (premActions.setIsDescriptionLoading(false))
}

export const updateName = (id: string, name: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsDescriptionLoading(true))
    let data = await premisesAPI.updateDescription(id, undefined, name)
    dispatch (premActions.pushPremisesData(data.items))
    dispatch (premActions.setIsDescriptionLoading(false))
}

export const updateClass = (id: string, premClass: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsDescriptionLoading(true))
    let data = await premisesAPI.updateDescription(id, undefined, undefined, premClass)
    dispatch (premActions.pushPremisesData(data.items))
    dispatch (premActions.setIsDescriptionLoading(false))
}

export const updateMode = (id: string, premMode: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsDescriptionLoading(true))
    let data = await premisesAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, premMode)
    dispatch (premActions.pushPremisesData(data.items))
    dispatch (premActions.setIsDescriptionLoading(false))
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
    dispatch (premActions.setIsDescriptionLoading(true))
    let data = await premisesAPI.updateDescription(id, undefined, undefined, undefined, department)
    dispatch (premActions.pushPremisesData(data.items))
    dispatch (premActions.setIsDescriptionLoading(false))
}

export const updateVMPDepartment = (id: string, VMPdepartment: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsDescriptionLoading(true))
    let data = await premisesAPI.updateDescription(id, undefined, undefined, undefined, undefined, VMPdepartment)
    dispatch (premActions.pushPremisesData(data.items))
    dispatch (premActions.setIsDescriptionLoading(false))
}

export const updatePremInterval = (id: string, interval: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsDescriptionLoading(true))
    let data = await premisesAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, interval)
    dispatch (premActions.pushPremisesData(data.items))
    dispatch (premActions.setIsDescriptionLoading(false))
}

export const updateReestrDatePrem = (id: string, premId: string, date: string, dateType: 'dvp' | 'dvo'): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsReestrDataLoading(true))
    let data = await premisesAPI.updateReestrDate(id, premId, date, dateType)
    dispatch (premActions.pushReestrData(data.items))
    dispatch (premActions.setIsReestrDataLoading(false))
}

export const updateReestrDocsCodePrem = (id: string, recordId: string, text: string, dataType: 'nvo' | 'nvp'): ThunkType => async (dispatch) => {
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

export const uploadPremDocument = (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', file: any): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsReestrDataLoading(true))
    let data = await premisesAPI.uploadDocument(objectId, recordId, dataType, file)
    dispatch (premActions.pushReestrData(data.items))
    dispatch (premActions.setIsReestrDataLoading(false))
}

export const deletePremDocument = (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', url: string): ThunkType => async (dispatch) => {
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

export const deleteCleanPrem = (objectId: string, cleanTab: string, id: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsCleanPremDataLoading(true))
    let data = await premisesAPI.deleteCleanPrem(cleanTab, id)
    dispatch (premActions.setCleanPremList(data.items))
    dispatch (premActions.setIsCleanPremDataLoading(false))
    dispatch (getCleanGroupLabels(objectId))
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

export const editCleanPremGroup = (cleanTab: string, dataItems: Array<string>, count: string, groupId: string): ThunkType => async (dispatch) => {
    dispatch (premActions.setIsCleanPremGroupsLoading(true))
    let data = await premisesAPI.editCleanPremGroup(cleanTab, dataItems, count, groupId)
    dispatch(premActions.setCleanGroupLabels(data.items, data.tab))
    dispatch (premActions.setIsCleanPremGroupsLoading(false))
}

export const getCurrentPremData = (myPremDataIdArray: Array<string>): ThunkType => async (dispatch) => {
    let data = await premisesAPI.getCurrentPremData(myPremDataIdArray)
    dispatch(premActions.setPremIdArrayAtWorkAtCurrentUser(data.items))
}

export const updatePremWorkData = (recordId: string, changeParam: 'et' | 'season' | 'pam2', text: string): ThunkType => async (dispatch) => {
    await premisesAPI.updatePremWorkData(recordId, changeParam, text)
}

export const createNewObject = (data: NewPremObjectType): ThunkType => async (dispatch) => {
    dispatch(premActions.setIsLoading(true))
    const responseData = await premisesAPI.createNewObject(data)
    if (responseData.resultCode === '0') {
        dispatch(premActions.pushPremisesData(responseData.items))
    } else {
        console.log('someError')
    }
    dispatch(premActions.setIsLoading(false))
}

type ActionTypes = InferActionsTypes<typeof premActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

const premActions = {
    pushPremisesData: (data: DataType[]) => ({ type: 'prem/PUSH_PREM_DATA', data } as const),
    pushReestrData: (data: PremReestrType[]) => ({ type: 'prem/PUSH_REESTR_DATA', data } as const),
    setIsLoading: (data: boolean) => ({ type: 'prem/IS_LOADING', data } as const),
    setTechnicalInfo: (data: TechnicalInfoType) => ({ type: 'prem/SET_TECH_INFO', data } as const),
    setPhotosData: (data: PhotosType[]) => ({ type: 'prem/SET_PHOTOS', data } as const),
    setIsReestrDataLoading: (data: boolean) => ({ type: 'prem/SET_IS_REESTR_DATA_LOADING', data } as const),
    setIsCleanPremDataLoading: (data: boolean) => ({ type: 'prem/SET_IS_CLEAN_PREM_DATA_LOADING', data } as const),
    setCleanPremList: (items: CleanPremListType[]) => ({ type: 'prem/SET_CLEAN_PREM_LIST', items } as const),
    setCleanGroupLabels: (data: [], tab: string) => ({ type: 'prem/SET_CLEAN_GROUP_LABELS', data, tab } as const),
    setIsCleanPremGroupsLoading: (data: boolean) => ({ type: 'prem/SET_IS_PREM_GROUPS_LOADING', data } as const),
    setCleanTab: (cleanTab: string) => ({ type: 'prem/SET_CLEAN_TAB', cleanTab } as const),
    setPremIdArrayAtWorkAtCurrentUser: (data: any) => ({ type: 'prem/SET_PREM_ID_ARRAY_AT_WORK_AT_CURRENT_USER', data } as const),
    setIsDescriptionLoading: (data: any) => ({ type: 'prem/SET_IS_DESCRIPTION_LOADING', data } as const),
}