import { ThunkAction } from "redux-thunk"
import { equipmentAPI } from "../../api/equipmentAPI"
import { AppStateType, InferActionsTypes } from "../store"
import { VMPDataTypeForPlansComponent } from "./vmpReducer"

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

export type EquipReestrType = {
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

export type NewEquipObjectType = {
    spVMP: string,
    sp: string,
    name: string,
    group: string,
    ar: string
}

let initialState = {
    data: [] as DataType[],
    reestrData: [] as EquipReestrType[],
    isLoading: false,
    technicalInfo: '',
    photos: [] as PhotosType[],
    isReestrDataLoading: false,
    isDescriptionLoading: false,
    sopCodeForm: '',
    equipIdArrayAtWorkAtCurrentUser: [] as EquipReestrType[],
}

type InitialStateType = typeof initialState

export const equipmentReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'equip/PUSH_EQ_DATA':
            return { ...state, data: action.data }
        case 'equip/IS_LOADING':
            return { ...state, isLoading: action.data }
        case 'equip/PUSH_REESTR_DATA':
            return { ...state, reestrData: action.data }
        case 'equip/SET_TECH_INFO':
            return { ...state, technicalInfo: action.text }
        case 'equip/SET_PHOTOS':
            return { ...state, photos: action.data }
        case 'equip/SET_EQUIP_ID_ARRAY_AT_WORK_AT_CURRENT_USER':
            return { ...state, equipIdArrayAtWorkAtCurrentUser: action.data }
        case 'equip/SET_IS_DESCRIPTION_LOADING':
            return { ...state, isDescriptionLoading: action.data }
        case 'equip/SET_IS_REESTR_DATA_LOADING':
            return { ...state, isReestrDataLoading: action.data }
        default:
            return state
    }
}

export const getEquipment = (): ThunkType => async (dispatch) => {
    dispatch(equipActions.setIsLoading(true))
    let data = await equipmentAPI.getEquipment()
    dispatch(equipActions.pushEquipmentData(data.items))
    dispatch(equipActions.setIsLoading(false))
}

export const getEquipReestrData = (id: string): ThunkType => async (dispatch) => {
    dispatch(equipActions.setIsReestrDataLoading(true))
    let data = await equipmentAPI.getReestrData(id)
    dispatch(equipActions.pushReestrData(data.items))
    dispatch(equipActions.setIsReestrDataLoading(false))
}

export const uploadMainPhoto = (id: string, file: File): ThunkType => async (dispatch) => {
    let data = await equipmentAPI.uploadMainPhoto(id, file)
    dispatch(equipActions.pushEquipmentData(data.items))
}

export const deleteMainPhoto = (id: string): ThunkType => async (dispatch) => {
    let data = await equipmentAPI.deleteMainPhoto(id)
    dispatch(equipActions.pushEquipmentData(data.items))
}

export const updateNomer = (id: string, nomer: string): ThunkType => async (dispatch) => {
    dispatch(equipActions.setIsDescriptionLoading(true))
    let data = await equipmentAPI.updateDescription(id, nomer)
    dispatch(equipActions.pushEquipmentData(data.items))
    dispatch(equipActions.setIsDescriptionLoading(false))
}

export const updateManufacturer = (id: string, manufacturer: string): ThunkType => async (dispatch) => {
    dispatch(equipActions.setIsDescriptionLoading(true))
    let data = await equipmentAPI.updateDescription(id, undefined, undefined, undefined, manufacturer)
    dispatch(equipActions.pushEquipmentData(data.items))
    dispatch(equipActions.setIsDescriptionLoading(false))
}

export const updateManufacturDate = (id: string, manufacturDate: string): ThunkType => async (dispatch) => {
    dispatch(equipActions.setIsDescriptionLoading(true))
    let data = await equipmentAPI.updateDescription(id, undefined, undefined, undefined, undefined, manufacturDate)
    dispatch(equipActions.pushEquipmentData(data.items))
    dispatch(equipActions.setIsDescriptionLoading(false))
}

export const updateSerial = (id: string, serial: string): ThunkType => async (dispatch) => {
    dispatch(equipActions.setIsDescriptionLoading(true))
    let data = await equipmentAPI.updateDescription(id, undefined, serial)
    dispatch(equipActions.pushEquipmentData(data.items))
    dispatch(equipActions.setIsDescriptionLoading(false))
}

export const updateInv = (id: string, inv: string): ThunkType => async (dispatch) => {
    dispatch(equipActions.setIsDescriptionLoading(true))
    let data = await equipmentAPI.updateDescription(id, undefined, undefined, inv)
    dispatch(equipActions.pushEquipmentData(data.items))
    dispatch(equipActions.setIsDescriptionLoading(false))
}

export const updateName = (id: string, name: string): ThunkType => async (dispatch) => {
    dispatch(equipActions.setIsDescriptionLoading(true))
    let data = await equipmentAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, name)
    dispatch(equipActions.pushEquipmentData(data.items))
    dispatch(equipActions.setIsDescriptionLoading(false))
}

export const updateGroup = (id: string, group: string): ThunkType => async (dispatch) => {
    dispatch(equipActions.setIsDescriptionLoading(true))
    let data = await equipmentAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, group)
    dispatch(equipActions.pushEquipmentData(data.items))
    dispatch(equipActions.setIsDescriptionLoading(false))
}

export const getTechnicalInfo = (id: string): ThunkType => async (dispatch) => {
    let data = await equipmentAPI.getTechnicalInfo(id)
    dispatch(equipActions.setTechnicalInfo(data.tech))
}

export const updateTechnicalInfo = (id: string, text: string): ThunkType => async (dispatch) => {
    let data = await equipmentAPI.updateTechnicalInfo(id, text)
    dispatch(equipActions.setTechnicalInfo(data.tech))
}

export const getPhotos = (id: string): ThunkType => async (dispatch) => {
    let data = await equipmentAPI.getPhotos(id)
    dispatch(equipActions.setPhotosData(data.photos))
}

export const uploadPhotos = (id: string, file: any): ThunkType => async (dispatch) => {
    let data = await equipmentAPI.uploadPhotos(id, file)
    dispatch(equipActions.setPhotosData(data.photos))
}

export const deletePhoto = (id: string, photoId: string): ThunkType => async (dispatch) => {
    let data = await equipmentAPI.deletePhoto(id, photoId)
    dispatch(equipActions.setPhotosData(data.photos))
}

export const updatePdfDescription = (photoId: string, text: string, id: string): ThunkType => async (dispatch) => {
    let data = await equipmentAPI.updatePdfDescription(photoId, text, id)
    dispatch(equipActions.setPhotosData(data.photos))
}

export const updateDepartment = (id: string, department: string): ThunkType => async (dispatch) => {
    dispatch(equipActions.setIsDescriptionLoading(true))
    let data = await equipmentAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, department)
    dispatch(equipActions.pushEquipmentData(data.items))
    dispatch(equipActions.setIsDescriptionLoading(false))
}

export const updateVMPDepartment = (id: string, VMPdepartment: string): ThunkType => async (dispatch) => {
    dispatch(equipActions.setIsDescriptionLoading(true))
    let data = await equipmentAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, VMPdepartment)
    dispatch(equipActions.pushEquipmentData(data.items))
    dispatch(equipActions.setIsDescriptionLoading(false))
}

export const updateEquipInterval = (id: string, interval: string): ThunkType => async (dispatch) => {
    dispatch(equipActions.setIsDescriptionLoading(true))
    let data = await equipmentAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, interval)
    dispatch(equipActions.pushEquipmentData(data.items))
    dispatch(equipActions.setIsDescriptionLoading(false))
}

export const updateReestrDateEquip = (id: string, equipId: string, date: string, dateType: 'dvp' | 'dvo'): ThunkType => async (dispatch) => {
    dispatch(equipActions.setIsReestrDataLoading(true))
    let data = await equipmentAPI.updateReestrDate(id, equipId, date, dateType)
    dispatch(equipActions.pushReestrData(data.items))
    dispatch(equipActions.setIsReestrDataLoading(false))
}

export const updateReestrDocsCodeEquip = (id: string, recordId: string, text: string, dataType: 'nvo' | 'nvp'): ThunkType => async (dispatch) => {
    dispatch(equipActions.setIsReestrDataLoading(true))
    let data = await equipmentAPI.updateReestrDocsCode(id, recordId, text, dataType)
    dispatch(equipActions.pushReestrData(data.items))
    dispatch(equipActions.setIsReestrDataLoading(false))
}

export const uploadEquipDocument = (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', file: any): ThunkType => async (dispatch) => {
    dispatch(equipActions.setIsReestrDataLoading(true))
    let data = await equipmentAPI.uploadDocument(objectId, recordId, dataType, file)
    dispatch(equipActions.pushReestrData(data.items))
    dispatch(equipActions.setIsReestrDataLoading(false))
}

export const deleteEquipDocument = (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', url: string): ThunkType => async (dispatch) => {
    dispatch(equipActions.setIsReestrDataLoading(true))
    let data = await equipmentAPI.deleteDocument(objectId, recordId, dataType, url)
    dispatch(equipActions.pushReestrData(data.items))
    dispatch(equipActions.setIsReestrDataLoading(false))
}

export const getCurrentEquipData = (myEquipDataIdArray: Array<string>): ThunkType => async (dispatch) => {
    let data = await equipmentAPI.getCurrentEquipData(myEquipDataIdArray)
    dispatch(equipActions.setEquipIdArrayAtWorkAtCurrentUser(data.items))
}

export const updateEquipWorkData = (recordId: string, changeParam: 'et' | 'season' | 'pam2', text: string): ThunkType => async (dispatch) => {
    await equipmentAPI.updateEquipWorkData(recordId, changeParam, text)
}

export const createNewObject = (data: NewEquipObjectType): ThunkType => async (dispatch) => {
    dispatch(equipActions.setIsLoading(true))
    const responseData = await equipmentAPI.createNewObject(data)
    if (responseData.resultCode === '0') {
        dispatch(equipActions.pushEquipmentData(responseData.items))
    } else {
        console.log('someError')
    }
    dispatch(equipActions.setIsLoading(false))
}

type ActionTypes = InferActionsTypes<typeof equipActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

const equipActions = {
    pushEquipmentData: (data: DataType[]) => ({ type: 'equip/PUSH_EQ_DATA', data } as const),
    pushReestrData: (data: EquipReestrType[]) => ({ type: 'equip/PUSH_REESTR_DATA', data } as const),
    setIsLoading: (data: boolean) => ({ type: 'equip/IS_LOADING', data } as const),
    setTechnicalInfo: (text: string) => ({ type: 'equip/SET_TECH_INFO', text } as const),
    setPhotosData: (data: PhotosType[]) => ({ type: 'equip/SET_PHOTOS', data } as const),
    setIsReestrDataLoading: (data: boolean) => ({ type: 'equip/SET_IS_REESTR_DATA_LOADING', data } as const),
    setEquipIdArrayAtWorkAtCurrentUser: (data: any) => ({ type: 'equip/SET_EQUIP_ID_ARRAY_AT_WORK_AT_CURRENT_USER', data } as const),
    setIsDescriptionLoading: (data: boolean) => ({ type: 'equip/SET_IS_DESCRIPTION_LOADING', data } as const),
}